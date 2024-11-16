import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Space, Spin, Tabs } from 'antd';
import { loader } from '@monaco-editor/react';
import ReactEditor from './components/ReactEditor';
import LessEditor from './components/LessEditor';
import ConfigEditor from './components/ConfigEditor';
import { Modal, message } from '@/utils/AntdGlobal';
import MDEditor from './components/MDEditor';
import md5 from 'md5';
import { loadScript } from '@/utils/util';
import { updateLib, getLibDetail, publish, ILib } from '@/api/lib';
import { generateCode } from '@/api/ai';
import Icon, { BulbOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { defaultReactCode, defaultLessCode, defaultConfigCode, defaultMdCode } from './components/InitValue';
import AIChatModal from '@/components/AIChatModal';
/**
 * 组件代码编辑
 */
export default () => {
  const reactRef = useRef<any>();
  const cssRef = useRef<any>();
  const configRef = useRef<any>();
  const mdRef = useRef<any>();
  const [tabs, setTabs] = useState<Array<{ key: string; label: string; children: React.ReactNode; forceRender?: boolean }>>([]);
  const [detail, setDetail] = useState<ILib>();
  const [loading, setLoading] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState<string>('react');
  const [cacheAICode, setCacheAICode] = useState<{ jsx: string; config: string } | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const aiChatmRef = useRef<any>();

  // 初始化monaco，默认为jsdelivery分发，由于网络原因改为本地cdn
  loader.config({
    paths: {
      vs: `${import.meta.env.VITE_CDN_URL}/static/monaco-editor/vs`,
    },
  });

  const items = [
    {
      key: 'react',
      label: 'index.jsx',
      children: <ReactEditor ref={reactRef} />,
    },
    {
      key: 'less',
      label: 'index.less',
      forceRender: true,
      children: <LessEditor ref={cssRef} />,
    },
    {
      key: 'config',
      label: 'config.js',
      forceRender: true,
      children: <ConfigEditor ref={configRef} />,
    },
    {
      key: 'readme.md',
      label: 'readme.md',
      forceRender: true,
      children: <MDEditor ref={mdRef} />,
    },
  ];

  // 加载esbuild-wasm
  const initWasm = async () => {
    try {
      setLoading(true);
      await loadScript(`${import.meta.env.VITE_CDN_URL}/static/esbuild-wasm%400.20.2/browser.min.js`);
      await window.esbuild.initialize({ wasmURL: `${import.meta.env.VITE_CDN_URL}/static/esbuild-wasm%400.20.2/esbuild.wasm` });
      setLoading(false);
      setTabs(items);
    } catch (error) {
      message.error('加载wasm失败，请刷新重试');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getLibDetail(parseInt(id))
        .then((res) => {
          // 如果hash有值，说明已经提交过
          localStorage.setItem('react-code', res.hash ? res.reactCode : defaultReactCode);
          localStorage.setItem('less-code', res.hash ? res.lessCode : defaultLessCode);
          localStorage.setItem('config-code', res.hash ? res.configCode : defaultConfigCode);
          localStorage.setItem('md-code', res.hash ? res.mdCode : defaultMdCode);

          initWasm();
          setDetail(res);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleTabChange = (key: string) => {
    setActiveTabKey(key);
    switch (key) {
      case 'react':
        reactRef.current?.refresh();
        break;
      case 'less':
        cssRef.current?.refresh();
        break;
      case 'config':
        configRef.current?.refresh();
        break;
    }
  };

  // 返回
  const handleBack = () => {
    navigate('/libs');
  };

  // 保存代码
  const handleSave = async () => {
    Modal.confirm({
      title: '确认',
      content: '请确保编译成功后再保存！',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        const reactCode = reactRef.current?.getCode();
        const cssCode = cssRef.current?.getCode();
        const configCode = configRef.current?.getCode();
        const mdCode = mdRef.current?.getCode();
        if (!id) return message.success('组件id不存在');
        if (!reactCode || !configCode) {
          return message.success('组件代码和组件配置不能为空');
        }
        await updateLib({
          reactCode: reactCode,
          lessCode: cssCode,
          configCode: configCode,
          mdCode: mdCode,
          id,
          hash: md5(reactCode + cssCode + configCode),
        });
        message.success('保存成功');
      },
    });
  };

  // 发布
  const handlePublish = async () => {
    const reactjs = reactRef.current?.getCompileCode();
    const css = cssRef.current?.getCompileCode();
    const configjs = configRef.current?.getCode();
    if (!id) return message.success('组件id不存在');
    if (!reactjs || !configjs) {
      return message.success('组件代码和组件配置不能为空');
    }
    if (detail?.releaseHash === md5(reactjs + css + configjs) && detail.mdCode === mdRef.current?.getCode()) {
      return message.success('系统未检测到当前组件代码有变化');
    }

    Modal.confirm({
      title: '确认',
      content: '确认发布吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await publish({
          libId: parseInt(id),
          reactCompile: reactjs,
          configCode: configjs,
          cssCompile: css,
          releaseHash: md5(reactjs + css + configjs),
        });
        message.success('发布成功');
      },
    });
  };

  const handleGenerate = async (message: string): Promise<boolean> => {
    try {
      await aiChatmRef.current?.changeLoadInfo('MarsAI正在思考中，时间可能较长，请稍候');
      const data = await generateCode({ message });

      if (!data) {
        await aiChatmRef.current?.requestError();
        return false; // 如果 `data` 为空，返回 `false` 表示失败
      }
      await aiChatmRef.current?.changeLoadInfo('正在写入代码中，请稍候');
      handleAskWrite(data, 'load');
      setCacheAICode(data);
      return true; // 返回 `true` 表示成功
    } catch (error) {
      await aiChatmRef.current?.requestError();
      return false; // 如果发生错误，返回 `false` 表示失败
    }
  };

  const handleAskWrite = (code: { jsx: string; config: string }, type: string) => {
    if (reactRef.current && configRef.current) {
      if (reactRef.current.getCode() || configRef.current.getCode()) {
        Modal.confirm({
          title: '确认',
          content: '编辑器中已有代码，确认将覆盖原有代码，不可找回',
          okText: '确认',
          cancelText: '取消',
          onOk: async () => {
            handleWriteCode(code, type);
          },
          onCancel: async () => {
            await aiChatmRef.current?.cancelLoad();
          },
        });
      }
    } else {
      message.error('编辑器未加载完成，请稍后再试');
    }
  };

  const handleWriteCode = async (code: { jsx: string; config: string }, type: string) => {
    if (type === 'reload') {
      await aiChatmRef.current?.reloadStatus();
    }
    handleTabChange('react');
    let configStatus = false;
    let reactStatus = false;
    await reactRef.current?.clearCode();
    reactStatus = await reactRef.current?.writeCode(code.jsx);

    if (reactStatus) {
      handleTabChange('config');
      await configRef.current?.clearCode();
      configStatus = await configRef.current?.writeCode(code.config);
    }
    if (reactStatus && configStatus) {
      await aiChatmRef.current?.writeCompleted();
    } else {
      await aiChatmRef.current?.writeError();
    }
  };

  const handleReLoadWriteCode = () => {
    if (cacheAICode) {
      handleAskWrite(cacheAICode, 'reload');
    } else {
      message.error('未获取到AI智能编码结果');
    }
  };

  const handleAICodeChat = () => {
    aiChatmRef.current?.openModal();
  };

  const handleHideAIModal = () => {
    aiChatmRef.current?.handleHideModal();
  };

  return (
    <>
      <Spin spinning={loading} tip="正在编译中...">
        <Tabs
          items={tabs}
          activeKey={activeTabKey}
          tabBarStyle={{ paddingLeft: 65, paddingRight: 30 }}
          onChange={handleTabChange}
          tabBarExtraContent={
            <Space size={20}>
              {/* <Button type="primary" onClick={handleAICodeChat} icon={<BulbOutlined />}>
                AI助手
              </Button> */}
              <Button type="default" onClick={handleBack}>
                返回
              </Button>
              <Button type="primary" onClick={handleSave}>
                保存
              </Button>
              <Button type="primary" danger onClick={handlePublish}>
                发布
              </Button>
            </Space>
          }
        />
      </Spin>
      <AIChatModal mRef={aiChatmRef} onGenerateLoad={handleGenerate} onReloadWrite={handleReLoadWriteCode} />
    </>
  );
};
