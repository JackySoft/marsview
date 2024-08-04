import { create } from 'zustand';
import _ from 'lodash-es';
import { IMenuItem } from '@/types/index';

export interface ProjectInfo {
  id?: number;
  footer?: number;
  layout?: number;
  logo?: string;
  menu_mode: 'inline' | 'horizontal' | 'vertical';
  menu_theme_color?: string;
  name: string;
  system_theme_color?: string;
  breadcrumb?: number;
  tag?: number;
}

export interface PageState {
  projectInfo: ProjectInfo;
  collapsed: boolean;
  menuTree: any[];
  buttons: any[];
  pageMap: { [key: number]: IMenuItem };
  menuMap: { [key: number]: IMenuItem };
}

export interface ProjectAction {
  setProjectInfo: (payload: any) => void;
  updateCollapsed: () => void;
}

export const useProjectStore = create<PageState & ProjectAction>((set, get) => ({
  projectInfo: {
    name: '',
    menu_mode: 'inline',
  },
  collapsed: false,
  menuTree: [],
  buttons: [],
  pageMap: {},
  menuMap: {},
  setProjectInfo: ({ projectInfo, menuTree, buttons, pageMap, menuMap }: any) => {
    set({
      projectInfo,
      menuTree,
      buttons,
      pageMap,
      menuMap,
    });
  },
  updateCollapsed: () => {
    set((state) => {
      return {
        collapsed: !state.collapsed,
      };
    });
  },
}));
