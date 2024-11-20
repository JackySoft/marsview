import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Layout, Row, Pagination, Spin, Empty, Button, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { getProjectList } from '@/api';
import { ProjectItem } from '@/types';
import HomeHeader from './HomeHeader';
import style from './index.module.less';

// 后台控制台
function Console() {
  const [loading, setLoading] = useState(true);
  const [projectList, setProjectList] = useState<ProjectItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    getList();
  }, []);

  // 加载页面列表
  const getList = async (pageNum: number = current) => {
    try {
      setLoading(true);
      const res = await getProjectList({
        pageNum,
        pageSize: 12,
      });
      setLoading(false);
      setProjectList(res?.list || []);
      setTotal(res?.total || 0);
    } catch (error) {
      setLoading(false);
    }
  };

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

  // 分页事件
  const handleChange = (page: number) => {
    setCurrent(page);
    getList(page);
  };
  return (
    <>
      <HomeHeader />
      <Layout.Content className={style.project}>
        <Spin spinning={loading} size="large">
          <Row gutter={[20, 20]}>
            {projectList.map((item: ProjectItem) => {
              return (
                <Col span={6} key={item.id}>
                  <Card
                    hoverable
                    actions={[
                      item.id ? getEnvTag('stg', 'STG', item.id) : <span style={{ cursor: 'not-allowed' }}>STG</span>,
                      item.id ? getEnvTag('pre', 'PRE', item.id) : <span style={{ cursor: 'not-allowed' }}>PRE</span>,
                      item.id ? getEnvTag('prd', 'PRD', item.id) : <span style={{ cursor: 'not-allowed' }}>PRD</span>,
                    ]}
                  >
                    <div onClick={() => handleAction(item.id)}>
                      <Card.Meta
                        style={{ cursor: 'pointer' }}
                        avatar={<img src={item.logo} style={{ width: 32 }} />}
                        title={item.name}
                        description={
                          <>
                            <div style={{ position: 'absolute', top: 15, right: 15 }}></div>
                            <p style={{ color: 'rgba(0, 0, 0, 0.88)' }}>{item.remark}</p>
                            <p style={{ marginTop: 10 }}>
                              <UserOutlined style={{ fontSize: 14, marginRight: 5 }} />
                              {item.updatedAt}
                            </p>
                          </>
                        }
                      />
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Spin>
        {total > 0 ? (
          <Pagination
            style={{ marginTop: 16 }}
            total={total}
            current={current}
            pageSize={12}
            showTotal={(total) => `总共 ${total} 条`}
            align="end"
            onChange={handleChange}
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
