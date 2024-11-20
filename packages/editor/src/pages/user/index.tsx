import { Layout, Menu } from 'antd';
import styles from './index.module.less';
import UserCenter from './components/user-center';
const { Header, Sider, Content } = Layout;
import { UserOutlined, ShoppingOutlined, DeleteOutlined } from '@ant-design/icons';

const ProfilePage: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <Sider className={styles.sider}>
        <Menu mode="inline" defaultSelectedKeys={['1']} className={styles.menu}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            个人中心
          </Menu.Item>
          {/* <Menu.Item key="2" icon={<ShoppingOutlined />}>
            市场中心
          </Menu.Item> */}
          {/* <Menu.Item key="3" icon={<DollarOutlined />></Menu.Item> */}
          {/* <Menu.Item key="4" icon={<SettingOutlined />}>Settings</Menu.Item> */}
          {/* <Menu.Item key="5" icon={<DeleteOutlined />}>
            注销
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout>
        <Content className={styles.content}>
          <UserCenter />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
