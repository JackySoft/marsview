import { Form, Input, Switch } from 'antd';
const ReturnTips = function () {
  return (
    <>
      <Form.Item label="默认成功提示" name={['tips', 'success']}>
        <Input placeholder="默认不提示" maxLength={50} showCount />
      </Form.Item>
      <Form.Item label="默认失败提示" name={['tips', 'fail']}>
        <Input placeholder="默认不提示" maxLength={50} showCount />
      </Form.Item>
      <Form.Item label="接口成功提示" name={['tips', 'isSuccess']} valuePropName="checked" extra={'开启接口成功提示后，会优先使用接口返回成功信息。'}>
        <Switch />
      </Form.Item>
      <Form.Item label="接口报错提示" name={['tips', 'isError']} valuePropName="checked" extra={'开启接口报错提示后，会优先使用接口返回错误信息。'}>
        <Switch />
      </Form.Item>
    </>
  );
};

export default ReturnTips;
