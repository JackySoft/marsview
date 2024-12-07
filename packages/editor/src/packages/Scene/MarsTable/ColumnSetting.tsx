import { Input, Modal, Form, Col, Row, Select, Switch, Button, Card, InputNumber, Radio, Tabs, FormInstance, Typography, Tooltip, Flex } from 'antd';
import { useImperativeHandle, useState, MutableRefObject, memo, useMemo } from 'react';
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { ComponentType } from '../../types';
import { usePageStore } from '@/stores/pageStore';
import VsEditor from '@/components/VsEditor';
import { createId } from '@/utils/util';
import VariableBind from '@/components/VariableBind/VariableBind';

export interface IModalProp {
  columnRef: MutableRefObject<{ open: (index: number) => void } | undefined>;
  update: (vals: any, index: number) => void;
}
/**
 * 列设置
 */
const ColumnSetting = memo((props: IModalProp) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [form] = useForm();

  const { selectedElement, elementsMap, editTableProps, editEvents } = usePageStore((state) => ({
    selectedElement: state.selectedElement,
    elementsMap: state.page.pageData.elementsMap,
    editTableProps: state.editTableProps,
    editEvents: state.editEvents,
  }));

  // 暴露方法
  useImperativeHandle(props.columnRef, () => ({
    open(index: number) {
      const values = elementsMap[selectedElement?.id as string];
      const defaultValues = values.config.props.columns[index];
      const renderFn =
        defaultValues.render ||
        `function render(text, record, index) {
    return text;
}`;
      form.resetFields();
      form.setFieldsValue({
        align: 'center',
        fixed: false,
        type: 'text',
        empty: '-',
        ...defaultValues,
        render: renderFn,
        onCell:
          defaultValues.onCell ||
          `function onCell(record, index) {
    // 此处可以设置数据跨行、跨列
    return {

    }
}`,
      });
      setIndex(index);
      setTitle(`列设置 - ${defaultValues.title || ''}(${defaultValues?.dataIndex || ''})`);
      setVisible(true);
    },
  }));

  // Tab组件
  const items = useMemo(
    () => [
      {
        key: 'basic',
        label: '基础配置',
        children: <AttrSetting />,
      },
      {
        key: 'display',
        label: '展示配置',
        forceRender: true,
        children: <DisplaySetting />,
      },
      {
        key: 'custom',
        label: '自定义',
        forceRender: true,
        children: <CustomRender />,
      },
    ],
    [],
  );

  // 提交
  const handleOk = () => {
    form.validateFields().then(() => {
      const values = form.getFieldsValue();
      const element: ComponentType = elementsMap[selectedElement?.id as string];
      // 给当前列创建事件
      const cellEventName = createId(`ClickCell${values.dataIndex}`);
      if (values.clickable) {
        values.eventName = values.eventName || cellEventName;
      } else {
        values.eventName = '';
      }
      // 更新操作列属性
      editTableProps({
        id: selectedElement?.id,
        type: 'column',
        index,
        props: { ...values, key: values.dataIndex || index },
      });
      // 需要提前把已经存进去的动态事件过滤掉，不然会重复
      let events: any = element.events?.filter((item: any) => item.value.indexOf('Dynamic') == -1);
      values.list?.map((item: any, index: number) => {
        let name = '';
        if (typeof item.text === 'string' || item.text?.type === 'static') {
          name = '点击' + (item.text?.value || item.text) + '事件';
        } else {
          name = `操作列动态按钮${index + 1}事件`;
        }
        // 动态新增的按钮，需要动态生成事件
        events.push({
          name,
          value: item.eventName,
        });
      });
      // 如果列点击事件存在，先删除
      const oldEventName = element.config.props.columns[index].eventName;
      events = events.filter((item: any) => item.value != oldEventName);
      // 更新列点击事件
      if (values.clickable) {
        events.push({
          name: `列${values.title}事件`,
          value: values.eventName || cellEventName,
        });
      }
      // 更新操作列事件
      editEvents({
        id: element.id,
        events,
      });
      props.update(values, index);
      setVisible(false);
    });
  };

  // 关闭
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal title={title} open={visible} onOk={handleOk} onCancel={handleCancel} width={900}>
      <Form form={form} labelCol={{ span: 6 }}>
        <Tabs items={items} />
      </Form>
    </Modal>
  );
});

