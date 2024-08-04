import { Divider, Form, Input, InputNumber, Radio } from 'antd';
import styles from './index.module.less';
const OpenModalAction = () => {
  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>通过message组件显示反馈提示。</p>
        <Divider />
      </div>
      <Form.Item label="提示类型" name="type">
        <Radio.Group buttonStyle="solid" optionType="button">
          <Radio value="success">成功</Radio>
          <Radio value="info">信息</Radio>
          <Radio value="warning">警告</Radio>
          <Radio value="error">错误</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="提示内容" name="content" rules={[{ required: true, message: '请输入提示内容' }]}>
        <Input placeholder="输入提示内容" />
      </Form.Item>
      <Form.Item
        label="持续时间(秒)"
        name="duration"
        tooltip="单位是秒，表示几秒后，提示消息消失。"
        rules={[{ required: true, message: '请输入持续时间' }]}
      >
        <InputNumber placeholder="eg: 3" />
      </Form.Item>
    </>
  );
};
export default OpenModalAction;
