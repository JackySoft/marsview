import { useState } from 'react';
import styles from './index.module.less';
import { Avatar, Input, Upload, Button } from 'antd';
import {
  CameraOutlined,
  EditOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  SaveOutlined,
  UserOutlined,
  WechatOutlined,
} from '@ant-design/icons';

const UserCenter = () => {
  const [email, setEmail] = useState('user@example.com');
  const [avatar, setAvatar] = useState('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png');
  const userId = '673a9d4eb3227142511c7e1a';
  const createdAt = new Date().toLocaleString();

  const [userNameEdit, setUserNameEdit] = useState(false);

  const handleAvatarUpload = (info: any) => {
    if (info.file.status === 'done') {
      const newAvatar = prompt('Enter new avatar URL');
      if (newAvatar) setAvatar(newAvatar);
    }
  };

  const uploadProps = {
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange: handleAvatarUpload,
    multiple: true,
  };

  return (
    <div className={styles.card}>
      <div className={styles.headerBanner} />
      <div className={styles.profileContent}>
        <div className={styles.profileInfo}>
          <div className={styles.avatarWrapper}>
            <Avatar src={avatar || '/placeholder.svg'} size={128} className={styles.avatar}>
              {!avatar && 'UN'}
            </Avatar>
            <Upload {...uploadProps} className={styles.uploadOverlay}>
              <CameraOutlined className={styles.icon} />
            </Upload>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>
              {userNameEdit ? (
                <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => setUserNameEdit(false)} />
              ) : (
                <div className={styles.nameInfo}>{email}</div>
              )}
              <div className={styles.nameAction} onClick={() => setUserNameEdit(!userNameEdit)}>
                {userNameEdit ? <SaveOutlined /> : <EditOutlined />}
              </div>
            </div>
            <div className={styles.userEmail}>{email}</div>
          </div>
        </div>
        <div className={styles.baseSection}>
          <h2>基本信息</h2>
          <div className={styles.baseInfo}>
            <div className={styles.baseItem}>
              <span>User ID</span>
              <span>{email}</span>
            </div>
            <div className={styles.baseItem}>
              <span>注册日期</span>
              <span>2024/11/20 21:44:35</span>
            </div>
          </div>
        </div>
        <div className={styles.splitLine} />
        <div className={styles.settingsSection}>
          <h2>账号安全</h2>
          <div className={styles.settingsInfo}>
            <div className={styles.settingsItem}>
              <div className={styles.settingsLeft}>
                <MailOutlined className={styles.settingsIcon} />
                <div className={styles.settingsContent}>
                  <span className={styles.settingsTitle}>邮箱</span>
                  <span className={styles.settingsDesc}>user@example.com</span>
                </div>
              </div>
              <Button>修改</Button>
            </div>
          </div>

          <div className={styles.settingsInfo}>
            <div className={styles.settingsItem}>
              <div className={styles.settingsLeft}>
                <LockOutlined className={styles.settingsIcon} />
                <div className={styles.settingsContent}>
                  <span className={styles.settingsTitle}>密码更改</span>
                  <span className={styles.settingsDesc}>*********</span>
                </div>
              </div>
              <Button>修改</Button>
            </div>
          </div>

          <div className={styles.settingsInfo}>
            <div className={styles.settingsItem}>
              <div className={styles.settingsLeft}>
                <PhoneOutlined className={styles.settingsIcon} />
                <div className={styles.settingsContent}>
                  <span className={styles.settingsTitle}>手机绑定</span>
                  <span className={styles.settingsDesc}>敬请期待</span>
                </div>
              </div>
              <Button disabled>绑定</Button>
            </div>
          </div>

          <div className={styles.settingsInfo}>
            <div className={styles.settingsItem}>
              <div className={styles.settingsLeft}>
                <WechatOutlined className={styles.settingsIcon} />
                <div className={styles.settingsContent}>
                  <span className={styles.settingsTitle}>微信绑定</span>
                  <span className={styles.settingsDesc}>敬请期待</span>
                </div>
              </div>
              <Button disabled>绑定</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCenter;
