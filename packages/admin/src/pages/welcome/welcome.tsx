import { useLocation } from 'react-router-dom';
import { Button } from 'antd';
import style from './index.module.less';
function Welcome() {
  const location = useLocation();
  return (
    <div className={style.welcome}>
      <img src="/imgs/welcome.svg" alt="" />
      <div className={style.title}>欢迎使用 Marsview 访问端系统</div>
      {location.pathname === '/' && (
        <div className={style.content}>
          <p>
            当前需要正确的项目地址才可以访问，如果没有创建项目，请先去Marsview低代码平台{' '}
            <a href={`http://www.marsview.cc/projects`} target="_blank">
              创建
            </a>
          </p>
          <Button type="primary" onClick={() => window.open(`http://www.marsview.cc/projects`, '_blank')}>
            去创建
          </Button>
        </div>
      )}
    </div>
  );
}
export default Welcome;
