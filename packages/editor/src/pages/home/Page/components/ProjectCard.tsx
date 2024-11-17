import { UserOutlined, FileTextOutlined, GlobalOutlined } from '@ant-design/icons';
import { Typography, Avatar } from 'antd';
import styles2 from './../page.module.less';
const { Paragraph } = Typography;

/**
 * 页面列表
 */

export default function Category({ project }: any) {
  const toggleProject = (projectId: number) => {};
  // 项目列表
  return (
    <div className={styles2.projectCard} onDoubleClick={() => toggleProject(project.id)}>
      <div className={styles2.cardHeader}>
        <h3 className={styles2.cardTitle}>
          <GlobalOutlined className={styles2.cardIcon} />
          {project.name}
        </h3>
      </div>
      <div className={styles2.cardContent}>
        <Paragraph className={styles2.description}>{project.remark}</Paragraph>
        <div className={styles2.metaInfo}>
          <UserOutlined className={styles2.metaIcon} />
          <p>{project.userName}</p>
        </div>
        <div className={styles2.metaInfo}>
          <FileTextOutlined className={styles2.metaIcon} />
          <p>{project.count} 个页面</p>
        </div>
      </div>
      <div className={styles2.doubleClickHint}>双击查看页面</div>
      <Avatar src={project.logo} className={styles2.projectLogo} />
    </div>
  );
}
