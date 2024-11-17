import { Tag, Tooltip } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { PageItem } from '@/api/types';

// 页面状态标签
const EnvTag = ({ item }: { item: PageItem }) => {
  // 新页面
  if (item.stgState === 1 && item.preState === 1 && item.prdState === 1) {
    return (
      <Tag>
        <Tooltip title="待开发">NEW</Tooltip>
      </Tag>
    );
  }
  let stgTag = {
    color: '',
    icon: <CheckCircleOutlined />,
    tooltip: '已发布',
  };
  let preTag = {
    color: '',
    icon: <CheckCircleOutlined />,
    tooltip: '已发布',
  };
  let prdTag = {
    color: '',
    icon: <CheckCircleOutlined />,
    tooltip: '已发布',
  };
  if (item.stgState === 4) {
    stgTag = {
      color: 'red',
      icon: <ExclamationCircleOutlined />,
      tooltip: '版本已回滚',
    };
  } else if (item.stgState === 3) {
    stgTag = {
      color: 'success',
      icon: <CheckCircleOutlined />,
      tooltip: '版本已发布',
    };
  } else if (item.stgState === 2 && item.stgPublishId) {
    stgTag = {
      color: 'warning',
      icon: <ExclamationCircleOutlined />,
      tooltip: '版本已落后',
    };
  } else {
    stgTag = {
      color: '',
      icon: <ClockCircleOutlined />,
      tooltip: '版本未发布',
    };
  }
  if (item.preState === 4) {
    preTag = {
      color: 'red',
      icon: <ExclamationCircleOutlined />,
      tooltip: '版本已回滚',
    };
  } else if (item.preState === 3) {
    preTag = {
      color: 'success',
      icon: <CheckCircleOutlined />,
      tooltip: '版本已发布',
    };
  } else if (item.preState === 2 && item.prePublishId) {
    preTag = {
      color: 'warning',
      icon: <ExclamationCircleOutlined />,
      tooltip: '版本已落后',
    };
  } else {
    preTag = {
      color: '',
      icon: <ClockCircleOutlined />,
      tooltip: '版本未发布',
    };
  }
  if (item.prdState === 4) {
    prdTag = {
      color: 'red',
      icon: <ExclamationCircleOutlined />,
      tooltip: '版本已回滚',
    };
  } else if (item.prdState === 3) {
    prdTag = {
      color: 'success',
      icon: <CheckCircleOutlined />,
      tooltip: '版本已发布',
    };
  } else if (item.prdState === 2 && item.prdPublishId) {
    prdTag = {
      color: 'warning',
      icon: <ExclamationCircleOutlined />,
      tooltip: '版本已落后',
    };
  } else {
    prdTag = {
      color: '',
      icon: <ClockCircleOutlined />,
      tooltip: '版本未发布',
    };
  }

  return (
    <>
      <Tooltip title={stgTag.tooltip}>
        <Tag color={stgTag.color} icon={stgTag.icon} bordered={false}>
          STG
        </Tag>
      </Tooltip>
      <Tooltip title={preTag.tooltip}>
        <Tag color={preTag.color} icon={preTag.icon} bordered={false}>
          PRE
        </Tag>
      </Tooltip>
      <Tooltip title={prdTag.tooltip}>
        <Tag color={prdTag.color} icon={prdTag.icon} bordered={false}>
          PRD
        </Tag>
      </Tooltip>
    </>
  );
};

export default EnvTag;
