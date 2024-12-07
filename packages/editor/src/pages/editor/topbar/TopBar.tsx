import { memo, useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { Select, Switch, Button, Space, Popover, Tooltip } from 'antd';
import { EyeOutlined, LinkOutlined, SaveOutlined, SettingOutlined, LeftOutlined } from '@ant-design/icons';
import { usePageStore } from '@/stores/pageStore';
import CreatePage, { CreatePageRef } from '@/components/CreatePage';
import ShareLink from './ShareLink';
import api from '@/api/page';
import storage from '@/utils/storage';
import styles from './index.module.less';

/**
 * 编辑器顶部工具条
 */
export default memo(({ canvasWidth, updateCanvas }: { canvasWidth: string; updateCanvas: Dispatch<SetStateAction<string>> }) => {
  const [loading, setLoading] = useState(false);
  const [openAutoSave, setOpenAutoSave] = useState(false);

  const createRef = useRef<CreatePageRef>();
  const timer = useRef<any>(null);

  const { mode, userInfo, id, name, remark, projectId, pageData, isEdit, setMode, updatePageState, updateEditState, savePageInfo } = usePageStore(
    (state) => ({
      mode: state.mode,
      userInfo: state.userInfo,
      id: state.page.id,
      name: state.page.name,
      remark: state.page.remark,
      projectId: state.page.projectId,
      pageData: state.page.pageData,
      isEdit: state.isEdit,
      setMode: state.setMode,
      updatePageState: state.updatePageState,
      updateEditState: state.updateEditState,
      savePageInfo: state.savePageInfo,
    }),
  );

  // 修改画布尺寸
  const handleClickCanvas = (val: string) => {
    storage.set('canvasWidth', val);
    updateCanvas(val);
  };

  // 修改页面
  const handleEditPage = () => {
    createRef.current?.open('edit', {
      id,
      name,
      remark,
      projectId,
    });
  };

  // 每隔5s自动保存页面信息
  useEffect(() => {
    if (mode === 'edit' && isEdit && openAutoSave) {
      timer.current = setInterval(() => {
        if (!openAutoSave) return;
        savePageData();
      }, 3000);
    }
    return () => {
      timer.current && clearInterval(timer.current);
    };
  }, [isEdit, openAutoSave]);

  // 保存页面数据
  const savePageData = async () => {
    setLoading(true);
    try {
      await api.updatePageData({
        id,
        pageData: JSON.stringify({ ...pageData, variableData: {}, formData: {} }),
      });
      updateEditState(false);
      updatePageState({ env: 'all' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={`${styles.designerBar} ${mode === 'preview' ? styles.hidden : ''}`}>
        <span style={{ padding: '0 5px' }}>
          <Button type="text" icon={<LeftOutlined />} onClick={() => history.back()}>
            返回
          </Button>
          <span style={{ marginLeft: '5px', fontSize: '14px' }}>{name}</span>
        </span>
        <Space>
          <Select
            variant="borderless"
            options={[
              { label: '1920px', value: '1920px' },
              { label: '1440px', value: '1440px' },
              { label: '1280px', value: '1280px' },
              { label: '1024px', value: '1024px' },
              { label: '960px', value: '960px' },
              { label: '自适应', value: 'auto' },
            ]}
            style={{ width: 100 }}
            value={canvasWidth}
            onChange={handleClickCanvas}
          />
          <Button type="text" icon={<SettingOutlined />} onClick={handleEditPage}>
            设置
          </Button>
          <Button type="text" icon={<SaveOutlined />} onClick={savePageData} loading={loading}>
            保存
          </Button>
          <Button type="text" icon={<EyeOutlined />} onClick={() => setMode('preview')}>
            预览
          </Button>
        </Space>
        <Space>
          <Popover style={{ padding: 0 }} content={<ShareLink />} title={<h3>分享页面</h3>} trigger="click" arrow={false} placement="bottomRight">
            <Button type="text" icon={<LinkOutlined />}>
              分享
            </Button>
          </Popover>
          <Space>
            <Tooltip title={!openAutoSave ? '自动保存已关闭' : '自动保存已开启'} placement="bottom">
              <Switch size="small" checked={openAutoSave} onChange={setOpenAutoSave}></Switch>
            </Tooltip>
          </Space>
        </Space>
      </div>
      {/* 修改页面 */}
      <CreatePage createRef={createRef} />
    </>
  );
});
