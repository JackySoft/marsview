import { Divider, Form } from 'antd';
import VsEditor from '@/components/VsEditor';
import styles from './index.module.less';
const OpenModalAction = () => {
  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>执行JS脚本，比如修改参数，获取变量、表单值、Store数据，以及对数据进行二次加工。</p>
        <Divider />
      </div>
      <Form.Item name="scripts" rules={[{ required: true, message: '请输入要执行的脚本' }]} wrapperCol={{ span: 24 }}>
        <VsEditor height="260px" language="javascript" />
      </Form.Item>
    </>
  );
};
export default OpenModalAction;
