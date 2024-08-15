import { memo } from 'react';
import { Button, Form, Input, Space } from 'antd';
import styles from './index.module.less';

const SearchBar = memo((props: any) => {
  const { form, from, children, submit } = props;

  return (
    <>
      <div className={styles.searchBar}>
        <div className={styles.searchBarForm}>
          <Form form={form} layout="inline">
            <Form.Item name="keyword" style={{ width: 200 }}>
              <Input placeholder={`请输入${from}名称`} onPressEnter={submit} />
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
