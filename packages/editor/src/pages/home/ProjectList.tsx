import { Card, Col, Layout, Row, Pagination, Spin, Empty, Button, Form } from 'antd';
import { useEffect, useState } from 'react';
import { UserOutlined, DeleteOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';
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
  const deleteProjectConfirm = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
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

  // 切换页码和每页条数回调
  const handleChange = (_current: number, size: number) => {
    setCurrent(_current);
    setPageSize(size);
  };

  // 页面操作
  const handleAction = async (id: number, isEdit: boolean) => {
    if (!id) {
      message.warning('该项目为私有项目');
      return false;
    }
    if (!isEdit) {
      message.warning('您不是该项目开发者，无权限操作');
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
          item.id ? (
            <a href={`${import.meta.env.VITE_ADMIN_URL}/project/stg/${item.id}`} target="_blank">
              STG
            </a>
          ) : (
            <span style={{ cursor: 'not-allowed' }}>STG</span>
          ),
          item.id ? (
            <a href={`${import.meta.env.VITE_ADMIN_URL}/project/pre/${item.id}`} target="_blank">
              PRE
            </a>
          ) : (
            <span style={{ cursor: 'not-allowed' }}>PRE</span>
          ),
          item.id ? (
            <a href={`${import.meta.env.VITE_ADMIN_URL}/project/prd/${item.id}`} target="_blank">
              PRD
            </a>
          ) : (
            <span style={{ cursor: 'not-allowed' }}>PRD</span>
          ),
        ]}
      >
        <div className={styles.projectCard} onClick={() => handleAction(item.id, item.is_edit)}>
          <Card.Meta
            style={{ cursor: isAuth ? 'pointer' : 'not-allowed' }}
            avatar={<img src={item.logo} style={{ width: 50 }} />}
            title={item.name}
            description={
              <>
                <div className={isAuth ? 'unlock' : 'lock'}>
                  <LockOutlined />
                </div>
                {item.id && item.is_edit ? (
                  <DeleteOutlined className={styles.delIcon} onClick={(event) => deleteProjectConfirm(event, item.id)} />
                ) : null}
                <p style={{ color: 'rgba(0, 0, 0, 0.88)' }}>{item.remark || '暂无描述'}</p>
                <p style={{ marginTop: 10 }}>
                  <UserOutlined style={{ fontSize: 14, marginRight: 5 }} />
                  {item.user_name.split('@')?.[0]}
                  &nbsp;&nbsp;
                  <span>更新于 {dayjs(item.updated_at).fromNow()}</span>
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
        <SearchBar form={form} from="项目" submit={handleSearch} refresh={getList} onCreate={() => navigate('/project/0/config')} />
        {total > 0 || loading ? (
          <>
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
