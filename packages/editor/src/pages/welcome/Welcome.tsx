import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { setNebulaCanvas } from '@/utils/canvas';
import CountUp from 'react-countup';
import style from './index.module.less';
export default function Welcome() {
  const [isShadow, setShadow] = useState(false);
  useEffect(() => {
    setNebulaCanvas();
    const el = document.getElementById('welcome') as HTMLDivElement;
    el.onscroll = () => {
      if (el.scrollTop > 0) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    return () => {
      el.onscroll = null;
    };
  }, []);

  const openDoc = () => {
    window.open('http://docs.marsview.cc', '_blank');
  };

  return (
    <div className={style.welcome} id="welcome">
      <section
        className={style.header}
        style={{
          boxShadow: isShadow ? '0 1px 10px 1px #00000059' : '',
        }}
      >
        <div className={style.logo}>
          <img src="https://marsview.cdn.bcebos.com/mars-logo-light.png" width="40" />
          <span>Marsview</span>
        </div>
        <div className={style.doc}>
          <a href="http://docs.marsview.cc" target="_blank">
            使用文档
          </a>
          <span>|</span>
          <a href="https://github.com/JackySoft/marsview" aria-label="github" target="_blank">
            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="17" height="17">
              <path
                d="M512 12.64c-282.752 0-512 229.216-512 512 0 226.208 146.72 418.144 350.144 485.824 25.6 4.736 35.008-11.104 35.008-24.64 0-12.192-0.48-52.544-0.704-95.328-142.464 30.976-172.512-60.416-172.512-60.416-23.296-59.168-56.832-74.912-56.832-74.912-46.464-31.776 3.52-31.136 3.52-31.136 51.392 3.616 78.464 52.768 78.464 52.768 45.664 78.272 119.776 55.648 148.992 42.56 4.576-33.088 17.856-55.68 32.512-68.48-113.728-12.928-233.28-56.864-233.28-253.024 0-55.904 20-101.568 52.768-137.44-5.312-12.896-22.848-64.96 4.96-135.488 0 0 43.008-13.76 140.832 52.48 40.832-11.36 84.64-17.024 128.16-17.248 43.488 0.192 87.328 5.888 128.256 17.248 97.728-66.24 140.64-52.48 140.64-52.48 27.872 70.528 10.336 122.592 5.024 135.488 32.832 35.84 52.704 81.536 52.704 137.44 0 196.64-119.776 239.936-233.792 252.64 18.368 15.904 34.72 47.04 34.72 94.816 0 68.512-0.608 123.648-0.608 140.512 0 13.632 9.216 29.6 35.168 24.576 203.328-67.776 349.856-259.616 349.856-485.76 0-282.784-229.248-512-512-512z"
                fill="currentColor"
                p-id="4251"
              ></path>
            </svg>
            <span>GitHub</span>
          </a>
        </div>
      </section>
      <section className={style.bg}>
        <canvas id="canvasBox" className={style.canvas}></canvas>
        <div className={style.content}>
          <h1 className={style.title}>Marsview 低代码搭建</h1>
          <p className={style.desc}>让搭建更简单，让开发更高效</p>
          <div className={style.count}>
            服务 <CountUp end={1000} duration={3} />+ 项目，
            <CountUp end={2000} duration={3} />+ 页面
          </div>
          <div className={style.btnGroup}>
            <Button type="primary" ghost size="large" onClick={openDoc}>
              产品文档
            </Button>
            <Link to="/projects">
              <Button type="primary" size="large">
                快速开始
              </Button>
            </Link>
          </div>
        </div>
        <div className={style.cube}></div>
      </section>
      <section className={style.module} style={{ backgroundColor: '#fff' }}>
        <h1>模块介绍</h1>
        <div className={style.moduleList}>
          <div className={style.moduleItem}>
            <img src="/imgs/m1.png" />
            <span>项目配置</span>
          </div>
          <div className={style.moduleItem}>
            <img src="/imgs/m2.png" />
            <span>权限管理</span>
          </div>
          <div className={style.moduleItem}>
            <img src="/imgs/m3.png" />
            <span>编辑器</span>
          </div>
          <div className={style.moduleItem}>
            <img src="/imgs/m4.png" />
            <span>用户访问</span>
          </div>
        </div>
      </section>
      <section className={style.module} style={{ backgroundColor: '#fafafa' }}>
        <h1>项目特色</h1>
        <div className={style.moduleList}>
          <div className={style.moduleItem}>
            <img src="/imgs/p1.png" style={{ width: 90 }} />
            <span>逻辑编排</span>
          </div>
          <div className={style.moduleItem}>
            <img src="/imgs/p2.png" style={{ width: 90 }} />
            <span>权限分配</span>
          </div>
          <div className={style.moduleItem}>
            <img src="/imgs/p3.png" style={{ width: 90 }} />
            <span>源码生成</span>
          </div>
          <div className={style.moduleItem}>
            <img src="/imgs/p4.png" style={{ width: 90 }} />
            <span>接口配置</span>
          </div>
          <div className={style.moduleItem}>
            <img src="/imgs/p5.png" style={{ width: 90 }} />
            <span>发布、回滚</span>
          </div>
        </div>
      </section>
      <section className={style.footer}>
        <img src="https://marsview.cdn.bcebos.com/mars-logo-light.png" />
        <h1>欢迎使用 Marsview 零代码搭建工具</h1>
        <Link to="/projects">
          <Button type="primary" size="large">
            快速开始
          </Button>
        </Link>
        <p className={style.beian}>
          <span>Copyright © 2024</span>
          <a href="https://beian.miit.gov.cn/#/Integrated/index">京ICP备14041985号-2</a>
        </p>
      </section>
    </div>
  );
}
