import { Form, Input, InputNumber } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
const ReturnStructure = function () {
  return (
    <>
      <p style={{ lineHeight: '35px', color: '#5c5c5c', marginLeft: '70px', marginBottom: '10px' }}>
        <InfoCircleOutlined />
        <span style={{ marginLeft: 5 }}>用来定义接口返回结构，推荐结构：{`{ code: 0, data: {}, msg: '' }`}</span>
      </p>
      <Form.Item label="业务码" extra={'接口返回业务状态码，默认是：code'} name={['result', 'code']}>
        <Input placeholder="默认为：code" maxLength={15} showCount />
      </Form.Item>
      <Form.Item label="成功值" extra={'接口返回成功时对应的状态码值，默认是：0'} name={['result', 'codeValue']}>
        <InputNumber placeholder="默认为：0" />
      </Form.Item>
      <Form.Item label="结果字段" extra={'接口返回结果字段，默认是：data'} name={['result', 'data']}>
        <Input placeholder="默认为：data" maxLength={15} showCount />
      </Form.Item>
      <Form.Item label="报错字段" extra={'接口返回报错字段，默认是：msg'} name={['result', 'msg']}>
        <Input placeholder="默认为：msg" maxLength={15} showCount />
      </Form.Item>
    </>
  );
};

export default ReturnStructure;
