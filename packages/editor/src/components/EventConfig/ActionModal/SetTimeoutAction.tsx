import { Divider, Form, Input, InputNumber, Radio } from 'antd';
import styles from './index.module.less';
const OpenModalAction = () => {
  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>触发动作后，会执行setTimeout做延迟。比如：延迟3秒执行下一个任务。</p>
        <Divider />
      </div>
      <Form.Item label="时间（秒）" name="duration" rules={[{ required: true, message: '请输入持续时间' }]}>
        <InputNumber placeholder="eg: 3" />
      </Form.Item>
    </>
  );
};
export default OpenModalAction;
