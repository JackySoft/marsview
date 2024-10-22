import style from '../index.module.less';
/**
 * 分支节点
 */
const ConditionItem = ({ type, children }: any) => {
  return (
    <div className={style['node-item']}>
      <span className={`${style['left-line']}  ${style[type]}`}></span>
      <span className={`${style['right-line']}  ${style[type]}`}></span>
      <span className={style['connect-line']}></span>
      {children}
    </div>
  );
};
export default ConditionItem;
