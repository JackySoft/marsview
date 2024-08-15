import { Card, Col, Dropdown, Layout, Row, Pagination, Spin, Empty, Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import type { MenuProps } from 'antd';
import { UserOutlined, DeleteOutlined, LinkOutlined, LockOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getProjectList, delProject } from '@/api';
import { Project } from '@/api/types';
import { usePageStore } from '@/stores/pageStore';
import { Modal, message } from '@/utils/AntdGlobal';
import styles from './index.module.less';
import SearchBar from '@/components/Searchbar/SearchBar';
import { set } from 'lodash-es';

/**
 * 页面列表
 */

export default function Index() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [projectList, setProjectList] = useState<Project.ProjectItem[]>([]);
  const [projectId, setProjectId] = useState(-1);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const userId = usePageStore((state) => state.userInfo.userId);
  const navigate = useNavigate();

  useEffect(() => {
    getList();
  }, []);

  // 加载页面列表
  const getList = async (pageNum: number = current, size: number = pageSize) => {
    try {
      setLoading(true);
      const res = await getProjectList({
        pageNum,
        pageSize: size,
        keyword: form.getFieldValue('keyword'),
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

  // 切换页码和每页条数回调
  const handleChange = (page: number, pageSize?: number) => {
    setCurrent(page);
    setPageSize(pageSize || 12);
    getList(page, pageSize);
  };

  // 切换每页条数回调
  const handlePageSizeChange = (_current: number, size: number) => {
    setCurrent(1);
    setPageSize(size);
    getList(1, size);
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

  // 提交搜索
  const handleSearchSubmit = () => {
    setCurrent(1);
    getList(1, pageSize);
  };

  // 重置或者刷新页面
  const handleSearchReset = () => {
    form.resetFields();
    setCurrent(1);
    getList(1, pageSize);
  };

  return (
    <>
      <Layout.Content className={styles.project}>
        <SearchBar form={form} submit={handleSearchSubmit} reset={handleSearchReset}>
          <Button type="dashed" style={{ marginRight: '10px' }} icon={<PlusOutlined />} onClick={() => navigate('/project/0/config')}>
            新建项目
          </Button>
          <Button shape="circle" icon={<RedoOutlined />} onClick={handleSearchReset}></Button>
        </SearchBar>
        <div className={styles.projectList}>
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
        </div>
        <div className={styles.paginationContainer}>
          {total > 0 ? (
            <Pagination
              total={total}
              current={current}
              pageSize={pageSize}
              showTotal={(total) => `总共 ${total} 条`}
              onChange={handleChange}
              showSizeChanger
              onShowSizeChange={handlePageSizeChange}
            />
          ) : (
            !loading && (
              <Empty style={{ marginTop: 100 }}>
                <Button type="dashed" icon={<PlusOutlined />} onClick={() => navigate('/project/0/config')}>
                  新建项目
                </Button>
              </Empty>
            )
          )}
        </div>
      </Layout.Content>
    </>
  );
}
