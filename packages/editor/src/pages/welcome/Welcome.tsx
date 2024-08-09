import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { setNebulaCanvas } from '@/utils/canvas';
import style from './index.module.less';
import { message } from '@/utils/AntdGlobal';
export default function Welcome() {
  useEffect(() => {
    setNebulaCanvas();
  }, []);

  const openDoc = () => {
    message.info('敬请期待');
  };

  return (
    <div className={style.welcome}>
      <section className={style.bg}>
        <canvas id="canvasBox" className={style.canvas}></canvas>
        <div className={style.content}>
          <h1 className={style.title}>Marsview 低代码搭建平台</h1>
          <p className={style.desc}>让搭建更简单，让开发更高效</p>
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
        <h1>平台特色</h1>
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
        <img src="/imgs/mars-logo-light.png" />
        <h1>欢迎使用 Marsview 零代码搭建平台</h1>
        <Link to="/projects">
          <Button type="primary" size="large">
            快速开始
          </Button>
        </Link>
        <p className={style.beian}>
          <a href="https://beian.miit.gov.cn/#/Integrated/index">京ICP备14041985号-2</a>
        </p>
      </section>
    </div>
  );
}
