import { Layout } from 'antd';
import SideMenu from './components/SideMenu';
import { Outlet } from 'react-router-dom';
import './index.less';
export default function Admin() {
  return (
    <Layout className="admin">
      <Layout.Sider style={{ height: 'calc(100vh - 64px)' }}>
        <SideMenu />
      </Layout.Sider>
      <Layout.Content className="content">
        <div className="wrapper">
          <Outlet></Outlet>
        </div>
      </Layout.Content>
    </Layout>
  );
}
