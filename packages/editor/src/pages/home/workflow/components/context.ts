import { createContext, useContext } from 'react';
import { NodeType, NodeItem } from './types';

/**
 * 审批流上下文对象
 */
export const ApprovalContext = createContext<{
  handleCreateNode: (type: NodeType, id: string) => void;
  handleDelNode: (event: React.MouseEvent, id: string) => void;
  onEditNodeTitle: (event: React.MouseEvent, node: NodeItem) => void;
  onNodeClick: (node: NodeItem) => void;
} | null>(null);

export const useApprovalContext = () => {
  const context = useContext(ApprovalContext);
  if (!context) throw new Error('useApprovalContext must be used inside of ApprovalProvider');
  return context;
};
