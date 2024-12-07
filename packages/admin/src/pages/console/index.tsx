import { useNavigate } from 'react-router-dom';
import { Card, Layout, Pagination, Spin, Empty, Button, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAntdTable } from 'ahooks';
import { useMediaQuery } from 'react-responsive';
import { getProjectList } from '@/api';
import HomeHeader from './HomeHeader';
import style from './index.module.less';

// 后台控制台
function Console() {
  const navigate = useNavigate();

  // 判断是否是超大屏
  const isXLarge = useMediaQuery({ query: '(min-width: 1920px)' });

  // 获取列表数据
  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }) => {
    return getProjectList({
      pageNum: current,
      pageSize: pageSize,
    }).then((res) => {
      return {
        total: res.total,
        list: res.list,
      };
    });
  };

  const { tableProps, loading } = useAntdTable(getTableData, {
    defaultPageSize: isXLarge ? 15 : 12,
  });

  const getEnvTag = (env: 'stg' | 'pre' | 'prd', name: string, id: number) => {
    const title = {
      stg: '访问测试环境',
      pre: '访问预发布环境',
      prd: '访问生产环境',
    }[env];
    return (
      <Tooltip title={title}>
        <a href={`/project/${id}?env=${env}`} target="_blank">
          {name}
        </a>
      </Tooltip>
    );
  };

  // 页面操作
  const handleAction = async (id: number) => {
    navigate(`/project/${id}`);
  };

  return (
    <>
      <HomeHeader />
      <Layout.Content className={style.project}>
        <Spin spinning={loading} size="large">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(320px, 1fr))`,
              gap: 20,
            }}
          >
            {tableProps.dataSource.map((item) => {
              return (
                <Card
                  key={item.id}
                  hoverable
                  actions={[getEnvTag('stg', 'STG', item.id), getEnvTag('pre', 'PRE', item.id), getEnvTag('prd', 'PRD', item.id)]}
                >
                  <div onClick={() => handleAction(item.id)}>
                    <Card.Meta
                      style={{ cursor: 'pointer' }}
                      avatar={<img src={item.logo} style={{ width: 32 }} />}
                      title={item.name}
                      description={
                        <>
                          <div style={{ position: 'absolute', top: 15, right: 15 }}></div>
                          <div className={style.itemRemark}>{item.remark}</div>
                          <div style={{ marginTop: 10 }}>
                            <UserOutlined style={{ fontSize: 14, marginRight: 5 }} />
                            {item.updatedAt}
                          </div>
                        </>
                      }
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        </Spin>
        {tableProps.dataSource.length > 0 ? (
          <Pagination
            style={{ marginTop: 16 }}
            {...tableProps.pagination}
            onChange={(current, pageSize) => tableProps.onChange({ current, pageSize })}
            pageSize={12}
            showTotal={(total) => `总共 ${total} 条`}
            align="end"
          />
        ) : (
          !loading && (
            <Empty style={{ marginTop: 100 }} description="当前暂无可访问的项目">
              <Button type="primary" onClick={() => window.open('https://www.marsview.com.cn/projects', 'blank')}>
                去创建
              </Button>
            </Empty>
          )
        )}
      </Layout.Content>
    </>
  );
}
export default Console;
