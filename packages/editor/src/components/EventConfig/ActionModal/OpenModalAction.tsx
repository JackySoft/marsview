import { Form, Select, Divider } from 'antd';
import { usePageStore } from '@/stores/pageStore';
import styles from './index.module.less';
const OpenModalAction = () => {
  // 页面组件
  const { modals } = usePageStore((state) => {
    const modals: { id: string; title: string }[] = [];
    Object.values(state.page.pageData.elementsMap).forEach((item) => {
      if (item.type === 'Modal') {
        const title = item.config.props.title;
        modals.push({
          id: item.id,
          title: typeof title === 'string' ? title : title.type === 'static' ? title.value : '动态标题',
        });
      }
    });
    return {
      modals,
    };
  });

  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>触发一个按钮、表单等事件动作后，可以通过此行为来打开一个弹框，前提是需要先创建一个弹框。</p>
        <Divider />
      </div>
      <Form.Item label="选择弹框" name={'target'} rules={[{ required: true, message: '请选择弹框组件' }]}>
        <Select>
          {modals.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {`${item.title} (${item.id})`}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};
export default OpenModalAction;
