import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Empty, Form, Layout, Pagination, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAntdTable } from 'ahooks';
import { useMediaQuery } from 'react-responsive';
import api from '@/api/page';
import CreatePage, { CreatePageRef } from '@/components/CreatePage';
import SearchBar from '@/components/Searchbar/SearchBar';
import PageCard from './components/PageCard';
import { PageItem } from '@/api/types';
import styles from './../index.module.less';

/**
 * 项目所属页面列表
 */
export default function Index() {
  const [form] = Form.useForm();
  const createPageRef = useRef<CreatePageRef>();
  const [searchParams] = useSearchParams();

  // 判断是否是超大屏
  const isXLarge = useMediaQuery({ query: '(min-width: 1920px)' });

  // 获取列表数据
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, { keyword }: { keyword: string }) => {
    return api
      .getPageList({
        pageNum: current,
        pageSize: pageSize,
        keyword,
        projectId: Number(searchParams.get('projectId')),
      })
      .then((res) => {
        return {
          total: res.total,
          list: res.list,
        };
      });
  };

  const { tableProps, loading, search } = useAntdTable(getTableData, {
    form,
    defaultPageSize: isXLarge ? 15 : 12,
  });

  // 新建页面
  const handleCreate = () => {
    createPageRef.current?.open('create');
  };

  // 复制页面
  const handleCopy = (item: PageItem) => {
    createPageRef.current?.open('copy', item);
  };

  return (
    <>
      <Layout.Content className={styles.pageList}>
        <SearchBar showGroup={false} form={form} from="页面" submit={search.submit} refresh={search.submit} onCreate={handleCreate} />

        <div className={styles.pagesContent}>
          <Spin spinning={loading} size="large" tip="加载中...">
            {tableProps.dataSource.length > 0 ? (
              <PageCard list={tableProps.dataSource} copy={handleCopy} refresh={search.submit} />
            ) : (
              <Empty style={{ marginTop: 100 }}>
                <Button type="dashed" icon={<PlusOutlined />} onClick={handleCreate}>
                  创建页面
                </Button>
              </Empty>
            )}
          </Spin>
        </div>
        {/* 分页器 */}
        {tableProps.dataSource.length > 0 ? (
          <Pagination
            {...tableProps.pagination}
            onChange={(current, pageSize) => tableProps.onChange({ current, pageSize })}
            showSizeChanger
            showTotal={(total) => `总共 ${total} 条`}
            align="end"
          />
        ) : null}

        {/* 新建页面 */}
        <CreatePage createRef={createPageRef} update={search.submit} />
      </Layout.Content>
    </>
  );
}
