const { ChatZhipuAI } = require("@langchain/community/chat_models/zhipuai");
const { HumanMessage } = require("@langchain/core/messages");
const { GlmModelProvider } = require("./provider/model/glm");
const { RunnableConfig } = require("@langchain/core/runnables");
const { extractCodeBlocks } = require("./provider/utils");

class AiService {
	async buildGeneratePrompt({ message }) {
		const codePrompt = `
        You are a low-code component development expert.
        Your task is to help me generate two files for a low-code development module: index.jsx and config.js.
        The index.jsx file should define the structure of the component using React and Ant Design, and the config.js file should specify the component's property configurations.

        Here’s an example of a login form component:

        index.jsx file:
        // jsx
        export default ({ id, type, config, onClick, onDateChange,onTextChange }, ref) => {
            const { useState } = window.React;
            const {
              Button,
              Checkbox,
              ColorPicker,
              DatePicker,
              Form,
              Input,
              InputNumber,
              Radio,
              Select,
              Slider,
              Switch,
            } = window.antd;
            const { RangePicker } = DatePicker;
            const { TextArea } = Input;
            const [dateFormat, setDateFormat] = useState(
              config.props.dateFormat || 'YYYY-MM-DD HH:mm:ss'
            );
            const onDatePickerChange = (date, dateString) => {
              onDateChange && onDateChange(date, dateString, dateFormat);
            };
            const onFinish = (values) => {
              onClick && onClick(values);
            };
            return (
              <div data-id={id} data-type={type}>
                <Form
                  labelCol={{ span: config.props.labelCol }}
                  wrapperCol={{ span: config.props.wrapperCol }}
                  layout={config.props.layout}
                  style={{ maxWidth: config.props.maxWidth }}
                  onFinish={onFinish}
                >
                  <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
                    <Checkbox>Checkbox</Checkbox>
                  </Form.Item>
                  <Form.Item label="Radio">
                    <Radio.Group>
                      <Radio value="apple"> Apple </Radio>
                      <Radio value="pear"> Pear </Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item label="Input">
                    <Input placeholder={config.props.textInput} />
                  </Form.Item>
                  <Form.Item label="Select">
                    <Select>
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="DataFormat" name="dateFormat">
                    <Input
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label="DatePicker">
                    <DatePicker onChange={onDatePickerChange} />
                  </Form.Item>
                  <Form.Item label="RangePicker">
                    <RangePicker />
                  </Form.Item>
                  <Form.Item label="InputNumber">
                    <InputNumber placeholder={config.props.numberInput} />
                  </Form.Item>
                  <Form.Item label="TextArea">
                    <TextArea rows={config.props.textAreaRow} showCount={config.props.showCount}  onChange={onTextChange}/>
                  </Form.Item>
                  <Form.Item label="Switch" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                  <Form.Item label="Button" wrapperCol={{
                      offset: config.props.offset,
                      span: config.props.wrapperCol,
                    }}>
                    <Button block={config.props.block} type={config.props.btnType}>
                      {config.props.loginBtn}
                    </Button>
                  </Form.Item>
                  <Form.Item label="Slider">
                    <Slider />
                  </Form.Item>
                  <Form.Item label="ColorPicker">
                    <ColorPicker />
                  </Form.Item>
                </Form>
              </div>
            );
          };


          config.js file:
          // config.js
          export default {
              // 组件属性配置JSON
              attrs: [
                {
                  type: 'Title',
                  label: '基础设置',
                  key: 'basic',
                },
                {
                  type: 'Select',
                  label: '布局',
                  name: ['layout'],
                  props: {
                    options: [
                      { value: 'horizontal', label: 'horizontal' },
                      { value: 'vertical', label: 'vertical' },
                      { value: 'inline', label: 'inline' }
                    ],
                  },
                },
                {
                  type: 'Select',
                  label: '按钮类型',
                  name: ['btnType'],
                  props: {
                    // options参数必须写完整
                    options: [
                      { value: 'primary', label: 'primary' },
                      { value: 'default', label: 'default' },
                      { value: 'ghost', label: 'ghost' },
                      { value: 'dashed', label: 'dashed' },
                      { value: 'text', label: 'text' },
                      { value: 'link', label: 'link' },
                    ],
                  },
                },
                {
                  type: 'InputNumber',
                  label: 'labelCol',
                  name: ['labelCol'],
                },
                {
                  type: 'InputNumber',
                  label: 'wrapperCol',
                  name: ['wrapperCol'],
                },
                {
                  type: 'InputNumber',
                  label: 'offset',
                  name: ['offset'],
                },
                {
                  type: 'Input',
                  label: '按钮名称',
                  name: ['btnText'],
                },
                {
                  type: 'Switch',
                  label: '块状按钮',
                  name: ['block'],
                },
                {
                  type: 'Input',
                  label: '初始文本',
                  name: ['textInput'],
                },
                {
                  type: 'InputNumber',
                  label: '初始数值',
                  name: ['numberInput'],
                },
                
                {
                  type: 'InputNumber',
                  label: '文本框占据',
                  name: ['textAreaRow'],
                },
                {
                  type: 'Switch',
                  label: '显示字符数',
                  name: ['showCount'],
                },
              ],
              config: {
                // 组件默认属性值
                props: {
                  layout: 'horizontal',
                  labelCol: 8,
                  offset: 8,
                  wrapperCol: 16,
                  maxWidth: 500,
                  btnType: 'primary',
                  btnText: '按钮',
                  textInput: '初始文本',
                  numberInput: 12,
                  textAreaRow: 4,
                  showCount: true
                },
                style: {

                },
                events: [],
              },
              // 组件事件
              events: [
                {
                  value: 'onClick',
                  name: '表单提交事件',
                },
                {
                  value: 'onDateChange',
                  name: '日期时间变化事件',
                },
                {
                  value: 'onTextChange',
                  name: '文本输入事件'
                }
              ],
              methods: [],
            };   

            Note: If you need to import hooks like useState and useEffect, you should import them using const { useState, useEffect } = window.React;. 
            Similarly, Ant Design components should be imported in this way: const { Button, Form, DatePicker, Tag } = window.antd;.
            All components should use AntDesign, avoid using native or other library components.
            Now, based on the above structure and configuration, I need you to generate the index.jsx and config.js files for a new component. 
            The description of this component in Chinese is #{message}. You can understand it in English and help me implement the code of the component
            Please return only the code for both files, without any additional descirption text or markdown syntax.
            Please write the components that meet the requirements according to the AntDesign library and the template above. Please don't try to omit the content, and be sure to return the code completely.
        `;

		const prompt = codePrompt.replace("#{message}", message);
		return prompt;
	}

