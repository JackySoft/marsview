import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Menu } from 'antd';
import type { MenuProps, MenuTheme } from 'antd';
import Icon, * as Icons from '@ant-design/icons';
import { useProjectStore } from '@/stores/projectStore';
import { IMenuItem } from '@/types';

type MenuItem = Required<MenuProps>['items'][number];

const MenuComponent: React.FC = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { env, projectId } = useParams();
  const { collapsed, menuTree, projectInfo } = useProjectStore();

  useEffect(() => {
    const treeMenu = getTreeMenu(menuTree);
    setMenuList(treeMenu);
  }, [menuTree]);

  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  // 递归生成菜单
  const getTreeMenu = (menuList: IMenuItem[], treeList: MenuItem[] = []) => {
    menuList.forEach((item) => {
      if (item.type === 1 && item.status === 1) {
        const iconsList: { [key: string]: any } = Icons;
        if (item.buttons?.length || !item.children) {
          const path = `/project/${env}/${projectId}/${item.page_id || -item.id}`;
          return treeList.push(getMenuItem(item.name, path, iconsList[item.icon] && React.createElement(iconsList[item.icon])));
        }
        const path = `/project/${env}/${projectId}/${item.id}`;
        treeList.push(
          getMenuItem(item.name, path, iconsList[item.icon] && React.createElement(iconsList[item.icon]), getTreeMenu(item.children || [])),
        );
      }
    });
    return treeList;
  };
  function getMenuItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
    if (children?.length === 0) {
      children = undefined;
    }
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  // 菜单点击事件
  const onClick: MenuProps['onClick'] = (e: { key: string }) => {
    const key = e.key;
    if (pathname === key) return;
    if (Number(e.key.split('/').slice(-1)[0]) < 0) {
      navigate('notPublish');
    } else {
      navigate(key);
    }
  };

  return (
    <div
      style={{
        width: collapsed ? 80 : 255,
        background: projectInfo.menu_theme_color === 'light' ? '#fff' : '#001529',
        borderRight: projectInfo.layout === 2 ? '1px solid #e8e9eb' : 'none',
      }}
    >
      <Menu
        onClick={onClick}
        theme={projectInfo.menu_theme_color as MenuTheme}
        selectedKeys={selectedKeys}
        style={{ height: 'calc(100vh - 64px)', border: 'none', overflowY: 'auto' }}
        mode={projectInfo.menu_mode}
        inlineCollapsed={collapsed}
        items={menuList}
      />
    </div>
  );
};

export default MenuComponent;
