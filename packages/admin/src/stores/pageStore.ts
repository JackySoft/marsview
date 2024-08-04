import { create } from 'zustand';
import { produce } from 'immer';
/**
 * 页面信息存储
 */
export interface UserInfoStore {
  userId: number;
  userName: string;
  identifier: string;
}
export interface PageState {
  userInfo: UserInfoStore;
}
export interface PageAction {
  saveUserInfo: (userInfo: UserInfoStore) => void;
}
export const usePageStore = create<PageState & PageAction>((set) => ({
  userInfo: {
    userId: 0,
    userName: '',
    identifier: '',
  },
  saveUserInfo: (userInfo: UserInfoStore) =>
    set(
      produce((state) => {
        state.userInfo = userInfo;
      }),
    ),
}));
