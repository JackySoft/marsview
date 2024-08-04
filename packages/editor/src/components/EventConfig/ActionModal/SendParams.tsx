import { Form, Input, Space, Button } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import VariableBind from '@/components/VariableBind/VariableBind';
/**
 * 封装行为中发送参数组件
 */
const SendParams = () => {
  return (
    <Form.Item label="发送数据">
      {
        <Form.List name={['data']}>
          {(dataFields, { add: addParams, remove: removeParams }) => (
            <>
              {dataFields.map(({ name: paramsIndex }) => (
                <Space align="baseline" style={{ marginBottom: 20, alignItems: 'center' }} key={'data' + paramsIndex}>
                  <Form.Item name={[paramsIndex, 'key']} noStyle labelCol={{ span: 0 }} wrapperCol={{ span: 24 }}>
                    <Input placeholder="参数名" />
                  </Form.Item>
                  <Form.Item name={[paramsIndex, 'value']} noStyle>
                    <VariableBind placeholder="参数值" />
                  </Form.Item>
                  <PlusOutlined onClick={() => addParams({ key: '' }, paramsIndex + 1)} />
                  <MinusOutlined onClick={() => removeParams(paramsIndex)} />
                </Space>
              ))}
              <Button block style={{ marginBottom: 10 }} onClick={() => addParams({ key: '' })}>
                增加参数
              </Button>
            </>
          )}
        </Form.List>
      }
    </Form.Item>
  );
};

export default SendParams;
