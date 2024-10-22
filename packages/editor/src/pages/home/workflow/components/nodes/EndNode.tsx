import style from '../index.module.less';
/**
 * 结束节点
 */
const EndNode = () => {
  return (
    <div className={style['end-node']}>
      <div className={style['circle']}></div>
      <div className={style['text']}>结束</div>
    </div>
  );
};
export default EndNode;
