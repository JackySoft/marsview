import { memo, useState, useEffect, useMemo } from 'react';
import { Switch, Button, Input, Avatar, Tooltip, QRCode } from 'antd';
import { LinkOutlined, CopyOutlined, UserOutlined, QrcodeOutlined, MutedOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { usePageStore } from '@/stores/pageStore';
import api from '@/api/page';
import styles from './index.module.less';

/**
 * 页面分享
 */
export default memo(() => {
  const [isCopy, setCopy] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const { userInfo, id, isPublic, savePageInfo } = usePageStore((state) => ({
    userInfo: state.userInfo,
    id: state.page.id,
    isPublic: state.page.isPublic,
    savePageInfo: state.savePageInfo,
  }));

  useEffect(() => {
    setChecked(isPublic == 1);
  }, [isPublic]);

  const shareLink = useMemo(() => `${import.meta.env.VITE_ADMIN_URL}/page/${id}?env=stg`, [id]);

  // 复制链接
  const copyText = () => {
    copy(shareLink);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  // 设置访问权限
  const updateVisitLimit = async (checked: boolean) => {
    setChecked(checked);
    await api.updatePageData({
      id,
      isPublic: checked ? 1 : 2,
    });
    savePageInfo({ isPublic: checked ? 1 : 2 });
  };

  return (
    <div className={styles.shareContent}>
      <Input readOnly value={shareLink} addonAfter={isCopy ? '复制成功' : <CopyOutlined onClick={copyText} />} />
      <p className={styles.shareUser}>
        <span>管理员</span>
        <span className={styles.tips}>
          (<MutedOutlined />
          ：私有页面需添加开发者或体验者才可访问)
        </span>
      </p>

      <Tooltip title={userInfo.nickName} placement="bottom">
        <Avatar src={userInfo.avatar} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />}></Avatar>
      </Tooltip>
      <p className={styles.visitLimit}>
        <span className={styles.label}>访问权限</span>
        <Switch checkedChildren="公开" unCheckedChildren="私有" checked={checked} onChange={updateVisitLimit} />
      </p>

      <div className={styles.footer}>
        <Button color="primary" variant="filled" icon={<LinkOutlined />} onClick={() => window.open(shareLink, '_blank')}>
          一键访问
        </Button>
        <Tooltip title={<QRCode value={shareLink} type="svg" size={120} />} placement="right" color="var(--mars-theme-bg-color)">
          <Button color="primary" variant="filled" icon={<QrcodeOutlined />}>
            二维码
          </Button>
        </Tooltip>
      </div>
    </div>
  );
});
