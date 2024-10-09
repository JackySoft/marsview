import { Button, Space, Tooltip } from 'antd';
import { CheckOutlined, ClockCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import { usePageStore } from '@/stores/pageStore';
import { publishPage } from '@/api';
import styles from './index.module.less';
import { message } from '@/utils/AntdGlobal';
import { useState } from 'react';

export default function Publish() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const {
    page: { pageId, stg_state, pre_state, prd_state, stg_publish_id, pre_publish_id, prd_publish_id },
    updatePageState,
  } = usePageStore((state) => ({
    page: state.page,
    updatePageState: state.updatePageState,
  }));
  async function publishToEnv(env: 'stg' | 'pre' | 'prd') {
    if (env === 'stg') {
      if (stg_state === 3) return message.warning('STG已发布，请勿重复发布');
      setLoading1(true);
    }
    if (env === 'pre') {
      if (pre_state === 3) return message.warning('PRE已发布，请勿重复发布');
      setLoading2(true);
    }
    if (env === 'prd') {
      if (prd_state === 3) return message.warning('PRD已发布，请勿重复发布');
      setLoading3(true);
    }
    try {
      await publishPage({
        env,
        page_id: pageId,
      });
      updatePageState({
        env: env === 'stg' ? 'stg_state' : env === 'pre' ? 'pre_state' : 'prd_state',
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
        <Button type={stg_publish_id || stg_state >= 3 ? 'link' : 'text'} danger={stg_state === 4} onClick={() => publishToEnv('stg')}>
          <Tooltip title="测试环境"> STG</Tooltip>
          {!loading1 ? stg_state >= 3 ? <CheckOutlined /> : <ClockCircleOutlined /> : <LoadingOutlined />}
        </Button>
        <Button type={pre_publish_id || pre_state >= 3 ? 'link' : 'text'} danger={pre_state === 4} onClick={() => publishToEnv('pre')}>
          <Tooltip title="预发布环境">PRE</Tooltip>
          {!loading2 ? pre_state >= 3 ? <CheckOutlined /> : <ClockCircleOutlined /> : <LoadingOutlined />}
        </Button>
        <Button type={prd_publish_id || prd_state >= 3 ? 'link' : 'text'} danger={prd_state === 4} onClick={() => publishToEnv('prd')}>
          <Tooltip title="生产环境">PRD</Tooltip>
          {!loading3 ? prd_state >= 3 ? <CheckOutlined /> : <ClockCircleOutlined /> : <LoadingOutlined />}
        </Button>
      </Space>
    </div>
  );
}
