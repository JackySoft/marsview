import { Layout, Menu, MenuProps, Button, Popover, Dropdown, Space, Image } from 'antd';
import { memo, useEffect, useState } from 'react';
import { ProjectOutlined, OneToOneOutlined, CaretDownFilled, DownOutlined, AppstoreOutlined, LoadingOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toBlob, toPng } from 'html-to-image';
import { usePageStore } from '@/stores/pageStore';
import { message } from '@/utils/AntdGlobal';
import { getUserAvatar, updatePageData, uploadImg } from '@/api';
import Publish from './PublishPopover';
import styles from './index.module.less';

/**
 * 编辑器顶部组件
 */
const Header = memo(() => {
  const [avatar, setAvatar] = useState('');
  const [isNav, setNav] = useState(false);
  const [loading, setLoading] = useState(false);
  const [navKey, setNavKey] = useState(['projects']);
  const [pageFrom, setPageFrom] = useState('projects');
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const goHome = () => {
    setMode('edit');
    navigate('/pages');
  };
  const {
    userInfo,
    page: { pageId, pageName, remark, is_public, is_edit, ...pageData },
    mode,
    setMode,
    updatePageState,
  } = usePageStore((state) => {
    return {
      userInfo: state.userInfo,
      page: state.page,
      mode: state.mode,
      setMode: state.setMode,
      updatePageState: state.updatePageState,
    };
  });
  // Tab切换项
  const items: MenuProps['items'] = [
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
    {
      label: '组件库',
      key: 'libs',
      icon: <AppstoreOutlined style={{ fontSize: 16 }} />,
    },
  ];

  useEffect(() => {
    getUserAvatar().then((res) => {
      setAvatar(res.avatar);
    });
  }, []);

  useEffect(() => {
    if (['/projects', '/pages', '/libs'].includes(location.pathname)) {
      setNav(true);
      setNavKey([location.pathname.slice(1)]);
    } else {
      setNav(false);
    }
    setPageFrom(location.pathname.slice(1));
  }, [location]);

  // Tab切换点击
  const handleTab: MenuProps['onClick'] = (e) => {
    navigate(`/${e.key}`);
  };

  // 将当前页面生成图片，并上传到服务器
  const createPreviewImg = async () => {
    try {
      const blob = await toBlob(document.querySelector('#page') as HTMLElement);
      if (!blob) return;
      const file = new File([blob], `${pageId}-${Date.now()}.png`, { type: 'image/png' });
      const res = await uploadImg({
        file: file, // File 对象
      });
      return res.url;
    } catch (error) {
      console.error('封面图上传失败', error);
      return '';
    }
  };
  // 操作
  const handleClick = async (name: string) => {
    if (name === 'save') {
      setLoading(true);
      const preview_img = await createPreviewImg();
      const page_data = JSON.stringify({
        ...pageData,
        // 下面字段排除在page_data外
        stg_state: undefined,
        pre_state: undefined,
        prd_state: undefined,
        preview_img: undefined,
        variableData: {},
        formData: {},
        stg_publish_id: undefined,
        pre_publish_id: undefined,
        prd_publish_id: undefined,
        user_id: undefined, //页面创建者
      });
      try {
        await updatePageData({
          id: pageId,
          name: pageName,
          remark: remark,
          is_public: is_public ?? 1,
          is_edit: is_edit ?? 1,
          page_data,
          preview_img: preview_img || pageData.preview_img,
        });
        updatePageState({ env: 'all' });
        setLoading(false);
        message.success('保存成功', 1);
      } catch (error) {
        setLoading(false);
      }
    } else if (name === 'preview') {
      setMode('preview');
    } else {
      message.info('敬请期待');
    }
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
      navigate(`/editor/${pageId}/${path}`);
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

  const isEditPage = pageFrom === `editor/${id}/edit`;
  const isPublishPage = pageFrom === `editor/${id}/publishHistory`;
  return (
    <>
      <Layout.Header className={isNav ? styles.homeHeader : styles.layoutHeader}>
        <div className={styles.logo} onClick={goHome}>
          <img src="/imgs/mars-logo.png" width={40} />
          <span>Marsview</span>
        </div>
        {/* 首页 - 导航菜单 */}
        {isNav && (
          <div className={styles.menu}>
            <Menu onClick={handleTab} selectedKeys={navKey} mode="horizontal" items={items} />
          </div>
        )}

        {/* 编辑页面-操作按钮 */}
        {isEditPage && mode === 'edit' && (
          <div className={styles.iconAction}>
            {/* 源码 */}
            <a onClick={() => handleClick('edit')}>
              <div className={styles.iconBlock}>
                <img src="/imgs/code.png" alt="源码" />
                <span>源码</span>
              </div>
            </a>
            {/* 保存 */}
            <a onClick={() => handleClick('save')}>
              <div className={styles.iconBlock}>
                {loading ? <LoadingOutlined /> : <img src="/imgs/save.png" alt="保存" />}
                <span>保存</span>
              </div>
            </a>
            {/* 预览 */}
            <a onClick={() => handleClick('preview')}>
              <div className={styles.iconBlock}>
                <img src="/imgs/preview.png" alt="预览" />
                <span>预览</span>
              </div>
            </a>
          </div>
        )}

        {/* 用户信息&发布&发布记录 */}
        <div className={styles.user}>
          {isEditPage && mode === 'edit' && (
            <>
              <Popover placement="bottom" content={<Publish />}>
                <Button type="primary">
                  发布
                  <CaretDownFilled />
                </Button>
              </Popover>
            </>
          )}
          {/* 编辑和发布 */}
          {(isEditPage || isPublishPage) && mode === 'edit' && (
            <Dropdown menu={{ items: pathItems, selectable: true, defaultSelectedKeys: [pageFrom] }}>
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
          <Popover
            content={
              <>
                <Image width={200} src="https://marsview.cdn.bcebos.com/qrcode.jpg" preview={false} />
                <p style={{ textAlign: 'center', color: '#7d33ff' }}>微信交流群</p>
              </>
            }
          >
            <img width={20} src="https://marsview.cdn.bcebos.com/wechat.png" />
          </Popover>

          {/* 用户头像 */}
          <div className={styles.avatar}>
            {avatar ? <img width={30} src={avatar} style={{ borderRadius: '50%' }} /> : null}

            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: `${userInfo?.userName}`,
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
                  <span style={{ marginLeft: 10 }}>{`${userInfo?.userName}` || '开发者'}</span>
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
          {/* github开源地址 */}
          <a href="https://github.com/JackySoft/marsview" aria-label="github" target="_blank">
            <svg
              className={styles.github}
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4250"
              width="20"
              height="20"
            >
              <path
                d="M512 12.64c-282.752 0-512 229.216-512 512 0 226.208 146.72 418.144 350.144 485.824 25.6 4.736 35.008-11.104 35.008-24.64 0-12.192-0.48-52.544-0.704-95.328-142.464 30.976-172.512-60.416-172.512-60.416-23.296-59.168-56.832-74.912-56.832-74.912-46.464-31.776 3.52-31.136 3.52-31.136 51.392 3.616 78.464 52.768 78.464 52.768 45.664 78.272 119.776 55.648 148.992 42.56 4.576-33.088 17.856-55.68 32.512-68.48-113.728-12.928-233.28-56.864-233.28-253.024 0-55.904 20-101.568 52.768-137.44-5.312-12.896-22.848-64.96 4.96-135.488 0 0 43.008-13.76 140.832 52.48 40.832-11.36 84.64-17.024 128.16-17.248 43.488 0.192 87.328 5.888 128.256 17.248 97.728-66.24 140.64-52.48 140.64-52.48 27.872 70.528 10.336 122.592 5.024 135.488 32.832 35.84 52.704 81.536 52.704 137.44 0 196.64-119.776 239.936-233.792 252.64 18.368 15.904 34.72 47.04 34.72 94.816 0 68.512-0.608 123.648-0.608 140.512 0 13.632 9.216 29.6 35.168 24.576 203.328-67.776 349.856-259.616 349.856-485.76 0-282.784-229.248-512-512-512z"
                fill="#2c2c2c"
                p-id="4251"
              ></path>
            </svg>
          </a>
        </div>
      </Layout.Header>
    </>
  );
});

export default Header;
