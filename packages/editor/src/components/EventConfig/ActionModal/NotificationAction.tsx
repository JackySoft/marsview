import { Form, Select, Divider, Input, Radio, InputNumber } from 'antd';
import styles from './index.module.less';
/**
 * 显示确认弹框
 * @returns
 */
const ShowConfirmModal = () => {
  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>点击一个按钮，可以通过此行为来打开一个消息通知弹框，只需要配置通知内容即可。</p>
        <Divider />
      </div>
      <Form.Item label="通知类型" name={'type'} rules={[{ required: true, message: '请选择弹框类型' }]}>
        <Radio.Group buttonStyle="solid" optionType="button">
          <Radio.Button value="info">信息</Radio.Button>
          <Radio.Button value="success">成功</Radio.Button>
          <Radio.Button value="warning">警告</Radio.Button>
          <Radio.Button value="error">错误</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="通知标题" name={'message'} rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入通知标题" />
      </Form.Item>
      <Form.Item label="通知内容" name={'description'} rules={[{ required: true, message: '请输入内容' }]}>
        <Input placeholder="请输入通知内容" />
      </Form.Item>
      <Form.Item label="通知位置" name={'placement'} rules={[{ required: true, message: '请选择通知位置' }]}>
        <Select placeholder="请选择通知位置">
          <Select.Option value="top">top</Select.Option>
          <Select.Option value="topLeft">topLeft</Select.Option>
          <Select.Option value="topRight">topRight</Select.Option>
          <Select.Option value="bottom">bottom</Select.Option>
          <Select.Option value="bottomLeft">bottomLeft</Select.Option>
          <Select.Option value="bottomRight">bottomRight</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="持续时间(秒)"
        name="duration"
        tooltip="单位是秒，表示几秒后，消息通知消失。"
        rules={[{ required: true, message: '请输入持续时间' }]}
      >
        <InputNumber placeholder="eg: 3" />
      </Form.Item>
    </>
  );
};
export default ShowConfirmModal;
