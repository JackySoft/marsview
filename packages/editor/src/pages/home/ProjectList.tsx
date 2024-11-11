import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Layout, Row, Pagination, Spin, Empty, Button, Form, Tooltip, Image } from 'antd';
import { UserOutlined, DeleteOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';
import { getProjectList, delProject } from '@/api';
import { Project } from '@/api/types';
import { Modal, message } from '@/utils/AntdGlobal';
import SearchBar from '@/components/Searchbar/SearchBar';
import { ProjectCardItemProps } from '../types';
import CreateProject from '@/components/CreateProject';
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
  const createRef = useRef<{ open: () => void }>();

  // 判断是否是超大屏
  const isXLarge = useMediaQuery({ query: '(min-width: 1920px)' });

  useEffect(() => {
    getList(current, pageSize);
  }, [current, pageSize]);

  // 加载页面列表
  const getList = useCallback(async (pageNum: number = current, size: number = pageSize) => {
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
  }, []);

  // 切换页码和每页条数回调
  const handleChange = (_current: number, size: number) => {
    setCurrent(_current);
    setPageSize(size);
  };

  // 新建页面
  const handleCreate = () => {
    createRef.current?.open();
  };

  // 提交搜索
  const handleSearch = () => {
    setCurrent(1);
    getList(1, pageSize);
  };

  return (
    <>
      <Layout.Content className={styles.project}>
        <SearchBar form={form} from="项目" submit={handleSearch} refresh={getList} onCreate={handleCreate} />
        {total > 0 || loading ? (
          <>
            <div className={styles.projectList}>
              <Spin spinning={loading} size="large" tip="加载中...">
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fill, minmax(${isXLarge ? 400 : 300}px, 1fr))`,
                    gap: isXLarge ? 30 : 20,
                  }}
                >
                  {projectList.map((item: Project.ProjectItem, index) => {
                    return <CardItem item={item} isAuth={item.id ? true : false} getList={getList} key={item.id || item.user_name + index} />;
                  })}
                </div>
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
              <Button type="dashed" icon={<PlusOutlined />} onClick={handleCreate}>
                新建项目
              </Button>
            </Empty>
          )
        )}
      </Layout.Content>
      <CreateProject ref={createRef} update={() => getList(1, pageSize)} />
    </>
  );
}
// 项目卡片
const CardItem: React.FC<ProjectCardItemProps> = memo(({ item, isAuth, getList }) => {
  const navigate = useNavigate();
  const getEnvTag = (env: 'stg' | 'pre' | 'prd', name: string) => {
    const title = {
      stg: '访问测试环境',
      pre: '访问预发布环境',
      prd: '访问生产环境',
    }[env];
    return (
      <Tooltip title={title}>
        <a href={`${import.meta.env.VITE_ADMIN_URL}/project/${item.id}?env=${env}`} target="_blank">
          {name}
        </a>
      </Tooltip>
    );
  };

  // 页面操作
  const handleAction = async (id: number, isEdit: boolean) => {
    if (!id) {
      message.warning('该项目为私有项目');
      return false;
    }
    if (!isEdit) {
      message.warning('您不是该项目开发者，当前只有访问权限。');
      return false;
    }
    navigate(`/project/${id}/config`);
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
  return (
    <Card
      hoverable
      style={{
        opacity: isAuth ? 1 : 0.6,
        background: isAuth ? 'none' : 'var(--mars-cross-bg)',
      }}
      actions={[
        item.id ? getEnvTag('stg', 'STG') : <span style={{ cursor: 'not-allowed' }}>STG</span>,
        item.id ? getEnvTag('pre', 'PRE') : <span style={{ cursor: 'not-allowed' }}>PRE</span>,
        item.id ? getEnvTag('prd', 'PRD') : <span style={{ cursor: 'not-allowed' }}>PRD</span>,
      ]}
    >
      <div className={styles.projectCard} onClick={() => handleAction(item.id, item.is_edit)}>
        <Card.Meta
          style={{ cursor: isAuth ? 'pointer' : 'not-allowed' }}
          avatar={<Image src={item.logo} width={50} />}
          title={item.name}
          description={
            <>
              <div className={isAuth ? 'unlock' : 'lock'}>
                <LockOutlined />
              </div>
              {item.id && item.is_edit ? (
                <DeleteOutlined className={styles.delIcon} onClick={(event) => deleteProjectConfirm(event, item.id)} />
              ) : null}
              <p style={{ color: 'var(--mars-theme-text-secondary-color)' }}>{item.remark || '暂无描述'}</p>
              <p style={{ marginTop: 10 }}>
                <UserOutlined style={{ fontSize: 14, marginRight: 5 }} />
                {item.user_name}
                &nbsp;&nbsp;
                <span>更新于 {dayjs(item.updated_at).fromNow()}</span>
              </p>
            </>
          }
        />
      </div>
    </Card>
  );
});
