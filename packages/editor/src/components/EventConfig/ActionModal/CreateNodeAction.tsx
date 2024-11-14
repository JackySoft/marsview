import { Divider, Form, Input } from 'antd';
import VariableBind from '@/components/VariableBind/VariableBind';
import styles from './index.module.less';

const CreateNodeAction = () => {
  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>触发事件后，创建知识库副本，相当于复制。此功能可以用来创建周报。</p>
        <Divider />
      </div>
      <Form.Item
        label="空间ID"
        name="spaceId"
        tooltip="打开知识库，点击左下角的设置就可以在地址栏中看到当前的SpaceId"
        rules={[{ required: true, message: '请输入空间ID' }]}
      >
        <Input placeholder="请输入空间ID" />
      </Form.Item>
      <Form.Item
        label="节点Token"
        name="nodeToken"
        tooltip="创建副本时，需要指定基于哪个节点进行创建，打开该知识库，地址栏末尾的即为Token"
        rules={[{ required: true, message: '请输入节点Token' }]}
      >
        <Input placeholder="请输入节点Token" />
      </Form.Item>
      <Form.Item label="知识库名称" name="title" rules={[{ required: true, message: '请输入知识库名称' }]}>
        <VariableBind placeholder="请输入知识库名称" />
      </Form.Item>
    </>
  );
};
export default CreateNodeAction;
