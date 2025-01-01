import { Layout } from 'antd';
import SideMenu from './components/SideMenu';
import { Outlet } from 'react-router-dom';
import styles from './index.module.less';
export default function Admin() {
  return (
    <Layout>
      <Layout.Sider>
        <SideMenu />
      </Layout.Sider>
      <Layout.Content className={styles.content}>
        <Outlet></Outlet>
      </Layout.Content>
    </Layout>
  );
}
