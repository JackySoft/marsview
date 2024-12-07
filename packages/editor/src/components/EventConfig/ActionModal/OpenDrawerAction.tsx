import { Form, Select, Divider } from 'antd';
import { usePageStore } from '@/stores/pageStore';
import styles from './index.module.less';
const OpenDrawerAction = () => {
  // 页面组件
  const { drawers } = usePageStore((state) => {
    const drawers: { id: string; title: string }[] = [];
    Object.values(state.page.pageData.elementsMap).forEach((item) => {
      if (item.type === 'Drawer') {
        const title = item.config.props.title;
        drawers.push({
          id: item.id,
          title: typeof title === 'string' ? title : title.type === 'static' ? title.value : '动态标题',
        });
      }
    });
    return {
      drawers,
    };
  });

  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>触发一个按钮、表单等事件动作后，可以通过此行为来打开一个抽屉，前提是需要先创建一个抽屉。</p>
        <Divider />
      </div>
      <Form.Item label="选择抽屉" name={'target'} rules={[{ required: true, message: '请选择抽屉组件' }]}>
        <Select>
          {drawers.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {`${item.title} (${item.id})`}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};
export default OpenDrawerAction;
