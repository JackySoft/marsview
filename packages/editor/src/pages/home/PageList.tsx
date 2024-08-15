import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CopyOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  SendOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  RedoOutlined,
} from '@ant-design/icons';
import { Button, Col, Empty, Form, Image, Layout, Pagination, Row, Spin, Tag, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { getPageList, copyPageData, delPageData } from '@/api';
import { PageItem } from '@/api/types';
import { usePageStore } from '@/stores/pageStore';
import { message, Modal } from '@/utils/AntdGlobal';
import CreatePage from '@/layout/components/Header/CreatePage';
import styles from './index.module.less';
import SearchBar from '@/components/Searchbar/SearchBar';

/**
 * 页面列表
 */

export default function Index() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const creatPageRef = useRef<{ open: () => void }>();
  const { userInfo, isUpdateList } = usePageStore((state) => ({ userInfo: state.userInfo, isUpdateList: state.isUpdateList }));
  const navigate = useNavigate();
  useEffect(() => {
    getList();
  }, []);

  // 加载页面列表
  const getList = async (pageNum: number = current, size: number = pageSize) => {
    setLoading(true);
    try {
      const res = await getPageList({
        pageNum,
        pageSize: size,
        keyword: form.getFieldValue('keyword'),
      });
      setTotal(res?.total || 0);
      setContent(res?.list || []);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

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

  // 新建页面
  const handleCreate = () => {
    creatPageRef.current?.open();
  };

  // 页面操作
  const handleAction = async (type: string, params: PageItem, isAuth: boolean) => {
    if (type === 'preview') {
      if (!params.preview_img) {
        return message.warning('该页面未生成预览图');
      }
      setPreviewUrl(params.preview_img);
      setShowPreview(true);
      return;
    }
    if (!isAuth) return message.warning('该页面未授权，无法访问');

    if (type === 'edit') {
      return navigate(`/editor/${params?.id}/edit`);
    }
    if (type === 'copy') {
      await copyPageData({
        id: params.id,
      });
      message.success('复制成功');
      getList();
    }
    if (type === 'delete') {
      Modal.confirm({
        title: '确认',
        content: '确认删除吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          await delPageData({
            id: params.id,
          });
          message.success('删除成功');
          getList();
        },
      });
    }
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
      <Layout.Content className={styles.pageList}>
        <SearchBar form={form} submit={handleSearchSubmit} reset={handleSearchReset}>
          <Button type="dashed" style={{ marginRight: '10px' }} icon={<PlusOutlined />} onClick={handleCreate}>
            新建页面
          </Button>
          <Button shape="circle" icon={<RedoOutlined />} onClick={handleSearchReset}></Button>
        </SearchBar>
        <div className={styles.pagesContent}>
          <Spin spinning={loading} size="large">
            <Row gutter={[20, 20]}>
              {content.map((item: PageItem) => {
                const isAuth = item.id ? true : false;
                return (
                  <Col span={6} key={item.id}>
                    <section
                      className={styles.card}
                      key={item.id}
                      style={{
                        borderRadius: 8,
                        opacity: isAuth ? 1 : 0.6,
                        background: isAuth ? 'none' : "url('/imgs/cross-bg.png')",
                        overflow: 'hidden',
                      }}
                    >
                      <div className={styles.itemContent} onClick={() => handleAction('edit', item, isAuth)}>
                        <div className={styles.itemHeader}>
                          <StateTag item={item} />
                        </div>
                        <div className={styles.itemTitle}>{item.name}</div>
                        <div className={styles.itemRemark}>{item.remark || '暂无描述'}</div>
                        <div className={styles.updateUser}>
                          <span style={{ marginRight: 10 }}>
                            <UserOutlined style={{ fontSize: 15, marginRight: 5 }} />
                            {item.user_name}
                          </span>
                          <span>更新时间：{dayjs(item.updated_at).fromNow()}</span>
                        </div>
                      </div>
                      <div className={styles.itemFooter}>
                        <Tooltip title="效果图预览">
                          <EyeOutlined onClick={() => handleAction('preview', item, isAuth)} />
                        </Tooltip>
                        <Tooltip title="页面复制">
                          <CopyOutlined onClick={() => handleAction('copy', item, isAuth)} />
                        </Tooltip>
                        <Tooltip title="页面删除">
                          <DeleteOutlined onClick={() => handleAction('delete', item, isAuth)} />
                        </Tooltip>
                        <Tooltip title="页面访问">
                          <SendOutlined
                            onClick={() => {
                              window.open(`http://admin.marsview.cc/page/prd/${item.id}`, '_blank');
                            }}
                          />
                        </Tooltip>
                      </div>
                    </section>
                  </Col>
                );
              })}
            </Row>
          </Spin>
          <Image
            style={{ display: 'none' }}
            preview={{
              visible: showPreview,
              src: previewUrl,
              onVisibleChange: (value) => {
                setShowPreview(value);
              },
            }}
          />
        </div>

        <div className={styles.paginationContainer}>
          {total > 0 ? (
            <Pagination
              style={{ textAlign: 'right', marginTop: 16 }}
              total={total}
              current={current}
              showSizeChanger
              pageSize={pageSize}
              showTotal={(total) => `总共 ${total} 条`}
              onChange={handleChange}
              onShowSizeChange={handlePageSizeChange}
            />
          ) : (
            !loading && (
              <Empty style={{ marginTop: 100 }}>
                <Button type="primary" onClick={handleCreate}>
                  创建页面
                </Button>
              </Empty>
            )
          )}
        </div>
        {/* 新建页面 */}
        <CreatePage createRef={creatPageRef} />
      </Layout.Content>
    </>
  );
}