// 属性设置
const AttrSetting = () => {
  return (
    <>
      <Row>
        <Col span={12}>
          <Form.Item label="列头" name="title" rules={[{ required: true, message: '请输入列名' }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="字段" name="dataIndex" rules={[{ required: true, message: '请输入字段名称' }]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="宽度" name="width">
            <InputNumber placeholder="eg: 100" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="对齐" name="align">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="left">居左</Radio.Button>
              <Radio.Button value="center">居中</Radio.Button>
              <Radio.Button value="right">居右</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="固定方式" name="fixed">
            <Radio.Group buttonStyle="solid">
              <Radio.Button value="">默认</Radio.Button>
              <Radio.Button value="left">居左</Radio.Button>
              <Radio.Button value="right">居右</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="表头跨列" name="colSpan">
            <InputNumber placeholder="eg: 3" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

// 展示设置
const DisplaySetting = () => {
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 8 },
  };
  return (
    <>
      <Form.Item label="显示格式" name="type" {...layout}>
        <Select>
          <Select.Option value="text">单行文本</Select.Option>
          <Select.Option value="multiline">
            <Flex justify="space-between">
              <span>多行文本</span>
              <span>
                <Tooltip title="需要返回数组格式：[{label: '名称',value: 'Jack'}]">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            </Flex>
          </Select.Option>
          <Select.Option value="status">
            <Flex justify="space-between">
              <span>状态</span>
              <span>
                <Tooltip title="需要返回数组格式：[{status: 'success',text: '提交完成'}]">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            </Flex>
          </Select.Option>
          <Select.Option value="image">
            <Flex justify="space-between">
              <span>图片</span>
              <span>
                <Tooltip title="支持单张和多张预览，多张图片格式：['xxx.png','xxx.jpg']">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            </Flex>
          </Select.Option>
          <Select.Option value="date1">日期-不含时分秒</Select.Option>
          <Select.Option value="date2">日期-包含时分秒</Select.Option>
          <Select.Option value="money">金额千分位</Select.Option>
          <Select.Option value="number">数字千分位</Select.Option>
          <Select.Option value="tag">
            <Flex justify="space-between">
              <span>标签</span>
              <span>
                <Tooltip title="支持颜色配置，返回格式：[{label:'名称',color:'green'}]">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            </Flex>
          </Select.Option>
          <Select.Option value="action">操作</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="可点击" name="clickable" tooltip="开启后，当前列展示为可点击的link格式，支持事件配置" {...layout}>
        <Switch />
      </Form.Item>
      <Form.Item name="eventName" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="超长省略" name="ellipsis" tooltip="省略后，会自动开启tooltip功能" {...layout}>
        <Switch />
      </Form.Item>
      <Form.Item label="可复制" name="copyable" tooltip="开启后，列增加复制功能，只对文本生效" {...layout}>
        <Switch />
      </Form.Item>
      <Form.Item shouldUpdate noStyle>
        {(form: FormInstance) => {
          const type = form.getFieldValue('type');
          if (type === 'image')
            return (
              <Form.Item name="imageConfig">
                <Form.Item label="宽度" name={['imageConfig', 'width']} {...layout}>
                  <Input placeholder="string | number" />
                </Form.Item>
                <Form.Item label="高度" name={['imageConfig', 'height']} {...layout}>
                  <Input placeholder="string | number" />
                </Form.Item>
              </Form.Item>
            );
        }}
      </Form.Item>
      <Form.Item shouldUpdate>
        {(form: FormInstance) => {
          const type = form.getFieldValue('type'); // 假设你在某个地方已经定义了'type'字段
          if (type === 'action') {
            return (
              <Form.Item label="折叠按钮" name="moreActionIndex" {...layout} tooltip="指定从第n个按钮开始折叠">
                <InputNumber
                  min={0}
                  max={999}
                  style={{
                    width: '60px',
                  }}
                />
              </Form.Item>
            );
          }
          return null;
        }}
      </Form.Item>
      <Form.Item shouldUpdate noStyle>
        {(form: FormInstance) => {
          const type = form.getFieldValue('type');
          if (type === 'action')
            return (
              <Form.List name="list">
                {(fields: Array<{ key: number; name: number }>, { add, remove }: any) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card
                        style={{ width: '100%', marginBottom: 10 }}
                        title="操作按钮设置"
                        key={key}
                        size="small"
                        extra={
                          <Button onClick={() => remove(name)} icon={<MinusCircleOutlined />} type="text" danger>
                            删除
                          </Button>
                        }
                      >
                        <Row gutter={5} style={{ marginBottom: -24 }}>
                          <Col span={7}>
                            <Form.Item {...restField} name={[name, 'text']} label="名称">
                              <VariableBind />
                            </Form.Item>
                          </Col>
                          <Col span={3}>
                            <Form.Item label="danger" name={[name, 'danger']} labelCol={{ span: 14 }} valuePropName="checked">
                              <Switch />
                            </Form.Item>
                          </Col>
                          <Col span={7}>
                            <Form.Item label="权限标识" tooltip="项目配置后台对应的按钮code" name={[name, 'authCode']} labelCol={{ span: 8 }}>
                              <Input placeholder="按钮Code" />
                            </Form.Item>
                          </Col>
                          <Col span={7}>
                            <Form.Item label="三方脚本" tooltip="通过脚本实现第三方系统按钮权限" name={[name, 'authScript']} labelCol={{ span: 8 }}>
                              <VariableBind placeholder="自定义权限，执行脚本" />
                            </Form.Item>
                            <Form.Item name={[name, 'eventName']} hidden>
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                    <div style={{ marginTop: 15 }}>
                      <Button
                        type="dashed"
                        block
                        onClick={() => add({ text: '按钮', type: 'link', eventName: createId('Dynamic') })}
                        icon={<PlusOutlined />}
                      >
                        新增操作按钮
                      </Button>
                    </div>
                  </>
                )}
              </Form.List>
            );
        }}
      </Form.Item>
    </>
  );
};

// 自定义渲染
const CustomRender = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Form.Item
            label="单元格渲染"
            name="onCell"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 21 }}
            tooltip="通过自定义onCell函数，实现数据跨行、跨列展示。"
          >
            <VsEditor />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label="自定义渲染"
            name="render"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 21 }}
            tooltip="通过编程的方式实现值渲染，不支持ReactNode渲染。例如：if(text === 1)return '在线'; "
          >
            <VsEditor />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ColumnSetting;
