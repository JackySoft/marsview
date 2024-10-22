import { RightOutlined, UserOutlined } from '@ant-design/icons';
import AddNode from './AddNode';
import style from '../index.module.less';
import { useApprovalContext } from '../context';
/**
 * 开始节点
 */
const StartNode = () => {
  const { onNodeClick } = useApprovalContext();
  return (
    <div className={style['start-node']}>
      <div className={style['node-wrapper']}>
        <div className={style['node-title']}>
          <UserOutlined />
          <span style={{ marginLeft: 5 }}>发起人</span>
        </div>
        <div
          className={style['node-info']}
          onClick={() =>
            onNodeClick({
              id: 'start',
              type: 'start',
              title: '发起人',
            })
          }
        >
          <span>所有人</span>
          <RightOutlined />
        </div>
      </div>
      <span className={style['arrow-line']}></span>
      <AddNode id="start" />
    </div>
  );
};
export default StartNode;
