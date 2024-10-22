/**
 * 节点类型
 */
export type NodeType = 'start' | 'end' | 'approver' | 'notifier' | 'dealer' | 'condition' | 'condition-item';

export type NodeItem = {
  id: string;
  type: NodeType;
  title: string;
  content?: string;
  data?: any;
  children?: NodeItem[];
};
