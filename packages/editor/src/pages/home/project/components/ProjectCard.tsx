import { useNavigate } from 'react-router-dom';
import { Typography, Avatar, Dropdown, Flex } from 'antd';
import { UserOutlined, GlobalOutlined, MoreOutlined, SettingOutlined, DeploymentUnitOutlined, FolderOpenOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Project } from '@/api/types';
import styles from './../page.module.less';
import { useState } from 'react';
const { Paragraph } = Typography;

/**
 * 页面列表
 */

export default function Category({ list }: { list: Project.ProjectItem[] }) {
  const [item, setItem] = useState({ id: 0 });
  const navigate = useNavigate();

  // 单击打开项目配置
  const handleClick = (id: number) => {
    navigate(`/project/${id}/config`);
  };

  // 双击加载项目下子页面
  const handleDoubleClick = (id: number) => {
    navigate(`/project/pages?projectId=${id}`);
  };

  // 卡片下拉项
  const items: MenuProps['items'] = [
    {
      key: 'config',
      icon: <SettingOutlined />,
      label: '设置',
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
  const onClick = ({ key }: { key: string }) => {
    if (key === 'config') return handleClick(item.id);
    return window.open(`${import.meta.env.VITE_ADMIN_URL}/project/${item.id}?env=${key}`, '_blank');
  };

  // 项目列表
  return (
    <div className={styles.projectGrid}>
      {list.map((project) => {
        return (
          <div className={styles.projectCard} key={project.id} onDoubleClick={() => handleDoubleClick(project.id)}>
            {/* 卡片头部 */}
            <div className={styles.cardHeader} onClick={() => handleClick(project.id)}>
              <h3 className={styles.cardTitle}>
                <GlobalOutlined className={styles.cardIcon} />
                {project.name}
              </h3>
            </div>
            {/* 卡片内容 */}
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
            {/* 卡片更多 */}
            <Flex align="center" className={styles.moreInfo}>
              <div>双击查看页面</div>
              <Dropdown menu={{ items, onClick }} arrow placement="bottomRight" trigger={['click']}>
                <MoreOutlined className={styles.moreIcon} onClick={() => setItem(project)} />
              </Dropdown>
            </Flex>
            {/* 项目Logo */}
            <Avatar src={project.logo} className={styles.projectLogo} />
          </div>
        );
      })}
    </div>
  );
}
