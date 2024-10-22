import AddNode from './AddNode';
import { useApprovalContext } from '../context';
import style from '../index.module.less';
/**
 * 条件节点
 */
const ConditionNode = ({ children, id }: { id: string; children: React.ReactNode }) => {
  const { handleCreateNode } = useApprovalContext();
  return (
    <div className={style['condition-node']}>
      <div className={style['condition-branch']}>
        <div className={style['branch-name']} onClick={() => handleCreateNode('condition-item', id)}>
          添加条件
        </div>
        {children}
      </div>
      <span className={style['arrow-line']}></span>
      <AddNode id={id} />
    </div>
  );
};
export default ConditionNode;
