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
  title: string;
  content: string;
  isSolve: boolean;
  isTop: boolean;
  like: number;
  userAvatar: string;
  time: string;
  userName: string;
  type: string;
}
export interface ItemCardProps {
  info: FeedbackItem;
  click: () => void;
}
