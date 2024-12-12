import { memo, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Layout, Menu, MenuProps, Button, Popover, Dropdown, Space, Flex, Switch } from 'antd';
import { ProjectOutlined, CaretDownFilled, DownOutlined, SunOutlined, MoonFilled, OneToOneOutlined } from '@ant-design/icons';
import { usePageStore } from '@/stores/pageStore';
import Publish from './PublishPopover';
import styles from './index.module.less';
import storage from '@/utils/storage';

/**
 * 编辑器顶部组件
 */
const Header = memo(() => {
  const [isNav, setNav] = useState(false);
  const [navKey, setNavKey] = useState(['projects']);
  const [pageFrom, setPageFrom] = useState('projects');
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const { userInfo, page, mode, theme, setMode, setTheme } = usePageStore((state) => {
    return {
      userInfo: state.userInfo,
      page: state.page,
      mode: state.mode,
      theme: state.theme,
      setMode: state.setMode,
      setTheme: state.setTheme,
    };
  });

  // 返回首页
  const goHome = () => {
    setMode('edit');
    // 点击Logo返回最近操作的列表，对用户友好
    const isProject = /projects\/\d+\/\w+/.test(location.pathname);
    const isPage = /editor\/\d+\/(edit|publishHistory)/.test(location.pathname);
    if (isProject) return navigate('/projects');
    if (isPage) return navigate('/pages');
    navigate('/projects');
  };

  // Tab切换项
  const items: MenuProps['items'] = useMemo(
    () => [
      {
        label: '项目列表',
        key: 'projects',
        icon: <ProjectOutlined style={{ fontSize: 16 }} />,
      },
      {
        label: '页面列表',
        key: 'pages',
        icon: <OneToOneOutlined style={{ fontSize: 16 }} />,
      },
    ],
    [],
  );

  useEffect(() => {
    if (['/projects', '/pages'].includes(location.pathname)) {
      setNav(true);
      setNavKey([location.pathname.slice(1)]);
    } else {
      setNav(false);
    }
    setPageFrom(location.pathname.slice(1));
  }, [location]);

  // 设置主题
  useEffect(() => {
    const isDark = storage.get('marsview-theme');
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
    setTheme(isDark ? 'dark' : 'light');
  }, [userInfo]);

  // Tab切换点击
  const handleTab: MenuProps['onClick'] = (e) => {
    navigate(`/${e.key}`);
  };

  // 退出预览模式
  const handleExitPreview = () => {
    setMode('edit');
  };
  function goToPath(path: string) {
    if (path === 'edit') {
      // 跳转编辑页面时，编辑器已经被销毁，导致page对象为空，此时从浏览器中获取页面ID参数
      navigate(`/editor/${id}/${path}`);
    } else {
      navigate(`/editor/${page.id}/${path}`);
    }
  }

  const pathItems: MenuProps['items'] = [
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            goToPath('edit');
          }}
        >
          编辑器
        </a>
      ),
      key: 'edit',
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            goToPath('publishHistory');
          }}
        >
          发布记录
        </a>
      ),
      key: 'publishHistory',
    },
  ];

  const isEditPage = pageFrom === `editor/${id}/edit` || pageFrom === `editor/${id}/template`;
  const isPublishPage = pageFrom === `editor/${id}/publishHistory`;

  return (
    <>
      <Layout.Header className={styles.layoutHeader}>
        <div className={styles.logo} onClick={goHome}>
          <img src={`${theme === 'dark' ? '/imgs/mars-logo-dark.png' : '/imgs/mars-logo.png'}`} width={42} />
          <span>Marsview</span>
        </div>
        {/* 首页 - 导航菜单 */}
        {isNav && (
          <div className={styles.menu}>
            <Menu onClick={handleTab} selectedKeys={navKey} theme={theme} mode="horizontal" items={items} />
          </div>
        )}

        {/* 用户信息&发布&发布记录 */}
        <div className={styles.user}>
          <Space>
            {isEditPage ? null : (
              <>
                <Popover
                  placement="bottom"
                  content={
                    <>
                      <img width={150} src={`https://imgcloud.cdn.bcebos.com/f35323e9a2625a85909cb6f02.png`} />
                      <p style={{ textAlign: 'center' }}>请备注：marsview</p>
                    </>
                  }
                >
                  <Button type="text" style={{ color: 'var(--mars-theme-text-color)' }}>
                    联系我
                  </Button>
                </Popover>
                <Button
                  type="text"
                  style={{ color: 'var(--mars-theme-text-color)' }}
                  onClick={() => window.open('http://docs.marsview.com.cn', '_blank')}
                >
                  帮助文档
                </Button>
              </>
            )}
            <Switch
              checkedChildren={<MoonFilled />}
              unCheckedChildren={<SunOutlined />}
              defaultChecked
              checked={theme == 'dark' ? true : false}
              onChange={(val) => {
                storage.set('marsview-theme', val);
                setTheme(val ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', val ? 'dark' : 'light');
              }}
            />
            {isEditPage && mode === 'edit' && (
              <>
                <Popover placement="bottom" content={<Publish />} trigger="click">
                  <Button type="primary">
                    发布
                    <CaretDownFilled />
                  </Button>
                </Popover>
              </>
            )}
          </Space>
          {/* 编辑和发布 */}
          {(isEditPage || isPublishPage) && mode === 'edit' && (
            <Dropdown menu={{ items: pathItems, selectable: true, defaultSelectedKeys: [...pageFrom.split('/').slice(-1)] }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {isEditPage ? '编辑' : '发布记录'}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          )}
          {/* 预览模式 */}
          {mode === 'preview' && (
            <Button type="primary" onClick={handleExitPreview}>
              退出预览
            </Button>
          )}

          {/* 用户头像 */}
          <div className={styles.avatar}>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    label: '退出',
                  },
                ],
                onClick: (e) => {
                  localStorage.clear();
                  navigate(`/login?callback=${window.location.href}`);
                },
                selectable: true,
              }}
            >
              <Flex align="center" style={{ height: 64 }}>
                <a onClick={(e) => e.preventDefault()} style={{ marginInline: 5 }}>
                  {`${userInfo.nickName}` || '开发者'}
                </a>
                {userInfo.avatar && <img width={25} style={{ verticalAlign: 'sub', borderRadius: '100%' }} src={userInfo.avatar} />}
              </Flex>
            </Dropdown>

            {/* github开源地址 */}
            {
              <a href="https://github.com/JackySoft/marsview" className={styles.githubCorner} aria-label="View source on GitHub" target="_blank">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 250 250"
                  style={{ fill: '#7d33ff', color: '#fff', position: 'absolute', top: 0, border: 0, right: 0 }}
                  aria-hidden="true"
                >
                  <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
                  <path
                    d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                    fill="currentColor"
                    style={{ transformOrigin: '130px 106px' }}
                    className={styles.octoArm}
                  />
                  <path
                    d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                    fill="currentColor"
                    className={styles.octoBody}
                  />
                </svg>
              </a>
            }
          </div>
        </div>
      </Layout.Header>
    </>
  );
});

export default Header;
