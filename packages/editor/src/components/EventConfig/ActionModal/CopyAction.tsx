import { Divider, Form, Input } from 'antd';
import styles from './index.module.less';
const OpenModalAction = () => {
  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>复制文本内容至粘贴板，支持模板字符串。例如：https://xxx-v.marsview.cc/id?a={'${name}'}</p>
        <Divider />
      </div>
      <Form.Item label="复制内容" name="content" tooltip="如果内容包含模板语法，请确保事件流的上一步操作返回了改字段。">
        <Input.TextArea placeholder="输入复制内容，支持模板字符串语法。" rows={5} />
      </Form.Item>
    </>
  );
};
export default OpenModalAction;
