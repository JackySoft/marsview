import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Image } from 'antd';
import { UserOutlined, EyeOutlined, CopyOutlined, DeleteOutlined, SendOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useMediaQuery } from 'react-responsive';
import { message, Modal } from '@/utils/AntdGlobal';
import { copyPageData, delPageData } from '@/api';
import EnvTag from './EnvTag';
import { PageItem } from '@/api/types';
import styles from './../../index.module.less';

// 页面列表项
const PageCard = ({ list, getList }: { list: PageItem[]; getList: () => void }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const navigate = useNavigate();

  // 判断是否是超大屏
  const isXLarge = useMediaQuery({ query: '(min-width: 1920px)' });
  // 页面操作
  const handleAction = async (type: string, params: PageItem) => {
    if (type === 'preview') {
      if (!params.previewImg) {
        return message.warning('该页面未生成预览图');
      }
      setShowPreview(true);
      setPreviewUrl(params.previewImg);
      return;
    }

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
        content: '删除后，该页面无法恢复，请谨慎操作。',
        okText: '确认',
        okButtonProps: { danger: true },
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
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(${isXLarge ? 400 : 300}px, 1fr))`,
          gap: isXLarge ? 30 : 20,
        }}
      >
        {list.map((item: PageItem, index: number) => {
          return (
            <section
              key={item.id || item.userName + index}
              className={styles.card}
              style={{
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              <div className={styles.itemContent} onClick={() => handleAction('edit', item)}>
                <div className={styles.itemHeader}>
                  <EnvTag item={item} />
                </div>
                <div className={styles.itemTitle}>{item.name}</div>
                <div className={styles.itemRemark}>{item.remark || '暂无描述'}</div>
                <div className={styles.updateUser}>
                  <span style={{ marginRight: 10 }}>
                    <UserOutlined style={{ fontSize: 15, marginRight: 5 }} />
                    {item.userName}
                  </span>
                  <span>更新于 {dayjs(item.updatedAt).fromNow()}</span>
                </div>
              </div>
              <div className={styles.itemFooter}>
                <Tooltip title="预览">
                  <EyeOutlined onClick={() => handleAction('preview', item)} />
                </Tooltip>
                <Tooltip title="复制">
                  <CopyOutlined onClick={() => handleAction('copy', item)} />
                </Tooltip>
                <Tooltip title="删除">
                  <DeleteOutlined onClick={() => handleAction('delete', item)} />
                </Tooltip>
                <Tooltip title="访问STG">
                  <SendOutlined
                    onClick={() => {
                      window.open(`${import.meta.env.VITE_ADMIN_URL}/page/${item.id}?env=stg`, '_blank');
                    }}
                  />
                </Tooltip>
              </div>
            </section>
          );
        })}
      </div>
      {/* 图片预览 */}
      <Image
        style={{ display: 'none' }}
        preview={{
          visible: showPreview,
          src: previewUrl,
          onVisibleChange: (value) => {
            setShowPreview(value);
            setPreviewUrl('');
          },
        }}
      />
    </>
  );
};

export default PageCard;
