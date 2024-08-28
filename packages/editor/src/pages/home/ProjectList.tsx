import { Card, Col, Dropdown, Layout, Row, Pagination, Spin, Empty, Button, Form } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import type { MenuProps } from 'antd';
import { UserOutlined, DeleteOutlined, LinkOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { getProjectList, delProject } from '@/api';
import { Project } from '@/api/types';
import { Modal, message } from '@/utils/AntdGlobal';
import SearchBar from '@/components/Searchbar/SearchBar';
import { ProjectCardItemProps } from '../types';
import styles from './index.module.less';

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
  const [pageSize, setPageSize] = useState<number>(12);
  const navigate = useNavigate();

  useEffect(() => {
    getList(current, pageSize);
  }, [current, pageSize]);

  // 加载页面列表
  const getList = async (pageNum: number = current, size: number = pageSize) => {
    try {
      setLoading(true);
      const { type, keyword } = form.getFieldsValue();
      const res = await getProjectList({
        pageNum,
        pageSize: size,
        keyword,
        type,
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

  // 访问地址
  const getItems: (projectId: number) => MenuProps['items'] = (projectId: number) => {
    return [
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
  };

  // 切换页码和每页条数回调
  const handleChange = (_current: number, size: number) => {
    setCurrent(_current);
    setPageSize(size);
  };

  // 页面操作
  const handleAction = async (id: number, isAuth: boolean) => {
    if (!isAuth) {
      message.warning('该项目未授权，无法访问');
      return false;
    }
    navigate(`/project/${id}/config`);
  };

  // 提交搜索
  const handleSearch = () => {
    setCurrent(1);
    getList(1, pageSize);
  };

  // 项目卡片
  const CardItem: React.FC<ProjectCardItemProps> = ({ item, isAuth }) => {
    return (
      <Card
        hoverable
        style={{
          opacity: isAuth ? 1 : 0.6,
          background: isAuth ? 'none' : "url('/imgs/cross-bg.png')",
        }}
        actions={[
          <Dropdown key="link" menu={{ items: isAuth ? getItems(item.id) : [] }} trigger={['click']}>
            <div>
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
                  {item.user_name.split('@')?.[0]}
                  &nbsp;&nbsp;
                  {dayjs(item.updated_at).format('YYYY-MM-DD HH:mm')}
                </p>
              </>
            }
          />
        </div>
      </Card>
    );
  };

  return (
    <>
      <Layout.Content className={styles.project}>
        {total > 0 ? (
          <>
            <SearchBar form={form} from="项目" submit={handleSearch} refresh={getList} onCreate={() => navigate('/project/0/config')} />
            <div className={styles.projectList}>
              <Spin spinning={loading} size="large">
                <Row gutter={[20, 20]}>
                  {projectList.map((item: Project.ProjectItem, index) => {
                    return (
                      <Col span={6} key={item.id || index}>
                        <CardItem item={item} isAuth={item.id ? true : false} />
                      </Col>
                    );
                  })}
                </Row>
              </Spin>
            </div>
            <Pagination
              total={total}
              current={current}
              pageSize={pageSize}
              showSizeChanger
              pageSizeOptions={['12', '16', '20', '50']}
              showTotal={(total) => `总共 ${total} 条`}
              align="end"
              onChange={handleChange}
            />
          </>
        ) : (
          !loading && (
            <Empty style={{ marginTop: 100 }}>
              <Button type="dashed" icon={<PlusOutlined />} onClick={() => navigate('/project/0/config')}>
                新建项目
              </Button>
            </Empty>
          )
        )}
      </Layout.Content>
    </>
  );
}
