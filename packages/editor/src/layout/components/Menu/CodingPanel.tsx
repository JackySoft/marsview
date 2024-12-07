import { Button, Row } from 'antd';
import Editor, { loader } from '@monaco-editor/react';
import { useRef, useEffect, useState } from 'react';
import api from '@/api/page';
import { usePageStore } from '@/stores/pageStore';
import { message } from '@/utils/AntdGlobal';

/**
 * 代码面板
 */
const CodingPanel = () => {
  const editorRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const { userInfo, theme, page, savePageInfo } = usePageStore((state) => ({
    userInfo: state.userInfo,
    theme: state.theme,
    page: state.page,
    savePageInfo: state.savePageInfo,
  }));

  // 初始化monaco，默认为jsdelivery分发，由于网络原因改为本地cdn
  loader.config({
    paths: {
      vs: `${import.meta.env.VITE_CDN_URL}/static/monaco-editor/vs`,
    },
  });

  function handleEditorDidMount(editor: { getValue: () => string }) {
    editorRef.current = editor;
    editorRef.current?.setValue(JSON.stringify({ userInfo, page }, null, 2));
  }

  useEffect(() => {
    editorRef.current?.setValue(JSON.stringify({ userInfo, page }, null, 2));
  }, [page]);

  // 保存页面状态
  const handleSave = async (event: React.MouseEvent) => {
    event.stopPropagation();
    let value;

    try {
      value = JSON.parse(editorRef.current?.getValue()) || {};
    } catch (error) {
      value = {};
      message.error('页面数据格式异常，请检查重试');
      return;
    }
    const { name, remark, pageData } = value.page;
    /**
     * 页面ID和用户信息不允许修改
     */
    const params = {
      id: page.id,
      name,
      remark,
      pageData: JSON.stringify({ ...pageData, variableData: {}, formData: {} }),
    };
    setLoading(true);
    try {
      await api.updatePageData(params);
      setLoading(false);
      savePageInfo({
        ...params,
        pageData: JSON.parse(params.pageData),
      });
      message.success('保存成功');
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Row style={{ marginLeft: '-14px', marginRight: 1 }}>
      <Editor
        height="calc(100vh - 170px)"
        language="json"
        theme={theme === 'dark' ? 'vs-dark' : 'vs-light'}
        options={{
          lineNumbers: 'on',
          minimap: {
            enabled: false,
          },
        }}
        onMount={handleEditorDidMount}
      />
      <Button block type="primary" loading={loading} style={{ margin: 15 }} onClick={(event) => handleSave(event)}>
        保存
      </Button>
    </Row>
  );
};

export default CodingPanel;
