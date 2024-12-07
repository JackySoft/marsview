import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip, Image, Card } from 'antd';
import { UserOutlined, EyeOutlined, CopyOutlined, DeleteOutlined, SendOutlined, GlobalOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { message, Modal } from '@/utils/AntdGlobal';
import api from '@/api/page';
import EnvTag from './EnvTag';
import { PageItem } from '@/api/types';
import styles from './../../index.module.less';

// 页面列表项
const PageCard = ({ list, copy, refresh }: { list: PageItem[]; copy: (item: PageItem) => void; refresh: () => void }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const navigate = useNavigate();

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
      return copy?.(params);
    }
    if (type === 'delete') {
      Modal.confirm({
        title: '确认',
        content: '删除后，该页面无法恢复，请谨慎操作。',
        okText: '确认',
        okButtonProps: { danger: true },
        cancelText: '取消',
        onOk: async () => {
          await api.delPageData({
            id: params.id,
          });
          message.success('删除成功');
          refresh();
        },
      });
    }
  };
  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fill, minmax(320px, 1fr))`,
          gap: 20,
        }}
      >
        {list.map((item: PageItem, index: number) => {
          return (
            <Card
              key={item.id || item.userName + index}
              actions={[
                <Tooltip title="预览">
                  <EyeOutlined style={{ fontSize: 16 }} onClick={() => handleAction('preview', item)} />
                </Tooltip>,
                <Tooltip title="复制">
                  <CopyOutlined style={{ fontSize: 16 }} onClick={() => handleAction('copy', item)} />
                </Tooltip>,
                <Tooltip title="删除">
                  <DeleteOutlined style={{ fontSize: 16 }} onClick={() => handleAction('delete', item)} />
                </Tooltip>,
                <Tooltip title="访问STG">
                  <GlobalOutlined
                    style={{ fontSize: 16 }}
                    onClick={() => {
                      window.open(`${import.meta.env.VITE_ADMIN_URL}/page/${item.id}?env=stg`, '_blank');
                    }}
                  />
                </Tooltip>,
              ]}
            >
              <div className={styles.cardBody} onClick={() => handleAction('edit', item)}>
                <div className={styles.itemEnv}>
                  <EnvTag item={item} />
                </div>
                <div className={styles.itemTitle}>{item.name}</div>
                <div className={styles.itemRemark}>{item.remark || '暂无描述'}</div>
                <div className={styles.updateUser}>
                  <span style={{ marginRight: 10 }}>
                    <UserOutlined style={{ fontSize: 15, marginRight: 5 }} />
                    <span>{item.userName}</span>
                  </span>
                  <span>更新于 {dayjs(item.updatedAt).fromNow()}</span>
                </div>
              </div>
            </Card>
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
