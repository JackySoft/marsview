import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ConfigProvider, Menu } from 'antd';
import type { MenuProps, MenuTheme } from 'antd';
import * as Icons from '@ant-design/icons';
import { useProjectStore } from '@/stores/projectStore';
import { IMenuItem } from '@/types';

type MenuItem = Required<MenuProps>['items'][number];

const MenuComponent: React.FC = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { projectId } = useParams();
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
          const path = `/project/${projectId}/${item.path.startsWith('/') ? item.path.slice(1) : item.path || item.pageId || -item.id}`;
          return treeList.push(getMenuItem(item.name, path, iconsList[item.icon] && React.createElement(iconsList[item.icon])));
        }
        const path = `${projectId}-${item.id}`;
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
      style={
        projectInfo.menuMode === 'horizontal'
          ? { width: 'calc(100vw - 458px)' }
          : {
              width: collapsed ? 79 : 255,
              background: projectInfo.menuThemeColor === 'light' ? '#fff' : '#001529',
              borderRight: projectInfo.layout === 2 ? '1px solid #e8e9eb' : 'none',
              overflowX: 'hidden',
            }
      }
    >
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              darkItemColor: '#fff',
              darkItemHoverColor: projectInfo.systemThemeColor,
              iconSize: 16,
            },
          },
        }}
      >
        <Menu
          onClick={onClick}
          theme={projectInfo.menuThemeColor as MenuTheme}
          selectedKeys={selectedKeys}
          style={projectInfo.menuMode === 'horizontal' ? {} : { height: 'calc(100vh - 64px)', border: 'none', overflowY: 'auto' }}
          mode={projectInfo.menuMode}
          inlineCollapsed={projectInfo.menuMode === 'horizontal' ? undefined : collapsed}
          items={menuList}
        />
      </ConfigProvider>
    </div>
  );
};

export default MenuComponent;
