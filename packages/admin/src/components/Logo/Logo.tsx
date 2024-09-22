import { useProjectStore } from '@/stores/projectStore';
import styles from './index.module.less';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
function Logo() {
  const { collapsed, projectInfo } = useProjectStore();
  const navigate = useNavigate();
  const { projectId, env } = useParams();
  const [style, setStyle] = useState({});
  const [nameStyle, setNameStyle] = useState({});
  useEffect(() => {
    // 左右布局模式下，Logo背景需要跟着主题色变化
    if (projectInfo.menu_theme_color === 'dark') {
      setStyle({ backgroundColor: '#001529', color: '#fff', height: 60, padding: '10px 20px' });
    } else {
      setStyle({ backgroundColor: '#fff', color: '#000', height: 60, padding: '10px 20px' });
    }
    /**
     * 1. 名称是中文，7个字，正常显示。
     * 2. 9个字以内，调整字号，以适配显示9个字。
     * 3. 9个字以上，超出显示省略号。
     */
    if (/^[\u4e00-\u9fa5]+$/.test(projectInfo.name)) {
      setNameStyle({
        fontSize: projectInfo.name.length > 9 ? 14 : 16,
      });
    }
  }, [projectInfo.layout, projectInfo.menu_theme_color]);
  return (
    <div
      className={styles.logo}
      onClick={() => {
        navigate(`/project/${env}/${projectId}/welcome`);
      }}
      style={style}
    >
      <img src={projectInfo.logo || 'https://marsview.cdn.bcebos.com/mars-logo.png'} />
      {!collapsed && (
        <span className={styles.logoName} style={nameStyle}>
          {projectInfo.name}
        </span>
      )}
    </div>
  );
}
export default Logo;
