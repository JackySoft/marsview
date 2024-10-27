import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { produce } from 'immer';
import StartNode from './nodes/StartNode';
import EndNode from './nodes/EndNode';
import NormalNode from './nodes/NormalNode';
import ConditionNode from './nodes/ConditionNode';
import ConditionItem from './nodes/ConditionItem';
import { NodeItem, NodeType } from './types';
import { ApprovalContext } from './context';
import style from './index.module.less';

/**
 * 审批流组件封装
 * @param props nodeList 节点列表 onNodeClick 点击节点回调
 * @param ref 对外提供方法 getNodeList
 * @returns
 */
function ApprovalFlow({ nodeList, onNodeClick }: { nodeList: NodeItem[]; onNodeClick: (node: NodeItem) => void }, ref: any) {
  const nodeRef = useRef<{ open: (title: string, callback: (title: string) => void) => void }>();
  const [list, setList] = useState<Array<NodeItem>>([]);

  useEffect(() => {
    if (nodeList.length > 0) {
      setList(nodeList);
    } else {
      setList([
        {
          id: 'start',
          type: 'start',
          title: '开始',
        },
        {
          id: 'end',
          type: 'end',
          title: '结束',
        },
      ]);
    }
  }, [nodeList]);

  // 对外提供接口
  useImperativeHandle(ref, () => ({
    getNodeList: () => {
      return list;
    },
  }));

  // 随机生成节点ID
  const generateId = () => {
    return Math.random().toString().slice(2, 12);
  };

  // 创建节点
  const handleCreateNode = (type: NodeType, id: string) => {
    const text = {
      start: '发起人',
      approver: '审批人',
      notifier: '抄送人',
      dealer: '办理人',
      condition: '条件分支',
      'condition-item': '条件分支',
      end: '结束',
    }[type];

    createNode(text);

    function createNode(title: string) {
      let taskNode: NodeItem | null = null;
      if (type === 'condition') {
        taskNode = {
          id: generateId(),
          type,
          title,
          content: '行为配置',
          data: {},
          children: [
            {
              id: generateId(),
              type: 'condition-item',
              children: [],
              title: '条件分支',
              content: '请设置条件',
            },
            {
              id: generateId(),
              type: 'condition-item',
              title: '条件分支',
              content: '请设置条件',
              children: [],
            },
          ],
        };
      } else {
        taskNode = {
          id: generateId(),
          type,
          title,
          content: '行为配置',
          data: {},
          children: [],
        };
      }
      const newDraftState = produce(list, (draft) => {
        const node = findNodeIndexAndParent(draft, id);
        if (!node.parentNode) {
          if (['approver', 'notifier', 'dealer'].includes(type)) {
            draft.splice(node.index + 1, 0, taskNode);
          } else {
            if (node.selfNode.children?.length > 0 && type === 'condition-item') {
              node.selfNode.children.push(taskNode);
            } else {
              draft.splice(node.index + 1, 0, taskNode);
            }
          }
        } else if (node?.parentNode?.type === 'condition') {
          node.parentNode.children[node.index].children.unshift(taskNode);
        } else if (node?.parentNode?.type === 'condition-item') {
          if (type === 'condition-item') {
            node.selfNode.children.push(taskNode);
          } else {
            node.parentNode.children.push(taskNode);
          }
        }
      });
      setList(newDraftState);
    }
  };

  //   删除节点
  const handleDelNode = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    const newDraftState = produce(list, (draft) => {
      const node = findNodeIndexAndParent(draft, id);
      if (!node.parentNode) {
        draft.splice(node.index, 1);
      } else if (['condition', 'condition-item', 'approver', 'dealer', 'notifier'].includes(node?.parentNode?.type)) {
        if (node.parentNode.type === 'condition-item') {
          node.parentNode.children.splice(node.index, 1);
        } else if (node.parentNode.type === 'condition') {
          if (node.parentNode.children.length > 2) {
            node.parentNode.children.splice(node.index, 1);
          } else {
            const superNode = findNodeIndexAndParent(draft, node.parentNode?.id);
            if (superNode.parentNode) {
              superNode.parentNode.children.splice(superNode.index, 1);
            } else {
              draft.splice(superNode.index, 1);
            }
          }
        } else {
          if (node.parentNode.children.length > 2) {
            node.parentNode.children.splice(node.index, 1);
          } else {
            draft.splice(node.parentNode.index, 1);
          }
        }
      } else if (node?.parentNode?.type === 'condition') {
        const parentNode = findNodeIndexAndParent(draft, node?.parentNode?.id);
        if (parentNode.parentNode) {
          parentNode.parentNode.children.splice(parentNode.index, 1);
        } else {
          draft.splice(parentNode.index, 1);
        }
      }
    });
    setList(newDraftState);
  };

  // 修改节点标题
  const onEditNodeTitle = (event: React.MouseEvent, node: NodeItem) => {
    event.stopPropagation();
    // TODO 打开弹窗修改节点标题，待开发
    nodeRef.current?.open(node.title, (title) => {
      const newDraftState = produce(list, (draft) => {
        const editNode = findNodeIndexAndParent(draft, node.id);
        editNode.selfNode.title = title;
      });
      setList(newDraftState);
    });
  };

  // 根据节点数据，渲染节点
  function renderNodeList(nodes: NodeItem[]) {
    return nodes.map((node: NodeItem) => {
      switch (node.type) {
        case 'start':
          return <StartNode key={node.id} />;
        case 'end':
          return <EndNode key={node.id} />;
        case 'approver':
        case 'notifier':
        case 'dealer':
        case 'condition-item':
          return <NormalNode key={node.id} node={node} />;
        case 'condition':
          return (
            <ConditionNode key={node.id} id={node.id}>
              {node.children?.map((item: any, index: number) => {
                return (
                  <ConditionItem key={item.id} type={index === 0 ? 'start' : index == (node.children || []).length - 1 ? 'end' : 'center'}>
                    {renderNodeList([item])}
                    {renderNodeList(item.children)}
                  </ConditionItem>
                );
              })}
            </ConditionNode>
          );
      }
    });
  }

  return (
    <ApprovalContext.Provider value={{ handleCreateNode, handleDelNode, onEditNodeTitle, onNodeClick }}>
      <div className={style['node-container']}>{renderNodeList(list)}</div>
    </ApprovalContext.Provider>
  );
}

// 查找节点的索引及其父节点
export function findNodeIndexAndParent(children: any, nodeId: string, parentNode = null): any {
  for (let i = 0; i < children.length; i++) {
    if (children[i].id === nodeId) {
      return { index: i, parentNode, selfNode: children[i] };
    }
    if (children[i].children) {
      const result = findNodeIndexAndParent(children[i].children, nodeId, children[i]);
      if (result) {
        return result;
      }
    }
  }
  return null;
}

export default memo(forwardRef(ApprovalFlow));
