import { useEffect, useState } from 'react';
import { Input, Layout, Pagination, Spin } from 'antd';
import { useMediaQuery } from 'react-responsive';
import api from '@/api/page';
import PageCard from './project/components/PageCard';
import styles from './index.module.less';

/**
 * 模板列表
 */
export default function Index() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [keyword, setKeyword] = useState<string>('');

  // 判断是否是超大屏
  const isXLarge = useMediaQuery({ query: '(min-width: 1920px)' });

  useEffect(() => {
    isXLarge ? setPageSize(15) : setPageSize(12);
    getList(current, isXLarge ? 15 : 12);
  }, [current, pageSize]);

  // 加载页面列表
  const getList = async (pageNum: number = current, size: number = pageSize) => {
    setLoading(true);
    try {
      const res = await api.getPageTemplateList({
        pageNum,
        pageSize: size,
        keyword,
        projectId: 0,
      });
      setTotal(res?.total || 0);
      setContent(res?.list || []);
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

  // 提交搜索
  const handleSearch = (value: string) => {
    setKeyword(value);
    setCurrent(1);
    getList(1, pageSize);
  };

  return (
    <>
      <Layout.Content className={styles.pageList}>
        <div className={styles.searchBox}>
          <Input.Search placeholder="查找模板" enterButton="搜索" size="large" loading={loading} onSearch={handleSearch} />
        </div>
        {
          <>
            <div className={styles.pagesContent}>
              <Spin spinning={loading} size="large">
                <PageCard list={content} refresh={getList} />
              </Spin>
            </div>
            <Pagination
              total={total}
              current={current}
              showSizeChanger
              pageSize={pageSize}
              showTotal={(total) => `总共 ${total} 条`}
              align="end"
              onChange={handleChange}
            />
          </>
        }
      </Layout.Content>
    </>
  );
}
