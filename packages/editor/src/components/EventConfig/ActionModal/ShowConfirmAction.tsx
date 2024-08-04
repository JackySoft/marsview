import { Form, Select, Divider, Input } from 'antd';
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
        <p className={styles.descInfo}>点击一个按钮，可以通过此行为来打开一个确认弹框，只需要配置确认弹框内容即可。</p>
        <Divider />
      </div>
      <Form.Item label="确认框类型" name={'type'} rules={[{ required: true, message: '请选择弹框类型' }]}>
        <Select placeholder="请选择确认框类型">
          <Select.Option value="confirm">确认框</Select.Option>
          <Select.Option value="info">信息框</Select.Option>
          <Select.Option value="success">成功框</Select.Option>
          <Select.Option value="warning">警告框</Select.Option>
          <Select.Option value="error">错误框</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="确认标题" name={'title'} rules={[{ required: true, message: '请输入标题' }]}>
        <Input placeholder="请输入确认标题" />
      </Form.Item>
      <Form.Item label="显示内容" name={'content'} rules={[{ required: true, message: '请输入内容' }]}>
        <Input placeholder="请输入确认内容" />
      </Form.Item>
      <Form.Item label="确认名称" name={'okText'} rules={[{ required: true, message: '请输入确认按钮名称' }]}>
        <Input placeholder="请输入确认按钮名称" />
      </Form.Item>
      <Form.Item label="取消名称" name={'cancelText'} rules={[{ required: true, message: '请输入取消按钮名称' }]}>
        <Input placeholder="请输入取消按钮名称" />
      </Form.Item>
    </>
  );
};
export default ShowConfirmModal;
