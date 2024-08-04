import { Form, Input, Switch } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
const ReturnTips = function () {
  return (
    <>
      <p style={{ lineHeight: '35px', color: '#5c5c5c', marginLeft: '56px', marginBottom: '10px' }}>
        <InfoCircleOutlined />
        <span style={{ marginLeft: 5 }}>用来定义成功或者失败时，系统显示提示文案</span>
      </p>
      <Form.Item label="成功提示" name={['tips', 'success']}>
        <Input placeholder="默认不提示" />
      </Form.Item>
      <Form.Item label="失败提示" name={['tips', 'fail']}>
        <Input placeholder="默认不提示" />
      </Form.Item>
      <Form.Item label="系统报错" name={['tips', 'isError']} valuePropName="checked" extra={'开启系统报错后，会优先使用接口返回错误信息。'}>
        <Switch />
      </Form.Item>
    </>
  );
};

export default ReturnTips;
