import React, { memo, useEffect, useState } from 'react';
import { Dropdown, Flex, Space } from 'antd';
import { DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { usePageStore } from '@marsview/materials/stores/pageStore';
import { useProjectStore } from '@/stores/projectStore';
import Logo from '../Logo/Logo';
import BreadList from '../BreadList/BreadList';
import Menu from '../Menu/Menu';
import { getUserAvatar } from '@/api';
import styles from './index.module.less';

/**
 * 编辑器顶部组件
 */
const Header = memo(() => {
  const [avatar, setAvatar] = useState('');
  const { userName = '-' } = usePageStore((state) => state.userInfo);
  const { projectInfo, collapsed, updateCollapsed } = useProjectStore();
  const navigate = useNavigate();

  useEffect(() => {
    getUserAvatar().then((res) => {
      setAvatar(res.avatar);
    });
  }, []);

  // 控制菜单图标关闭和展开
  const toggleCollapsed = () => {
    updateCollapsed();
  };

  const isLight = projectInfo.menuThemeColor === 'light' || projectInfo.layout === 1;
  const style: React.CSSProperties = {
    backgroundColor: isLight ? '#fff' : '#001529',
    color: projectInfo.menuThemeColor === 'light' ? '#000' : '#fff',
  };
  return (
    <div className={styles.header} style={style}>
      {/* 加载面包屑，左右布局时，面包屑在顶部 */}
      {projectInfo.layout === 1 ? (
        <Flex align="center">
          <div onClick={toggleCollapsed} style={{ cursor: 'pointer' }}>
            {collapsed ? (
              <MenuUnfoldOutlined style={{ color: isLight ? '#000' : '#fff' }} />
            ) : (
              <MenuFoldOutlined style={{ color: isLight ? '#000' : '#fff' }} />
            )}
          </div>
          {projectInfo.breadcrumb === 1 && <BreadList />}
        </Flex>
      ) : null}

      {projectInfo.layout === 2 ? (
        <Flex align="center">
          <Logo />
          <Menu />
        </Flex>
      ) : null}

      {/* 用户信息 */}
      <div className={styles.user}>
        {/* 用户头像 */}
        {avatar ? <img width={30} src={avatar} style={{ borderRadius: '50%' }} /> : null}
        <Dropdown
          menu={{
            items: [
              {
                key: '1',
                label: `${userName}`,
              },
              {
                key: '2',
                label: (
                  <div
                    onClick={(e) => {
                      localStorage.clear();
                      navigate(`/login?callback=${window.location.href}`);
                    }}
                  >
                    退出
                  </div>
                ),
              },
            ],
            selectable: true,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <span style={{ marginLeft: '10px', color: isLight ? '' : '#fff' }}>{`${userName}` || '开发者'}</span>
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
});

export default Header;
