import styles from './index.module.less';
/**
 * 表格容器
 */

export default ({ title, action, children }: { title: string | React.ReactNode; action: React.ReactNode; children: React.ReactNode }) => {
  return (
    <div className={styles['base-table']}>
      <div className={styles['header-wrapper']}>
        <div className={styles['title']}>{title}</div>
        <div className={styles['action']}>{action}</div>
      </div>
      <div className={styles['table-wrapper']}>{children}</div>
    </div>
  );
};
