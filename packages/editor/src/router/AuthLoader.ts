import { getUserInfo } from '@/api';
import storage from '@/utils/storage';
/**
 * 加载用户信息，生成token
 */
export default async function AuthLoader() {
  try {
    if (!storage.get('token')) {
      window.location.replace(`/login?callback=${window.location.href}`);
      return '';
    }
    const res: any = await getUserInfo();
    const userInfo = {
      userId: res.userId,
      userName: res.userName,
    };
    return userInfo;
  } catch (error) {
    return '';
  }
}