	async codeGenerate(message) {
		const modelProvider = new GlmModelProvider();

		const aiRunnableAbortController = new AbortController();
		const aiRunnable = await modelProvider.createRunnable({
			signal: aiRunnableAbortController.signal,
		});

		const sessionId = `code_session_${Date.now()}`;

		const aiRunnableConfig = {
			configurable: {
				sessionId,
			},
		};

		const sessionIdHistoriesMap = await GlmModelProvider.sessionIdHistoriesMap;

		const isSessionHistoryExists = !!sessionIdHistoriesMap[sessionId];

		const prompt = await this.buildGeneratePrompt({ message });

		const buildStream = async () => {
			let aiStream = null;
			if (!isSessionHistoryExists) {
				delete sessionIdHistoriesMap[sessionId];
				aiStream = aiRunnable.stream(
					{
						input: prompt,
					},
					aiRunnableConfig
				);
			} else {
				aiStream = aiRunnable.stream(
					{
						input: `
                          continue, please do not reply with any text other than the code, and do not use markdown syntax.
                          go continue.
                      `,
					},
					aiRunnableConfig
				);
			}
			return aiStream;
		};

		let result = [];
		const aiStream = await buildStream();
		if (aiStream) {
			for await (const chunk of aiStream) {
				const text = GlmModelProvider.answerContentToText(chunk.content);
				result.push(text);
			}
		}
		const ai_stream_string = result.join("");
		const code_array = extractCodeBlocks(ai_stream_string);
		console.log(code_array);
		// 解析生成的代码

		return [code_array[0], code_array[1]];
	}
}

module.exports = new AiService();
