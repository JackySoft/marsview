import { useNavigate } from 'react-router-dom';
import { Typography, Avatar, Dropdown } from 'antd';
import { UserOutlined, GlobalOutlined, MoreOutlined, SettingOutlined, DeploymentUnitOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Project } from '@/api/types';
import styles from './../page.module.less';
const { Paragraph } = Typography;

/**
 * 页面列表
 */

export default function Category({ list }: { list: Project.ProjectItem[] }) {
  const navigate = useNavigate();
  // 单击打开项目配置
  const handleOpenProject = (id: number) => {
    navigate(`/project/${id}/config`);
  };

  // 双击加载项目下子页面
  const handleOpenPages = (id: number) => {
    navigate(`/project/pages?projectId=${id}`);
  };

  // 卡片下拉项
  const items: MenuProps['items'] = [
    {
      key: 'config',
      icon: <SettingOutlined />,
      label: '项目配置',
    },
    {
      type: 'divider',
    },
    {
      key: 'stg',
      icon: <DeploymentUnitOutlined />,
      label: '测试环境',
    },
    {
      key: 'pre',
      icon: <DeploymentUnitOutlined />,
      label: '预览环境',
    },
    {
      key: 'prd',
      icon: <DeploymentUnitOutlined />,
      label: '生产环境',
    },
  ];

  // 环境跳转
  const onClick = (key: string, id: number) => {
    if (key === 'config') return handleOpenProject(id);
    return window.open(`${import.meta.env.VITE_ADMIN_URL}/project/${id}?env=${key}`, '_blank');
  };

  // 项目列表
  return (
    <>
      <div className={styles.projectGrid}>
        {list.map((project) => {
          return (
            <div className={styles.projectCard} key={project.id}>
              {/* 卡片头部 */}
              <div className={styles.cardHeader} onClick={() => handleOpenProject(project.id)}>
                <h3 className={styles.cardTitle}>
                  <GlobalOutlined className={styles.cardIcon} />
                  {project.name}
                </h3>
              </div>
              {/* 卡片内容 */}
              <div className={styles.cardContent} onClick={() => handleOpenPages(project.id)}>
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
              {/* 卡片更多 */}
              <div className={styles.moreInfo}>
                <Dropdown menu={{ items, onClick: ({ key }) => onClick(key, project.id) }} arrow placement="bottomRight" trigger={['click']}>
                  <MoreOutlined className={styles.moreIcon} />
                </Dropdown>
              </div>
              {/* 项目Logo */}
              <Avatar src={project.logo} className={styles.projectLogo} />
            </div>
          );
        })}
      </div>
    </>
  );
}
