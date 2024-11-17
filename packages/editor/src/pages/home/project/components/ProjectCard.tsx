import { useNavigate } from 'react-router-dom';
import { Typography, Avatar, Dropdown, Flex } from 'antd';
import { UserOutlined, GlobalOutlined, MoreOutlined, SettingOutlined, DeploymentUnitOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Project } from '@/api/types';
import styles from './../page.module.less';
const { Paragraph } = Typography;

/**
 * 页面列表
 */

export default function Category({ project }: { project: Project.ProjectItem }) {
  const navigate = useNavigate();

  // 单击打开项目配置
  const handleClick = () => {
    navigate(`/project/${project.id}/config`);
  };

  // 双击加载项目下属页面
  const handleDoubleClick = () => {
    navigate(`/project/pages?projectId=${project.id}`);
  };
  // 打开对应环境
  const handleVisitEnv = (e: React.MouseEvent, env: string) => {
    e.preventDefault();
    e.stopPropagation();
    return window.open(`${import.meta.env.VITE_ADMIN_URL}/project/${project.id}?env=${env}`, '_blank');
  };

  // 卡片下拉项
  const items: MenuProps['items'] = [
    {
      key: 'config',
      icon: <SettingOutlined />,
      label: <span onClick={handleClick}>设置</span>,
    },
    {
      type: 'divider',
    },
    {
      key: 'stg',
      icon: <DeploymentUnitOutlined />,
      label: <a onClick={(e) => handleVisitEnv(e, 'stg')}>测试环境</a>,
    },
    {
      key: 'pre',
      icon: <DeploymentUnitOutlined />,
      label: <a onClick={(e) => handleVisitEnv(e, 'pre')}>预览环境</a>,
    },
    {
      key: 'prd',
      icon: <DeploymentUnitOutlined />,
      label: <a onClick={(e) => handleVisitEnv(e, 'prd')}>生产环境</a>,
    },
  ];

  // 项目列表
  return (
    <div className={styles.projectCard} onDoubleClick={handleDoubleClick}>
      <div className={styles.cardHeader} onClick={handleClick}>
        <h3 className={styles.cardTitle}>
          <GlobalOutlined className={styles.cardIcon} />
          {project.name}
        </h3>
      </div>
      <div className={styles.cardContent}>
        <Paragraph className={styles.description}>{project.remark}</Paragraph>
        <div className={styles.metaInfo}>
          <UserOutlined className={styles.metaIcon} />
          <p>{project.userName}</p>
        </div>
        <div className={styles.metaInfo}>
          <FolderOpenOutlined className={styles.metaIcon} />
          <p>
            <span>{project.count} </span>个页面
          </p>
        </div>
      </div>
      <Flex align="center" className={styles.moreInfo}>
        <div>双击查看页面</div>
        <Dropdown menu={{ items }} arrow placement="bottomRight" trigger={['click']}>
          <MoreOutlined className={styles.moreIcon} />
        </Dropdown>
      </Flex>

      <Avatar src={project.logo} className={styles.projectLogo} />
    </div>
  );
}
