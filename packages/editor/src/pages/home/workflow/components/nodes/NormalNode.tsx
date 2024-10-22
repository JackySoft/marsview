import { useMemo } from 'react';
import { Flex } from 'antd';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { ApproverIcon, NotifierIcon, DealerIcon, ConditionIcon } from '../Icons';
import AddNode from './AddNode';
import { useApprovalContext } from '../context';
import { NodeItem } from '../types';
import style from '../index.module.less';
/**
 * 普通节点
 */
const NormalNode = ({ node }: { node: NodeItem }) => {
  const { onNodeClick, handleDelNode } = useApprovalContext();
  const Icon = useMemo(() => {
    if (node.type === 'approver') {
      return ApproverIcon;
    } else if (node.type === 'notifier') {
      return NotifierIcon;
    } else if (node.type === 'dealer') {
      return DealerIcon;
    } else {
      return ConditionIcon;
    }
  }, [node.type]);
  const bgColor = useMemo(() => {
    if (node.type === 'approver') {
      return '#ff943e';
    } else if (node.type === 'notifier') {
      return '#4ca3fb';
    } else if (node.type === 'dealer') {
      return '#fb602d';
    } else if (node.type === 'condition-item') {
      return '#4ec364';
    }
  }, [node.type]);
  return (
    <div className={style['normal-node']}>
      <div className={style['node-wrapper']} onClick={() => onNodeClick(node)}>
        <div className={style['node-title']} style={{ backgroundColor: bgColor }}>
          <Flex align="center">
            {Icon}
            <span style={{ marginLeft: 5 }}>{node.title}</span>
          </Flex>
        </div>
        <div className={style['node-info']}>
          <span>{node.content}</span>
          <RightOutlined />
        </div>
        <CloseOutlined className={style['icon-del']} onClick={(event) => handleDelNode(event, node.id)} />
      </div>
      <span className={style['arrow-line']}></span>
      <AddNode id={node.id} />
    </div>
  );
};
export default NormalNode;
