import { Modal, Form, Input, Radio, InputNumber, Switch } from 'antd';
import { useImperativeHandle, useState, forwardRef, useRef } from 'react';
import { PageVariable } from '@/packages/types';
import { usePageStore } from '@/stores/pageStore';
import Editor, { loader } from '@monaco-editor/react';
import { message } from '@/utils/AntdGlobal';
/**
 * 成员管理
 */

const VariableSetting = (_: any, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState('add');
  const [dataType, setDataType] = useState('string');
  const editorRef = useRef<any>(null);
  const [form] = Form.useForm();
  const { theme, addVariable, editVariable } = usePageStore((state) => ({
    theme: state.theme,
    variables: state.page.pageData.variables,
    addVariable: state.addVariable,
    editVariable: state.editVariable,
  }));

  // 初始化monaco，默认为jsdelivery分发，由于网络原因改为本地cdn
  loader.config({
    paths: {
      vs: `${import.meta.env.VITE_CDN_URL}/static/monaco-editor/vs`,
    },
  });

  // 暴露方法
  useImperativeHandle(ref, () => ({
    open(type: 'add' | 'edit', params: PageVariable) {
      if (type === 'edit') {
        if (params.type === 'array' || params.type === 'object') {
          form.setFieldsValue({ ...params, defaultValue: JSON.stringify(params.defaultValue, null, 4) });
        } else {
          form.setFieldsValue(params);
        }
        setDataType(params.type);
      }
      setType(type);
      setVisible(true);
    },
  }));

  const handleChange = (value: any) => {
    setDataType(value);
  };

  // 提交
  const handleOk = () => {
    form.validateFields().then(() => {
      const values = form.getFieldsValue();
      if (dataType === 'array' || dataType === 'object') {
        const editorValue = editorRef.current?.getValue();
        if (editorValue) {
          try {
            values.defaultValue = JSON.parse(editorValue);
          } catch (error) {
            message.error('请输入正确的json数据');
            return;
          }
        }
      }
      if (type === 'add') {
        addVariable(values);
      } else {
        editVariable(values);
      }
      handleCancel();
    });
  };

  // 关闭
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
    setDataType('string');
  };
  return (
    <Modal title="添加变量" open={visible} width={650} onOk={handleOk} onCancel={handleCancel} okText="提交" cancelText="取消">
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ type: 'string' }}>
        <Form.Item
          label="变量名称"
          name="name"
          rules={[
            { required: true, message: '请输入变量名称' },
            {
              pattern: /^[a-zA-Z]\w{0,19}$/,
              message: '请输入正确的变量名称',
            },
          ]}
        >
          <Input placeholder="请输入变量名称，以字母开头，支持大小写、下划线" disabled={type == 'edit'} maxLength={20} showCount />
        </Form.Item>
        <Form.Item label="变量类型" name="type" rules={[{ required: true, message: '请选择变量类型' }]}>
          <Radio.Group buttonStyle="solid" onChange={(e) => handleChange(e.target.value)}>
            <Radio.Button value="string">字符串</Radio.Button>
            <Radio.Button value="number">数字</Radio.Button>
            <Radio.Button value="boolean">布尔</Radio.Button>
            <Radio.Button value="array">数组</Radio.Button>
            <Radio.Button value="object">对象</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="变量默认值" name="defaultValue" rules={[{ required: true, message: '请输入变量值' }]}>
          {dataType === 'string' && <Input placeholder="请输入变量值" />}
          {dataType === 'number' && <InputNumber placeholder="请输入变量值" style={{ width: '100%' }} />}
          {dataType === 'boolean' && <Switch />}
          {(dataType === 'array' || dataType === 'object') && (
            <Editor
              height="250px"
              language="json"
              theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
              options={{
                lineNumbers: 'on',
                minimap: {
                  enabled: false,
                },
              }}
              onMount={(editor) => (editorRef.current = editor)}
            />
          )}
        </Form.Item>
        <Form.Item label="变量说明" name="remark">
          <Input placeholder="请输入变量说明" maxLength={20} showCount />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default forwardRef(VariableSetting);
