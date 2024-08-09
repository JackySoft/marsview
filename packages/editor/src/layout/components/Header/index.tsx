import { Layout, Menu, MenuProps, Button, Popover, Dropdown, Space, Image } from 'antd';
import { memo, useEffect, useRef, useState } from 'react';
import { ProjectOutlined, OneToOneOutlined, PlusOutlined, CaretDownFilled, DownOutlined, AppstoreOutlined, LoadingOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toBlob, toPng } from 'html-to-image';
import { usePageStore } from '@/stores/pageStore';
import { message } from '@/utils/AntdGlobal';
import { getUserAvatar, updatePageData, uploadImg } from '@/api';
import CreatePage from './CreatePage';
import CreateLib from './CreateLib';
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
  const [showQrCode, setShowQrCode] = useState(false);
  const creatPageRef = useRef<{ open: () => void }>();
  const createLibRef = useRef<{ open: () => void }>();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const goHome = () => {
    setMode('edit');
    navigate('/pages');
  };
  const {
    userInfo,
    page: { pageId, pageName, remark, is_public, ...pageData },
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
  // 新建页面
  const handleCreate = (type: 'project' | 'page' | 'lib') => {
    if (type === 'project') {
      navigate(`/project/0/config`);
    } else if (type === 'page') {
      creatPageRef.current?.open();
    } else {
      createLibRef.current?.open();
    }
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
          page_data,
          preview_img: preview_img || pageData.preview_img,
        });
      } catch (error) {
        console.error(error);
      }
      updatePageState({ env: 'all' });
      setLoading(false);
      message.success('保存成功', 1);
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

        {/* 新建项目 */}
        {pageFrom === 'projects' && (
          <a onClick={() => handleCreate('project')}>
            <PlusOutlined style={{ marginRight: 5 }} />
            新建项目
          </a>
        )}

        {/* 新建页面 */}
        {pageFrom === 'pages' && (
          <a onClick={() => handleCreate('page')}>
            <PlusOutlined style={{ marginRight: 5 }} />
            新建页面
          </a>
        )}

        {/* 新建组件 */}
        {pageFrom === 'libs' && (
          <a onClick={() => handleCreate('lib')}>
            <PlusOutlined style={{ marginRight: 5 }} />
            新建组件
          </a>
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
          <img
            width={20}
            src="https://marsview.cdn.bcebos.com/wechat.png"
            onClick={() => {
              setShowQrCode(true);
            }}
          />
          {/* 用户头像 */}
          <div className={styles.avatar}>
            {avatar ? <img width={30} src={avatar} style={{ borderRadius: '50%' }} /> : null}
            <span style={{ marginLeft: 10 }}>{`${userInfo?.userName}` || '开发者'}</span>
          </div>
        </div>

        {/* 新建页面 */}
        {pageFrom === 'pages' && <CreatePage createRef={creatPageRef} />}
        {/* 新建组件 */}
        {pageFrom === 'libs' && <CreateLib createRef={createLibRef} />}
      </Layout.Header>
      {/* 微信群 */}
      <Image
        width={0}
        height={0}
        style={{ display: 'none' }}
        preview={{
          visible: showQrCode,
          src: 'https://marsview.cdn.bcebos.com/qrcode.png',
          onVisibleChange: (value) => {
            setShowQrCode(value);
          },
        }}
      />
    </>
  );
});

export default Header;
