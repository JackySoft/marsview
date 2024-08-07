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
import { defaultReactCode, defaultLessCode, defaultConfigCode, defaultMdCode } from './components/InitValue';
import { QuestionCircleOutlined } from '@ant-design/icons';
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
  const navigate = useNavigate();
  const { id } = useParams();

  // 初始化monaco，默认为jsdelivery分发，由于网络原因改为本地cdn
  loader.config({
    paths: {
      vs: 'https://marsview.cdn.bcebos.com/static/monaco-editor/vs',
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
      await loadScript('https://marsview.cdn.bcebos.com/static/esbuild-wasm%400.20.2/browser.min.js');
      await window.esbuild.initialize({ wasmURL: 'https://marsview.cdn.bcebos.com/static/esbuild-wasm%400.20.2/esbuild.wasm' });
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
          localStorage.setItem('react-code', res.hash ? res.react_code : defaultReactCode);
          localStorage.setItem('less-code', res.hash ? res.less_code : defaultLessCode);
          localStorage.setItem('config-code', res.hash ? res.config_code : defaultConfigCode);
          localStorage.setItem('md-code', res.hash ? res.md_code : defaultMdCode);

          initWasm();
          setDetail(res);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleTabChange = (key: string) => {
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
          react_code: reactCode,
          less_code: cssCode,
          config_code: configCode,
          md_code: mdCode,
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
    if (detail?.release_hash === md5(reactjs + css + configjs) && detail.md_code === mdRef.current?.getCode()) {
      return message.success('系统未检测到当前组件代码有变化');
    }

    Modal.confirm({
      title: '确认',
      content: '确认发布吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await publish({
          lib_id: parseInt(id),
          react_compile: reactjs,
          config_code: configjs,
          css_compile: css,
          release_hash: md5(reactjs + css + configjs),
        });
        message.success('发布成功');
      },
    });
  };

  return (
    <Spin spinning={loading} tip="正在编译中...">
      <Tabs
        items={tabs}
        tabBarStyle={{ paddingLeft: 65, paddingRight: 30 }}
        onChange={handleTabChange}
        tabBarExtraContent={
          <Space size={20}>
            <a href="javascript:;" target="_blank">
              <QuestionCircleOutlined />
              <span style={{ marginLeft: 3 }}>开发文档</span>
            </a>
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
  );
};
