import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import InfiniteViewer from 'react-infinite-viewer';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { message } from '@/utils/AntdGlobal';
import NodeEdit from './NodeEdit';
import ActionModal from '../EventConfig/ActionModal/ActionModal';
import './index.less';
import { findNodeIndexAndParent } from '@/utils/util';
import { cloneDeep } from 'lodash-es';

export type NodeType = {
  id: string;
  type: 'start' | 'end' | 'normal' | 'condition';
  title: string;
  content?: string;
  config?: any;
  children?: NodeType[];
};

function FlowNode(_: any, ref: any) {
  const nodeRef = useRef<{ open: (title: string, callback: (title: string) => void) => void }>();
  const actionRef = useRef<{ open: (action: any, callback: (values: any) => void) => void }>();
  const [list, setList] = useState<Array<NodeType>>([]);

  // 提供获取和设置函数
  useImperativeHandle(ref, () => ({
    setNodeList(nodeList: NodeType[]) {
      if (nodeList.length === 0) {
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
      } else {
        setList(() => [...nodeList]);
      }
    },
    getNodeList: () => list,
  }));
  //   开始节点
  const StartNode = () => {
    return (
      <div className="start-node">
        <div className="circle-btn">开始</div>
        <span className="arrow-line"></span>
        <AddNode id="start" />
      </div>
    );
  };
  //   结束节点
  const EndNode = () => {
    return (
      <div className="end-node">
        <div className="circle-btn gray">结束</div>
      </div>
    );
  };
  //   普通节点
  const NormalNode = ({ node }: { node: NodeType }) => {
    return (
      <div className="normal-node">
        <div className={`node-info ${node.type}`} onClick={() => onEditAction(node)}>
          <div className="title" onClick={(event) => onEditNodeTitle(event, node)}>
            {node.title}
          </div>
          <div className="content">{node.content}</div>
          <DeleteOutlined className="icon-del" onClick={(event) => handleDelNode(event, node.id)} />
        </div>
        <span className="arrow-line"></span>
        <AddNode id={node.id} />
      </div>
    );
  };
  //   条件节点
  const ConditionNode = ({ children, id }: any) => {
    return (
      <div className="condition-node">
        <div className="title">分支</div>
        <div className="node-list">{children}</div>
        <span className="arrow-line"></span>
        <AddNode id={id} />
      </div>
    );
  };

  //   条件节点 - 节点项
  const ConditionItem = ({ type, children }: any) => {
    return (
      <div className="node-item">
        <span className={'left-line ' + type}></span>
        <span className={'right-line ' + type}></span>
        <span className="connect-line"></span>
        <div className="normal-container">{children}</div>
      </div>
    );
  };

  const AddNode = ({ id }: { id: string }) => {
    return (
      <span className="add-node-btn">
        <span className="add-icon">
          <PlusOutlined style={{ fontSize: 16, color: '#fff' }} />
          <div className="popover">
            <a onClick={() => handleCreateNode('normal', id)}>普通节点</a>
            <a onClick={() => handleCreateNode('condition', id)}>分支节点</a>
          </div>
        </span>
      </span>
    );
  };

  // 生成ID
  const generateId = (len = 8) => {
    if (len === 4) return Math.random().toString().slice(2, 6);
    return Math.random().toString().slice(2, 10);
  };

  // 创建节点
  const handleCreateNode = (type: 'normal' | 'condition', id: string) => {
    // 普通节点创建需要弹框输入节点名称
    if (type === 'normal') {
      nodeRef.current?.open('节点' + generateId(4), (title) => {
        createNode(title);
      });
    } else {
      // 条件节点直接创建
      createNode('');
    }

    /**
     * 不能创建节点的情况
     * 1. 开始节点后第一个节点不能添加分支节点
     * 2. 分支节点后第一个节点不能添加分支节点
     * 3. 分支节点前第一个节点不能添加分支节点
     */
    function createNode(title: string) {
      const nodeList = cloneDeep(list);
      const node = findNodeIndexAndParent(nodeList, id);
      if (!node) return;

      const parentNode = node.parentNode;

      // 拿到点击创建的当前节点，查看当前节点的下一个节点是否为是条件节点
      const nestNode = (parentNode ? parentNode.children : nodeList)[node.index + 1];
      if (nestNode && nestNode.type === 'condition' && type === 'condition') {
        message.error('分支节点前一个节点不能添加分支节点');
        return;
      }

      // 创建一个普通节点
      const taskNode = {
        id: generateId(),
        type,
        title,
        content: '行为配置',
        config: {},
        children: [],
      };

      const parentNodeType: 'condition' | 'success' | 'fail' | 'normal' | undefined = parentNode?.type;

      switch (parentNodeType) {
        case undefined:
          if (type === 'normal') {
            nodeList.splice(node.index + 1, 0, taskNode);
          } else {
            if (node.selfNode.type === 'start') {
              message.error('开始节点后第一个节点不能添加分支节点');
              return;
            }
            if (node.selfNode.type === 'condition') {
              message.error('分支节点后第一个节点不能添加分支节点');
              return;
            }
            nodeList.splice(node.index + 1, 0, {
              ...taskNode,
              children: [
                {
                  id: generateId(),
                  type: 'success',
                  children: [],
                  title: '成功',
                  content: '成功时执行此流程',
                },
                {
                  id: generateId(),
                  type: 'fail',
                  title: '失败',
                  content: '失败时执行此流程',
                  children: [],
                },
              ],
            });
          }
          break;
        case 'success':
        case 'fail':
          if (node.selfNode.type === 'condition' && type === 'condition') {
            message.error('分支节点后第一个节点不能添加分支节点');
            return;
          }
          node.parentNode.children.splice(node.index + 1, 0, {
            ...taskNode,
            children: [
              {
                ...taskNode,
                id: generateId(),
                type: 'success',
                title: '成功',
                content: '成功时执行此流程',
                children: [],
              },
              {
                ...taskNode,
                id: generateId(),
                type: 'fail',
                title: '失败',
                content: '失败时执行此流程',
                children: [],
              },
            ],
          });
          break;
        case 'normal':
          node.parentNode.children.splice(node.index + 1, 0, taskNode);
          break;
        case 'condition':
          if (type === 'condition') {
            message.error('分支节点后第一个节点不能添加分支节点');
            return;
          }
          node.parentNode.children[node.index].children.unshift(taskNode);
          break;
      }

      setList(() => [...nodeList]);
    }
  };

  //   删除节点
  const handleDelNode = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    const nodeList = cloneDeep(list);
    const node = findNodeIndexAndParent(nodeList, id);
    if (!node) return;
    if (!node.parentNode) {
      nodeList.splice(node.index, 1);
    } else if (['success', 'fail', 'normal'].includes(node?.parentNode?.type)) {
      node.parentNode.children.splice(node.index, 1);
    } else if (node?.parentNode?.type === 'condition') {
      const parentNode = findNodeIndexAndParent(nodeList, node?.parentNode?.id);
      if (!parentNode) return;
      if (parentNode.parentNode) {
        parentNode.parentNode.children.splice(parentNode.index, 1);
      } else {
        nodeList.splice(parentNode.index, 1);
      }
    }
    setList(() => [...nodeList]);
  };

  // 修改节点标题
  const onEditNodeTitle = (event: React.MouseEvent, node: NodeType) => {
    event.stopPropagation();
    if (node.title === '成功' || node.title === '失败') {
      return;
    }
    nodeRef.current?.open(node.title, (title) => {
      const nodeList = cloneDeep(list) as NodeType[];
      const editNode = findNodeIndexAndParent(nodeList, node.id);
      if (!editNode) return;
      editNode.selfNode.title = title;
      setList(() => [...nodeList]);
    });
  };

  // 修改节点行为
  const onEditAction = (node: NodeType) => {
    if (node.title === '成功' || node.title === '失败') {
      message.info('请在此节点后新增执行节点');
      return;
    }
    actionRef.current?.open(node.config, (values: any) => {
      const nodeList = cloneDeep(list) as NodeType[];
      const editNode = findNodeIndexAndParent(nodeList, node.id);
      if (!editNode) return;
      editNode.selfNode.content = values.actionName;
      editNode.selfNode.config = values;
      setList(() => [...nodeList]);
    });
  };

  function renderNodeList(nodes: any) {
    return nodes.map((node: any) => {
      switch (node.type) {
        case 'start':
          return <StartNode key={node.id} />;
        case 'end':
          return <EndNode key={node.id} />;
        case 'normal':
        case 'success':
        case 'fail':
          return <NormalNode key={node.id} node={node} />;
        case 'condition':
          return (
            <ConditionNode key={node.id} title={node.title} id={node.id}>
              {node.children.map((item: any, index: number) => {
                return (
                  <ConditionItem key={item.id} type={index === 0 ? 'start' : index == node.children.length - 1 ? 'end' : 'center'}>
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
    <>
      <InfiniteViewer
        className="node-viewer dot"
        displayHorizontalScroll={false}
        useMouseDrag={true}
        useWheelScroll={true}
        useAutoZoom={true}
        zoomRange={[0.5, 10]}
        zoom={1.5}
        useResizeObserver={true}
      >
        <div className="node-container">{renderNodeList(list)}</div>
      </InfiniteViewer>
      <NodeEdit ref={nodeRef} />
      <ActionModal ref={actionRef} />
    </>
  );
}

export default forwardRef(FlowNode);