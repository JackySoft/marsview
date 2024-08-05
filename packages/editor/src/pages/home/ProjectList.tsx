import { Card, Col, Dropdown, Layout, Row, Pagination, Spin, Empty, Button } from 'antd';
import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { UserOutlined, DeleteOutlined, LinkOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getProjectList, delProject } from '@/api';
import { Project } from '@/api/types';
import { usePageStore } from '@/stores/pageStore';
import { Modal, message } from '@/utils/AntdGlobal';
import styles from './index.module.less';

/**
 * 页面列表
 */

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [projectList, setProjectList] = useState<Project.ProjectItem[]>([]);
  const [projectId, setProjectId] = useState(-1);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const userId = usePageStore((state) => state.userInfo.userId);
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

  // 删除项目确认
  const deleteProjectConfirm = (id: number, isAuth: boolean) => {
    if (!isAuth) {
      message.warning('该项目未授权，无法删除');
      return false;
    }
    Modal.confirm({
      title: '确认',
      content: '确认删除该项目吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await delProject({ id });
        message.success('删除成功');
        getList();
      },
    });
  };
  const items: MenuProps['items'] = [
    {
      key: 'stg',
      label: (
        <a href={`${import.meta.env.VITE_ADMIN_URL}/project/stg/${projectId}`} target="_blank">
          STG
        </a>
      ),
    },
    {
      key: 'pre',
      label: (
        <a href={`${import.meta.env.VITE_ADMIN_URL}/project/pre/${projectId}`} target="_blank">
          PRE
        </a>
      ),
    },
    {
      key: 'prod',
      label: (
        <a href={`${import.meta.env.VITE_ADMIN_URL}/project/prd/${projectId}`} target="_blank">
          PRD
        </a>
      ),
    },
  ];

  // 分页事件
  const handleChange = (page: number) => {
    setCurrent(page);
    getList(page);
  };

  // 页面操作
  const handleAction = async (id: number, isAuth: boolean) => {
    if (!isAuth) {
      message.warning('该项目未授权，无法访问');
      return false;
    }
    navigate(`/project/${id}/config`);
  };

  // 访问地址
  const handleVisit = (projectId: number, isAuth: boolean) => {
    if (!isAuth) {
      return message.warning('该项目未授权，无法访问');
    }
    setProjectId(projectId);
  };

  return (
    <>
      <Layout.Content className={styles.project}>
        <Spin spinning={loading} size="large">
          <Row gutter={[20, 20]}>
            {projectList.map((item: Project.ProjectItem, index) => {
              const isAuth = item.id ? true : false;
              return (
                <Col span={6} key={item.id || index}>
                  <Card
                    hoverable
                    style={{
                      opacity: isAuth ? 1 : 0.6,
                      background: isAuth ? 'none' : "url('/imgs/cross-bg.png')",
                    }}
                    actions={[
                      <Dropdown key="link" menu={{ items: isAuth ? items : [] }} trigger={['click']}>
                        <div onClick={() => handleVisit(item.id, isAuth)}>
                          <LinkOutlined />
                          <span className={styles.gabLeft}>访问地址</span>
                        </div>
                      </Dropdown>,
                      <div onClick={() => deleteProjectConfirm(item.id, isAuth)}>
                        <DeleteOutlined />
                        <span className={styles.gabLeft}>删除项目</span>
                      </div>,
                    ]}
                  >
                    <div onClick={() => handleAction(item.id, isAuth)}>
                      <Card.Meta
                        style={{ cursor: 'pointer' }}
                        avatar={<img src={item.logo} style={{ width: 32 }} />}
                        title={item.name}
                        description={
                          <>
                            <div style={{ position: 'absolute', top: 15, right: 15 }}>{isAuth ? null : <LockOutlined />}</div>
                            <p style={{ color: 'rgba(0, 0, 0, 0.88)' }}>{item.remark || '暂无描述'}</p>
                            <p style={{ marginTop: 10 }}>
                              <UserOutlined style={{ fontSize: 14, marginRight: 5 }} />
                              {item.user_name}
                              &nbsp;&nbsp;
                              {item.updated_at}
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
            style={{ textAlign: 'right', marginTop: 16 }}
            total={total}
            current={current}
            pageSize={12}
            showTotal={(total) => `总共 ${total} 条`}
            onChange={handleChange}
          />
        ) : (
          !loading && (
            <Empty style={{ marginTop: 100 }}>
              <Button type="primary" onClick={() => navigate('/project/0/config')}>
                创建项目
              </Button>
            </Empty>
          )
        )}
      </Layout.Content>
    </>
  );
}
