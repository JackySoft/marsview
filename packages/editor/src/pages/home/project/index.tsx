import { memo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Empty, Form, Layout, Pagination, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { useAntdTable } from 'ahooks';
import api from '@/api/project';
import pageApi from '@/api/page';
import CreatePage, { CreatePageRef } from '@/components/CreatePage';
import SearchBar from '@/components/Searchbar/SearchBar';
import ProjectCard from './components/ProjectCard';
import { PageItem } from '@/api/types';
import styles from './../index.module.less';
import CreateProject from '@/components/CreateProject';
/**
 * 页面列表
 */

function Category() {
  const [form] = Form.useForm();
  const [type, setType] = useState('project');
  const [searchParams] = useSearchParams();
  const createPageRef = useRef<CreatePageRef>();
  const createProjectRef = useRef<{ open: (type: string) => void }>();
  // 判断是否是超大屏
  const isXLarge = useMediaQuery({ query: '(min-width: 1920px)' });

  // 获取列表数据
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, { keyword }: { keyword: string }) => {
    const promise = type === 'project' ? api.getCategoryList : pageApi.getPageList;
    return promise({
      pageNum: current,
      pageSize: pageSize,
      keyword,
      projectId: Number(searchParams.get('projectId')),
    }).then((res) => {
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

  // 新建项目或页面
  const handleCreate = () => {
    createProjectRef.current?.open(type);
  };

  // 复制页面
  const handleCopy = (item: PageItem) => {
    createPageRef.current?.open('copy', item);
  };

  return (
    <Layout.Content className={styles.pageList}>
      {/* 搜索工具条 */}
      <SearchBar
        showGroup={false}
        form={form}
        from={type === 'project' ? '项目' : '页面'}
        submit={search.submit}
        refresh={search.submit}
        onCreate={handleCreate}
      />

      {/* 加载项目列表 */}
      {type === 'project' ? (
        <div className={styles.pagesContent}>
          <Spin spinning={loading} size="large" tip="加载中...">
            {tableProps.dataSource.length > 0 ? (
              <ProjectCard list={tableProps.dataSource} />
            ) : (
              <Empty style={{ marginTop: 100 }}>
                <Button type="dashed" icon={<PlusOutlined />} onClick={handleCreate}>
                  创建项目
                </Button>
              </Empty>
            )}
          </Spin>
        </div>
      ) : null}

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

      {/* 新建项目 */}
      <CreateProject createRef={createProjectRef} update={search.submit} />
      {/* 新建页面 */}
      <CreatePage createRef={createPageRef} update={search.submit} />
    </Layout.Content>
  );
}

export default memo(Category);
