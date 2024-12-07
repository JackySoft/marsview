import { Layout } from 'antd';
import SideMenu from './components/SideMenu';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import projectApi from '@/api/project';
import styles from './index.module.less';
export default function Admin() {
  const { id } = useParams();
  const navigate = useNavigate();
  // 项目加载
  useEffect(() => {
    if (!id) return;
    projectApi.checkAuth({ id: Number(id) }).then((res) => {
      if (res) {
        navigate(res === '404' ? '/404' : '/403');
      }
    });
  }, []);
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
