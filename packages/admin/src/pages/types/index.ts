import { MutableRefObject } from 'react';
export type IAction = 'create' | 'edit' | 'delete';

export interface IModalProp<T = any> {
  mRef: MutableRefObject<{ open: (type: IAction, data: T) => void } | undefined>;
  update: () => void;
}

declare global {
  interface Window {
    $vanSSO?: any;
  }
}
