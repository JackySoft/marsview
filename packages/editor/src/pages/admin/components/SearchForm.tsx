import { Form, Space, Button } from 'antd';
import styles from './index.module.less';
/**
 * 搜索表单容器组件封装
 * @param props
 * @returns
 */
export default function SearchForm({ form, initialValues, style, submit, reset, children }: any) {
  // 表单重置
  const handleReset = () => {
    form?.resetFields();
    reset?.();
  };
  return (
    <Form className={styles.searchForm} style={style || {}} form={form} layout="inline" initialValues={initialValues}>
      {children}
      <Form.Item>
        <Space>
          <Button type="primary" onClick={() => submit()}>
            搜索
          </Button>
          <Button type="default" onClick={handleReset}>
            重置
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
