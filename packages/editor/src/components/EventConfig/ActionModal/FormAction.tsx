import { Form, Select, Divider } from 'antd';
import { usePageStore } from '@/stores/pageStore';
import styles from './index.module.less';
const FormAction = () => {
  // 页面组件
  const { modals } = usePageStore((state) => {
    const modals: { id: string }[] = [];
    Object.values(state.page.pageData.elementsMap).forEach((item) => {
      if (item.type === 'SearchForm' || item.type === 'Form') {
        modals.push({
          id: item.id,
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
        <p className={styles.descInfo}>触发一个事件动作后，可以选择目标表单，调用该表单方法。</p>
        <Divider />
      </div>
      <Form.Item label="选择表单" name={'target'} rules={[{ required: true, message: '请选择表单组件' }]}>
        <Select>
          {modals.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {`${item.id}`}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};
export default FormAction;
