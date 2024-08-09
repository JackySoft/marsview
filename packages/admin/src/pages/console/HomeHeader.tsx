import style from './index.module.less';
import { useLoaderData } from 'react-router-dom';
function HomeHeader() {
  const userInfo: any = useLoaderData();

  return (
    <div className={style.homeHeader}>
      <div className={style.logo}>
        <img width={38} src="/imgs/mars-logo.png" alt="logo" />
        工作台
      </div>
      <div>{userInfo.userName}</div>
    </div>
  );
}
export default HomeHeader;
