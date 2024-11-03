import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CopyOutlined,
  EyeOutlined,
  UserOutlined,
  SendOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Input, Image, Layout, Pagination, Spin, Tag, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';
import { getPageTemplateList, copyPageData } from '@/api';
import { PageItem } from '@/api/types';
import { message } from '@/utils/AntdGlobal';
import styles from './index.module.less';

/**
 * 页面列表
 */

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<any>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [keyword, setKeyword] = useState<string>('');
  const navigate = useNavigate();

  // 判断是否是超大屏
  const isXLarge = useMediaQuery({ query: '(min-width: 1920px)' });

  useEffect(() => {
    getList(current, pageSize);
  }, [current, pageSize]);

  // 加载页面列表
  const getList = async (pageNum: number = current, size: number = pageSize) => {
    setLoading(true);
    try {
      const res = await getPageTemplateList({
        pageNum,
        pageSize: size,
        keyword,
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

  // 页面操作
  const handleAction = async (type: string, params: PageItem) => {
    if (type === 'preview') {
      if (!params.preview_img) {
        return message.warning('该页面未生成预览图');
      }
      setPreviewUrl(params.preview_img);
      setShowPreview(true);
      return;
    }

    if (type === 'edit') {
      return navigate(`/editor/${params?.id}/template`);
    }
    if (type === 'copy') {
      await copyPageData({
        id: params.id,
      });
      message.success('复制成功');
      getList();
    }
  };

  // 提交搜索
  const handleSearch = (value: string) => {
    setKeyword(value);
    setCurrent(1);
    getList(1, pageSize);
  };

  // 页面列表项
  const SectionItem = ({ item }: { item: PageItem }) => {
    return (
      <section className={styles.card}>
        <div className={styles.itemContent} onClick={() => handleAction('edit', item)}>
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
            <span>更新于 {dayjs(item.updated_at).fromNow()}</span>
          </div>
        </div>
        <div className={styles.itemFooter}>
          <Tooltip title="效果图预览">
            <EyeOutlined onClick={() => handleAction('preview', item)} />
          </Tooltip>
          <Tooltip title="页面复制">
            <CopyOutlined onClick={() => handleAction('copy', item)} />
          </Tooltip>
          <Tooltip title="页面访问">
            <SendOutlined
              onClick={() => {
                window.open(`${import.meta.env.VITE_ADMIN_URL}/page/stg/${item.id}`, '_blank');
              }}
            />
          </Tooltip>
        </div>
      </section>
    );
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
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fill, minmax(${isXLarge ? 400 : 300}px, 1fr))`,
                    gap: isXLarge ? 30 : 20,
                  }}
                >
                  {content.map((item: PageItem) => {
                    return <SectionItem item={item} key={item.id} />;
                  })}
                </div>
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
          </>
        }
      </Layout.Content>
    </>
  );
}

// 页面状态标签
const StateTag = ({ item }: { item: PageItem }) => {
  let stgTag = {
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

  return (
    <>
      <Tooltip title={stgTag.tooltip}>
        <Tag color={stgTag.color} icon={stgTag.icon}>
          STG
        </Tag>
      </Tooltip>
    </>
  );
};
