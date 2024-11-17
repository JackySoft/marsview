import { memo } from 'react';
import { Button, Form, Input, Radio, Space, Segmented, Tooltip } from 'antd';
import { PlusOutlined, RedoOutlined, BarsOutlined, AppstoreOutlined, ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import styles from './index.module.less';
import { useLocation } from 'react-router-dom';

const SearchBar = memo((props: any) => {
  const { pathname } = useLocation();
  const { form, from, submit, refresh, onCreate } = props;
  const options = [
    { label: '我的', value: 1 },
    { label: '市场', value: 2 },
  ];

  return (
    <>
      <div className={styles.searchBar}>
        <div className={styles.searchBarForm}>
          <Form form={form} layout="inline" initialValues={{ type: 1 }}>
            {props.showGroup === false ? null : (
              <Form.Item name="type">
                <Radio.Group options={options} onChange={submit} optionType="button" buttonStyle="solid" />
              </Form.Item>
            )}

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
        <Space>
          {pathname === '/projects' && (
            <Segmented
              onChange={(value) => props.onViewChange(value)}
              options={[
                { value: 'project', icon: <AppstoreOutlined /> },
                { value: 'list', icon: <BarsOutlined /> },
              ]}
            />
          )}
          {pathname === '/project/pages' && (
            <Tooltip title="返回">
              <Button icon={<ArrowLeftOutlined />} shape="circle" onClick={() => history.back()}></Button>
            </Tooltip>
          )}
          <Button type="dashed" icon={<PlusOutlined />} onClick={onCreate}>
            新建{from}
          </Button>
          <Button shape="circle" icon={<RedoOutlined />} onClick={() => refresh()}></Button>
        </Space>
      </div>
    </>
  );
});

export default SearchBar;
