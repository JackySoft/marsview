import { Divider } from 'antd';
import styles from './index.module.less';
const OpenModalAction = () => {
  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>刷新当前页面。</p>
        <Divider />
      </div>
    </>
  );
};
export default OpenModalAction;
