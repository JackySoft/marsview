import { useState } from 'react';
import { Button, Space, Tooltip } from 'antd';
import { CheckOutlined, ClockCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { toBlob } from 'html-to-image';
import { usePageStore } from '@/stores/pageStore';
import { uploadImg } from '@/api';
import api from '@/api/page';
import { message } from '@/utils/AntdGlobal';
import styles from './index.module.less';

export default function Publish() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const {
    userId,
    page: { id, stgState, preState, prdState, stgPublishId, prePublishId, prdPublishId },
    updatePageState,
  } = usePageStore((state) => ({
    userId: state.userInfo.userId,
    page: state.page,
    updatePageState: state.updatePageState,
  }));
  // 将当前页面生成图片，并上传到服务器
  const createPreviewImg = async () => {
    try {
      const blob = await toBlob(document.querySelector('#page') as HTMLElement);
      if (!blob) return;
      const file = new File([blob], `${id}-${Date.now()}.png`, { type: 'image/png' });
      const res = await uploadImg({
        file: file, // File 对象
        id: userId + '_' + id, // 页面ID
      });
      return res.url;
    } catch (error) {
      console.error('封面图上传失败', error);
      return '';
    }
  };
  // 发布到指定环境
  async function publishToEnv(env: 'stg' | 'pre' | 'prd') {
    if (env === 'stg') {
      if (stgState === 3) return message.warning('STG已发布，请勿重复发布');
      setLoading1(true);
    }
    if (env === 'pre') {
      if (preState === 3) return message.warning('PRE已发布，请勿重复发布');
      setLoading2(true);
    }
    if (env === 'prd') {
      if (prdState === 3) return message.warning('PRD已发布，请勿重复发布');
      setLoading3(true);
    }
    try {
      const previewImg = await createPreviewImg();
      await api.publishPage({
        env,
        id,
        previewImg,
      });
      updatePageState({
        env: env === 'stg' ? 'stgState' : env === 'pre' ? 'preState' : 'prdState',
        pageState: 3,
      });
      message.success('发布成功');
    } catch (error) {
      console.log(error);
    }
    if (env === 'stg') setLoading1(false);
    if (env === 'pre') setLoading2(false);
    if (env === 'prd') setLoading3(false);
  }
  return (
    <div className={styles.publishPopover}>
      <Space size={10}>
        <Button type={stgPublishId || stgState >= 3 ? 'link' : 'text'} danger={stgState === 4} onClick={() => publishToEnv('stg')}>
          <Tooltip title="测试环境"> STG</Tooltip>
          {!loading1 ? stgState >= 3 ? <CheckOutlined /> : <ClockCircleOutlined /> : <LoadingOutlined />}
        </Button>
        <Button type={prePublishId || preState >= 3 ? 'link' : 'text'} danger={preState === 4} onClick={() => publishToEnv('pre')}>
          <Tooltip title="预发布环境">PRE</Tooltip>
          {!loading2 ? preState >= 3 ? <CheckOutlined /> : <ClockCircleOutlined /> : <LoadingOutlined />}
        </Button>
        <Button type={prdPublishId || prdState >= 3 ? 'link' : 'text'} danger={prdState === 4} onClick={() => publishToEnv('prd')}>
          <Tooltip title="生产环境">PRD</Tooltip>
          {!loading3 ? prdState >= 3 ? <CheckOutlined /> : <ClockCircleOutlined /> : <LoadingOutlined />}
        </Button>
      </Space>
    </div>
  );
}
