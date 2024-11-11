import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { useEffect, useState } from 'react';
import { ProjectOutlined, MenuOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePageStore } from '@/stores/pageStore';

const SideMenu = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const theme = usePageStore((state) => state.theme);
  type MenuItem = Required<MenuProps>['items'][number];
  // 生成每一个菜单项
  function getItem(label: string, key: string, icon: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
      label,
      key,
      icon,
      children,
    };
  }
  // 递归生成菜单
  const { id } = useParams();
  const location = useLocation();
  useEffect(() => {
    if (!id || id == '0') {
      setMenuList([getItem('项目配置', `/project/${id}/config`, <ProjectOutlined />)]);
      return;
    }
    setMenuList([
      getItem('项目配置', `/project/${id}/config`, <ProjectOutlined />),
      getItem('菜单列表', `/project/${id}/menu`, <MenuOutlined />),
      getItem('角色列表', `/project/${id}/role`, <TeamOutlined />),
      getItem('用户列表', `/project/${id}/user`, <UserOutlined />),
    ]);
    setSelectedKeys([location.pathname]);
  }, []);

  // 菜单点击
  const handleClickMenu = ({ key }: { key: string }) => {
    setSelectedKeys([key]);
    navigate(key);
  };
  return (
    <Menu
      mode="inline"
      theme={theme}
      style={{
        height: 'calc(100vh - 64px)',
      }}
      selectedKeys={selectedKeys}
      onClick={handleClickMenu}
      items={menuList}
    />
  );
};

export default SideMenu;
