import { Button, Row } from 'antd';
import Editor, { loader } from '@monaco-editor/react';
import { useRef, useEffect, useState } from 'react';
import { updatePageData } from '@/api';
import { usePageStore } from '@/stores/pageStore';
import { message } from '@/utils/AntdGlobal';

/**
 * 代码面板
 */
const CodingPanel = () => {
  const editorRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const { userInfo, page, savePageInfo } = usePageStore((state) => ({
    userInfo: state.userInfo,
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
    const { pageName, remark, is_public, is_edit, ...pageData } = value.page;
    /**
     * 页面ID和用户信息不允许修改
     */
    const params = {
      id: page.pageId,
      name: pageName,
      remark,
      is_public,
      is_edit,
      page_data: JSON.stringify({
        ...pageData,
        pageId: undefined,
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
      }),
    };
    setLoading(true);
    try {
      await updatePageData(params);
      setLoading(false);
      savePageInfo({
        ...JSON.parse(params.page_data),
        pageId: page.pageId,
        pageName,
        remark,
        is_public,
        is_edit,
        preview_img: page.preview_img,
        stg_publish_id: page.stg_publish_id,
        pre_publish_id: page.pre_publish_id,
        prd_publish_id: page.prd_publish_id,
        stg_state: page.stg_state,
        pre_state: page.pre_state,
        prd_state: page.prd_state,
        user_id: page.user_id,
        variableData: page.variableData,
        formData: page.formData,
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
        theme="vs-light"
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
