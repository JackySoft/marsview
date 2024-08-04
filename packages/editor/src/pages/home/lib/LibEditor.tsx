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
import { generateUUID } from '@/utils/util';
import { defaultReactCode, defaultLessCode, defaultConfigCode, defaultMdCode } from './components/InitValue';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { usePageStore } from '@/stores/pageStore';
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
  const userInfo = usePageStore((state) => state.userInfo);

  // 初始化monaco，默认为jsdelivery分发，由于网络原因改为本地cdn
  loader.config({
    paths: {
      vs: 'https://static.huolala.cn/npm/monaco-editor@0.44.0/min/vs',
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
      await loadScript('https://static.huolala.cn/npm/esbuild-wasm@0.20.2/lib/browser.min.js');
      await window.esbuild.initialize({ wasmURL: 'https://static.huolala.cn/npm/esbuild-wasm@0.20.2/esbuild.wasm' });
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
          localStorage.setItem('react-code', res.hash ? res.react_source : defaultReactCode);
          localStorage.setItem('less-code', res.hash ? res.less_source : defaultLessCode);
          localStorage.setItem('config-code', res.hash ? res.config_source : defaultConfigCode);
          localStorage.setItem('md-code', res.hash ? res.md_source : defaultMdCode);

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
    const reactCode = reactRef.current?.getCode();
    const cssCode = cssRef.current?.getCode();
    const configCode = configRef.current?.getCode();
    const mdCode = mdRef.current?.getCode();
    if (!id) return message.success('组件id不存在');
    if (!reactCode || !configCode) {
      return message.success('组件代码和组件配置不能为空');
    }
    await updateLib({
      react_source: reactCode,
      less_source: cssCode,
      config_source: configCode,
      md_source: mdCode,
      id,
      hash: md5(reactCode + cssCode + configCode),
    });
    message.success('保存成功');
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
    if (detail?.release_hash === md5(reactjs + css + configjs)) {
      return message.success('系统未检测到当前组件代码有变化');
    }
    const react_url = await uploadFile(reactjs, 'index.js');
    if (!react_url) return message.error('react文件上传失败，请重新保存');
    let css_url = '';
    if (css) {
      css_url = await uploadFile(css, 'index.css');
      if (!css_url) return message.error('css文件上传失败，请重新保存');
    }
    const config_url = await uploadFile(configjs, 'config.js');
    if (!config_url) return message.error('配置文件上传失败，请重新保存');
    Modal.confirm({
      title: '确认',
      content: '确认发布吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        await publish({
          lib_id: parseInt(id),
          release_id: generateUUID(),
          react_url,
          css_url,
          config_url,
          release_hash: md5(reactjs + css + configjs),
        });
        message.success('发布成功');
      },
    });
  };

  // 将当前页面生成图片，并上传到服务器
  const uploadFile = async (text: string, fileName: string) => {
    try {
      if (!text) return '';
      const blob = new Blob([text], { type: 'application/javascript' });
      const file = new File([blob], fileName, { type: 'application/javascript' });
      // const res = await uploadImg({
      //   file: file,
      // });
      return '';
    } catch (error) {
      console.error('文件上传失败', error);
      return '';
    }
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
