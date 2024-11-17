import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Empty, Form, Layout, Pagination, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { getPageList } from '@/api';
import pageApi from '@/api/page';
import CreatePage from '@/components/CreatePage';
import SearchBar from '@/components/Searchbar/SearchBar';
import PageCard from './components/PageCard';
import ProjectCard from './components/ProjectCard';
import styles2 from './page.module.less';
import CreateProject from '@/components/CreateProject';
import styles from './../index.module.less';

/**
 * 页面列表
 */

export default function Index() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [type, setType] = useState('project');
  const [searchParams] = useSearchParams();
  const createProjectRef = useRef<{ open: () => void }>();
  const createPageRef = useRef<{ open: () => void }>();

  // 判断是否是超大屏
  const isXLarge = useMediaQuery({ query: '(min-width: 1920px)' });

  useEffect(() => {
    isXLarge ? setPageSize(15) : setPageSize(12);
    getList(current, isXLarge ? 15 : 12);
  }, [current, pageSize]);

  // 列表切换
  const handleViewChange = (value: string) => {
    setType(value);
    setCurrent(1);
    setList([]);
    getList(1, pageSize, value);
  };

  // 加载页面列表
  const getList = async (pageNum: number = current, size: number = pageSize, value: string = type) => {
    setLoading(true);
    try {
      const { keyword } = form.getFieldsValue();
      const promise = value === 'project' ? pageApi.getCategoryList : getPageList;
      const res = await promise({
        pageNum,
        pageSize: size,
        keyword,
        projectId: Number(searchParams.get('projectId')),
      });
      setTotal(res?.total || 0);
      setList(res?.list || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // 切换页码和每页条数回调
  const handleChange = (_current: number, size: number) => {
    setCurrent(_current);
    setPageSize(size);
  };

  // 新建页面
  const handleCreate = () => {
    if (type === 'project') {
      createProjectRef.current?.open();
    } else {
      createPageRef.current?.open();
    }
  };

  // 提交搜索
  const handleSearch = () => {
    setCurrent(1);
    getList(1, pageSize);
  };

  return (
    <>
      <Layout.Content className={styles.pageList}>
        <SearchBar
          showGroup={false}
          form={form}
          from={type === 'project' ? '项目' : '页面'}
          submit={handleSearch}
          refresh={getList}
          onCreate={handleCreate}
          onViewChange={handleViewChange}
        />

        {/* 加载项目列表 */}
        {type === 'project' ? (
          <div className={styles2.projectGrid}>
            {list.map((project: any) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
        ) : null}

        {/* 加载页面列表 */}
        {(total > 0 || loading) && type === 'list' ? (
          <>
            <div className={styles.pagesContent}>
              <Spin spinning={loading} size="large" tip="加载中...">
                <PageCard list={list} getList={getList} />
              </Spin>
            </div>
          </>
        ) : (
          !loading &&
          type === 'list' && (
            <Empty style={{ marginTop: 100 }}>
              <Button type="dashed" icon={<PlusOutlined />} onClick={handleCreate}>
                创建项目
              </Button>
            </Empty>
          )
        )}

        <Pagination
          total={total}
          current={current}
          showSizeChanger
          pageSize={pageSize}
          pageSizeOptions={['12', '16', '20', '50']}
          showTotal={(total) => `总共 ${total} 条`}
          align="end"
          onChange={handleChange}
        />

        {/* 新建项目 */}
        <CreateProject ref={createProjectRef} update={() => getList(1, pageSize)} />
        {/* 新建页面 */}
        <CreatePage title="创建项目" createRef={createPageRef} update={() => getList(1, pageSize)} />
      </Layout.Content>
    </>
  );
}