// 页面状态标签
const StateTag = ({ item }: { item: PageItem }) => {
  // 新页面
  if (item.stg_state === 1 && item.pre_state === 1 && item.prd_state === 1) {
    return (
      <Tag>
        <Tooltip title="待开发">NEW</Tooltip>
      </Tag>
    );
  }
  let stgTag = {
    color: '',
    icon: <CheckCircleOutlined />,
    tooltip: '已发布',
  };
  let preTag = {
    color: '',
    icon: <CheckCircleOutlined />,
    tooltip: '已发布',
  };
  let prdTag = {
    color: '',
    icon: <CheckCircleOutlined />,
    tooltip: '已发布',
  };
  if (item.stg_state === 4) {
    stgTag = {
      color: 'red',
      icon: <ExclamationCircleOutlined />,
      tooltip: '版本已回滚',
    };
  } else if (item.stg_state === 3) {
    stgTag = {
      color: 'success',
      icon: <CheckCircleOutlined />,
      tooltip: '版本已发布',
    };
  } else if (item.stg_state === 2 && item.stg_publish_id) {
    stgTag = {
      color: 'warning',
      icon: <ExclamationCircleOutlined />,
      tooltip: '版本已落后',
    };
  } else {
    stgTag = {
      color: '',
      icon: <ClockCircleOutlined />,
      tooltip: '版本未发布',
    };
  }
  if (item.pre_state === 4) {
    preTag = {
      color: 'red',
      icon: <ExclamationCircleOutlined />,
      tooltip: '版本已回滚',
    };
  } else if (item.pre_state === 3) {
    preTag = {
      color: 'success',
      icon: <CheckCircleOutlined />,
      tooltip: '版本已发布',
    };
  } else if (item.pre_state === 2 && item.pre_publish_id) {
    preTag = {
      color: 'warning',
      icon: <ExclamationCircleOutlined />,
      tooltip: '版本已落后',
    };
  } else {
    preTag = {
      color: '',
      icon: <ClockCircleOutlined />,
      tooltip: '版本未发布',
    };
  }
  if (item.prd_state === 4) {
    prdTag = {
      color: 'red',
      icon: <ExclamationCircleOutlined />,
      tooltip: '版本已回滚',
    };
  } else if (item.prd_state === 3) {
    prdTag = {
      color: 'success',
      icon: <CheckCircleOutlined />,
      tooltip: '版本已发布',
    };
  } else if (item.prd_state === 2 && item.prd_publish_id) {
    prdTag = {
      color: 'warning',
      icon: <ExclamationCircleOutlined />,
      tooltip: '版本已落后',
    };
  } else {
    prdTag = {
      color: '',
      icon: <ClockCircleOutlined />,
      tooltip: '版本未发布',
    };
  }

  return (
    <>
      <Tooltip title={stgTag.tooltip}>
        <Tag color={stgTag.color} icon={stgTag.icon}>
          STG
        </Tag>
      </Tooltip>
      <Tooltip title={preTag.tooltip}>
        <Tag color={preTag.color} icon={preTag.icon}>
          PRE
        </Tag>
      </Tooltip>
      <Tooltip title={prdTag.tooltip}>
        <Tag color={prdTag.color} icon={prdTag.icon}>
          PRD
        </Tag>
      </Tooltip>
    </>
  );
};
