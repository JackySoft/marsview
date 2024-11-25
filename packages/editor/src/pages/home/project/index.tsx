import { memo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Empty, Form, Layout, Pagination, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { useAntdTable } from 'ahooks';
import api from '@/api/project';
import pageApi from '@/api/page';
import CreatePage from '@/components/CreatePage';
import SearchBar from '@/components/Searchbar/SearchBar';
import PageCard from './components/PageCard';
import ProjectCard from './components/ProjectCard';
import CreateProject from '@/components/CreateProject';
import styles from './../index.module.less';

/**
 * 页面列表
 */

function Category() {
  const [form] = Form.useForm();
  const [type, setType] = useState('project');
  const [searchParams] = useSearchParams();
  const createProjectRef = useRef<{ open: () => void }>();
  const createPageRef = useRef<{ open: () => void }>();
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

  // 列表切换
  const handleViewChange = (value: string) => {
    setType(value);
    search.submit();
  };

  // 新建项目或页面
  const handleCreate = () => {
    if (type === 'project') {
      createProjectRef.current?.open();
    } else {
      createPageRef.current?.open();
    }
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
        onViewChange={handleViewChange}
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

      {/* 加载子页面列表 */}
      {type === 'page' ? (
        <div className={styles.pagesContent}>
          <Spin spinning={loading} size="large" tip="加载中...">
            {tableProps.dataSource.length > 0 ? (
              <PageCard list={tableProps.dataSource} refresh={search.submit} />
            ) : (
              <Empty style={{ marginTop: 100 }}>
                <Button type="dashed" icon={<PlusOutlined />} onClick={handleCreate}>
                  创建页面
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
      <CreateProject ref={createProjectRef} update={search.submit} />

      {/* 新建页面 */}
      <CreatePage title="创建页面" createRef={createPageRef} update={search.submit} />
    </Layout.Content>
  );
}

export default memo(Category);
