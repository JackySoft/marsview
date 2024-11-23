import { Project } from '@/api/types';
import { MutableRefObject } from 'react';
export type IAction = 'create' | 'edit' | 'delete';

export interface IModalProp<T = any> {
  mRef: MutableRefObject<{ open: (type: IAction, data: T) => void } | undefined>;
  update: () => void;
}

export interface IModalPropData<T = any> {
  mRef: MutableRefObject<{ open: (data: T) => void } | undefined>;
  update: () => void;
}

export interface ProjectCardItemProps {
  item: Project.ProjectItem;
  type: number;
  getList: () => void;
}

/**
 * 反馈
 */
export interface FeedbackItem {
  id: number;
  userId?: number;
  title: string;
  content: string;
  isSolve?: number;
  isTop?: number;
  like?: number;
  userAvatar?: string;
  createdAt: string;
  nickName: string;
  type: number;
  images?: string;
  issuelUrl?: string;
}

export interface FeedbackCommentItem {
  id: number;
  userAvatar?: string;
  nickName: string;
  content: string;
  createdAt: string;
  feedbackId: number;
  isTop?: number;
}

export interface UserInfo {
  id: number;
  nickName: string;
  userName: string;
  createdAt: string;
  avatar: string;
}
