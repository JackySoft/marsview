import { Form, Input, Space, InputNumber } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import VsEditor from '@/components/VsEditor';
import VariableBind from '@/components/VariableBind/VariableBind';

const SettingForm = function () {
  return (
    <>
      <Form.Item label="请求头">
        <Form.List name="headers">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name }, index) => (
                <Space align="center" style={{ marginBottom: fields.length === index + 1 ? 0 : 10 }} key={`header-${index}`}>
                  <Form.Item name={[name, 'key']} noStyle>
                    <Input placeholder="请输入Key" />
                  </Form.Item>
                  <Form.Item name={[name, 'value']} noStyle>
                    <VariableBind placeholder="请输入Value" />
                  </Form.Item>
                  <PlusOutlined onClick={() => add({ key: '', value: '' })} />
                  {index > 0 && (
                    <MinusCircleOutlined
                      onClick={() => {
                        remove(name);
                      }}
                    />
                  )}
                </Space>
              ))}
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="超时时间" name="timeout">
        <InputNumber addonAfter="秒" />
      </Form.Item>
      <Form.Item label="超时提示" name="timeoutErrorMessage">
        <Input placeholder="请输入超时提示" />
      </Form.Item>
      <Form.Item label="请求适配" name="requestInterceptor">
        <VsEditor />
      </Form.Item>
      <Form.Item label="返回适配" name="responseInterceptor">
        <VsEditor />
      </Form.Item>
    </>
  );
};

export default SettingForm;
