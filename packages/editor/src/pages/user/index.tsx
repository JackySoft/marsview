import React, { useState } from 'react';
import { Layout, Menu, Card, Avatar, Input, Button, Select, Breadcrumb } from 'antd';
import { UserOutlined, ShoppingOutlined, DollarOutlined, SettingOutlined, DeleteOutlined, HomeOutlined } from '@ant-design/icons';
import styles from './index.module.less';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const ProfilePage: React.FC = () => {
  const [email, setEmail] = useState('user@example.com');
  const [avatar, setAvatar] = useState('/placeholder.svg?height=100&width=100');
  const userId = '673a9d4eb3227142511c7e1a';
  const createdAt = new Date().toLocaleString();

  const handleAvatarChange = () => {
    const newAvatar = prompt('Enter new avatar URL');
    if (newAvatar) setAvatar(newAvatar);
  };

  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
        <Menu mode="inline" defaultSelectedKeys={['1']} className={styles.menu}>
          <Menu.Item key="1" icon={<UserOutlined />}>个人信息</Menu.Item>
          <Menu.Item key="2" icon={<ShoppingOutlined />}>市场中心</Menu.Item>
          {/* <Menu.Item key="3" icon={<DollarOutlined />></Menu.Item> */}
          {/* <Menu.Item key="4" icon={<SettingOutlined />}>Settings</Menu.Item> */}
          <Menu.Item key="5" icon={<DeleteOutlined />}>注销</Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content className={styles.content}>
          <div className={styles.card}>
            <div className={styles.headerBanner} />
            <div className={styles.profileContent}>
                <div className={styles.profileInfo}>
                  <Avatar src={avatar} size={128} className={styles.avatar} />
                  {/* <Button onClick={handleAvatarChange} className={styles.changeAvatarBtn}>Change Avatar</Button> */}
                  <div className={styles.userInfo}>
                    <h2>{email}</h2>
                    <p>{email}</p>
                  </div>
                </div>
              {/* <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.emailInput}
              /> */}
              <div className={styles.aboutSection}>
                <h3>关于</h3>
                <p>User ID: {userId}</p>
                <p>Created At: {createdAt}</p>
                <p>Current Organization: {email}&apos;s workspace</p>
              </div>
              <div className={styles.settingsSection}>
                <h3>Settings</h3>
                <div>
                  <span>UI Language: </span>
                  <Select defaultValue="en" style={{ width: 120 }}>
                    <Option value="en">🇬🇧 English</Option>
                    <Option value="zh">🇨🇳 中文</Option>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
