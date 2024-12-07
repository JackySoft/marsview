import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { initStarCanvas } from '@/utils/canvas';
import CountUp from 'react-countup';
import style from './index.module.less';
export default function Welcome() {
  const [isShadow, setShadow] = useState(false);

  useEffect(() => {
    initStarCanvas();
    const el: HTMLElement | null = document.getElementById('welcome');
    if (!el) return;
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
    window.open('http://docs.marsview.com.cn', '_blank');
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
          <img src="/imgs/mars-logo-dark.png" width="40" />
          <span>Marsview</span>
        </div>
        <div className={style.doc}>
          <a href="http://docs.marsview.com.cn" target="_blank">
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
            服务 <CountUp end={2000} duration={3} />+ 项目，
            <CountUp end={3000} duration={3} />+ 页面
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
      <section className={style.module1} style={{ backgroundColor: '#fff' }}>
        <h1>模块介绍</h1>
        <div className={style.moduleList}>
          <div className={style.moduleItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--mars-primary-color)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              data-id="59"
            >
              <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
              <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"></path>
              <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"></path>
            </svg>
            <h3>项目管理</h3>
            <p>高效管理多个项目，轻松协作</p>
          </div>
          <div className={style.moduleItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--mars-primary-color)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M3 9h18"></path>
              <path d="M9 21V9"></path>
            </svg>
            <h3>页面管理</h3>
            <p>强大的编辑器，轻松掌控页面设计</p>
          </div>
          <div className={style.moduleItem}>
            <svg viewBox="64 64 896 896" width="48" height="48" fill="var(--mars-primary-color)">
              <path d="M864 518H506V160c0-4.4-3.6-8-8-8h-26a398.46 398.46 0 00-282.8 117.1 398.19 398.19 0 00-85.7 127.1A397.61 397.61 0 0072 552a398.46 398.46 0 00117.1 282.8c36.7 36.7 79.5 65.6 127.1 85.7A397.61 397.61 0 00472 952a398.46 398.46 0 00282.8-117.1c36.7-36.7 65.6-79.5 85.7-127.1A397.61 397.61 0 00872 552v-26c0-4.4-3.6-8-8-8zM705.7 787.8A331.59 331.59 0 01470.4 884c-88.1-.4-170.9-34.9-233.2-97.2C174.5 724.1 140 640.7 140 552c0-88.7 34.5-172.1 97.2-234.8 54.6-54.6 124.9-87.9 200.8-95.5V586h364.3c-7.7 76.3-41.3 147-96.6 201.8zM952 462.4l-2.6-28.2c-8.5-92.1-49.4-179-115.2-244.6A399.4 399.4 0 00589 74.6L560.7 72c-4.7-.4-8.7 3.2-8.7 7.9V464c0 4.4 3.6 8 8 8l384-1c4.7 0 8.4-4 8-8.6zm-332.2-58.2V147.6a332.24 332.24 0 01166.4 89.8c45.7 45.6 77 103.6 90 166.1l-256.4.7z"></path>
            </svg>
            <h3>精选模板</h3>
            <p>丰富的预设模板，一健拿捏</p>
          </div>
          <div className={style.moduleItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--mars-primary-color)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z"></path>
            </svg>
            <h3>自定义组件</h3>
            <p>灵活创建和使用自定义组件</p>
          </div>
        </div>
      </section>
      <section className={style.module2} style={{ backgroundColor: '#fafafa' }}>
        <h1>项目特色</h1>
        <div className={style.moduleList}>
          <div className={style.moduleItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--mars-primary-color)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              data-id="51"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <h3>权限分配</h3>
            <p>支持细粒度的权限控制，确保数据安全</p>
          </div>
          <div className={style.moduleItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--mars-primary-color)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              data-id="47"
            >
              <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
            </svg>
            <h3>逻辑编排</h3>
            <p>可视化逻辑编排，轻松构建复杂业务流程</p>
          </div>

          <div className={style.moduleItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--mars-primary-color)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              data-id="55"
            >
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <h3>源码生成</h3>
            <p>自动生成高质量源代码，提高开发效率</p>
          </div>
          <div className={style.moduleItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="48"
              height="48"
              fill="none"
              stroke="var(--mars-primary-color)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="8" rx="2" ry="2" data-id="2"></rect>
              <rect x="2" y="14" width="20" height="8" rx="2" ry="2" data-id="3"></rect>
              <line x1="6" y1="6" x2="6" y2="6" data-id="4"></line>
              <line x1="10" y1="6" x2="10" y2="6" data-id="5"></line>
              <line x1="6" y1="18" x2="6" y2="18" data-id="6"></line>
              <line x1="10" y1="18" x2="10" y2="18" data-id="7"></line>
              <path d="M14 6h6" data-id="8"></path>
              <path d="M14 18h6" data-id="9"></path>
            </svg>
            <h3>多环境</h3>
            <p>轻松管理和切换多个开发环境</p>
          </div>
          <div className={style.moduleItem}>
            <svg viewBox="64 64 896 896" width="48" height="48" fill="var(--mars-primary-color)">
              <path d="M917.7 148.8l-42.4-42.4c-1.6-1.6-3.6-2.3-5.7-2.3s-4.1.8-5.7 2.3l-76.1 76.1a199.27 199.27 0 00-112.1-34.3c-51.2 0-102.4 19.5-141.5 58.6L432.3 308.7a8.03 8.03 0 000 11.3L704 591.7c1.6 1.6 3.6 2.3 5.7 2.3 2 0 4.1-.8 5.7-2.3l101.9-101.9c68.9-69 77-175.7 24.3-253.5l76.1-76.1c3.1-3.2 3.1-8.3 0-11.4zM769.1 441.7l-59.4 59.4-186.8-186.8 59.4-59.4c24.9-24.9 58.1-38.7 93.4-38.7 35.3 0 68.4 13.7 93.4 38.7 24.9 24.9 38.7 58.1 38.7 93.4 0 35.3-13.8 68.4-38.7 93.4zm-190.2 105a8.03 8.03 0 00-11.3 0L501 613.3 410.7 523l66.7-66.7c3.1-3.1 3.1-8.2 0-11.3L441 408.6a8.03 8.03 0 00-11.3 0L363 475.3l-43-43a7.85 7.85 0 00-5.7-2.3c-2 0-4.1.8-5.7 2.3L206.8 534.2c-68.9 69-77 175.7-24.3 253.5l-76.1 76.1a8.03 8.03 0 000 11.3l42.4 42.4c1.6 1.6 3.6 2.3 5.7 2.3s4.1-.8 5.7-2.3l76.1-76.1c33.7 22.9 72.9 34.3 112.1 34.3 51.2 0 102.4-19.5 141.5-58.6l101.9-101.9c3.1-3.1 3.1-8.2 0-11.3l-43-43 66.7-66.7c3.1-3.1 3.1-8.2 0-11.3l-36.6-36.2zM441.7 769.1a131.32 131.32 0 01-93.4 38.7c-35.3 0-68.4-13.7-93.4-38.7a131.32 131.32 0 01-38.7-93.4c0-35.3 13.7-68.4 38.7-93.4l59.4-59.4 186.8 186.8-59.4 59.4z"></path>
            </svg>
            <h3>接口配置</h3>
            <p>强大的API管理，加速前后端对接</p>
          </div>
          <div className={style.moduleItem}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--mars-primary-color)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              data-id="63"
            >
              <line x1="6" x2="6" y1="3" y2="15"></line>
              <circle cx="18" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M18 9a9 9 0 0 1-9 9"></path>
            </svg>
            <h3>发布、回滚</h3>
            <p>一键发布和回滚，保障系统稳定性</p>
          </div>
        </div>
      </section>
      <section className={style.footer}>
        <img src="/imgs/mars-logo-dark.png" />
        <h1>欢迎使用 Marsview 低代码搭建平台</h1>
        <Link to="/projects">
          <Button type="primary" size="large">
            快速开始
          </Button>
        </Link>
        <p className={style.beian}>
          <span>Copyright © 2024</span>
          <a href="https://beian.miit.gov.cn/#/Integrated/index">
            {location.hostname === 'www.marsview.com.cn' ? '沪ICP备2024101697号-1' : '京ICP备14041985号-2'}
          </a>
          <a href="https://httpsok.com/p/4Dl1" style={{ color: '#fff' }} target="_blank">
            友情链接：httpsok
          </a>
        </p>
      </section>
    </div>
  );
}
