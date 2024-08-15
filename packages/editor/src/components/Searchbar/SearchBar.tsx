import { memo } from 'react';
import styles from './index.module.less';
import { Button, Form, Input, Space } from 'antd';

const SearchBar = memo((props: any) => {
  const { form, children, submit, reset } = props;

  return (
    <>
      <div className={styles.searchBar}>
        <div className={styles.searchBarForm}>
          <Form form={form} layout="inline" initialValues={props.initialValues}>
            <Form.Item name="keyword" style={{ width: 350 }}>
              <Input placeholder="请输入搜索名称" onPressEnter={submit} />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button type="primary" onClick={submit} size="middle">
                  搜索
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <div className={styles.searchBarBtns}>{children}</div>
      </div>
    </>
  );
});

export default SearchBar;
