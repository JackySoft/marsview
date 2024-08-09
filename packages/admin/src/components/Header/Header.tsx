import React, { memo, useEffect, useState } from 'react';
import { Flex } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { usePageStore } from '@/stores/pageStore';
import { useProjectStore } from '@/stores/projectStore';
import Logo from '../Logo/Logo';
import BreadList from '../BreadList/BreadList';
import { getUserAvatar } from '@/api';
import styles from './index.module.less';

/**
 * 编辑器顶部组件
 */
const Header = memo(() => {
  const [avatar, setAvatar] = useState('');
  const { userName } = usePageStore((state) => state.userInfo);
  const { projectInfo, collapsed, updateCollapsed } = useProjectStore();

  useEffect(() => {
    getUserAvatar().then((res) => {
      setAvatar(res.avatar);
    });
  }, []);

  // 控制菜单图标关闭和展开
  const toggleCollapsed = () => {
    updateCollapsed();
  };

  const isLight = projectInfo.menu_theme_color === 'light' || projectInfo.layout === 1;
  const style: React.CSSProperties = {
    backgroundColor: isLight ? '#fff' : '#001529',
    color: projectInfo.menu_theme_color === 'light' ? '#000' : '#fff',
  };
  return (
    <div className={styles.header} style={style}>
      {/* 加载面包屑，左右布局时，面包屑在顶部 */}
      {projectInfo.layout === 1 && (
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
      )}

      {projectInfo.layout === 2 ? <Logo /> : <span></span>}
      {/* 用户信息 */}
      <div className={styles.user}>
        {/* 用户头像 */}
        {avatar ? <img width={30} src={avatar} style={{ borderRadius: '50%' }} /> : null}
        <span style={{ marginLeft: '10px', color: isLight ? '#000' : '#fff' }}>{`${userName}` || '开发者'}</span>
      </div>
    </div>
  );
});

export default Header;
