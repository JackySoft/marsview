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
