import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Marsview',
  description: '一款面向中后台低代码平台，支持逻辑编排、事件交互和接口配置。',
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/mars-logo.png' }]],
  lang: 'zh-CN',
  srcDir: 'src',
  outDir: '../../dist/docs',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/mars-logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '项目', link: '/project' },
      { text: '页面', link: '/page' },
      { text: '组件', link: '/lib' },
      { text: '团队', link: '/team' },
    ],

    sidebar: [
      {
        text: '登录',
        items: [{ text: '账号登录', link: '/login' }],
      },
      {
        text: '项目',
        items: [
          { text: '项目介绍', link: '/project' },
          { text: '菜单介绍', link: '/project/menu' },
          { text: '角色介绍', link: '/project/role' },
          { text: '用户介绍', link: '/project/user' },
          { text: '项目访问', link: '/project/visit' },
        ],
      },
      {
        text: '页面',
        items: [
          { text: '页面介绍', link: '/page' },
          { text: '左侧菜单', link: '/page/sideNav' },
          { text: '组件拖拽', link: '/page/drag' },
          { text: '组件大纲', link: '/page/outline' },
          { text: 'JSON源码', link: '/page/json' },
          { text: '接口管理', link: '/page/api' },
          { text: '变量管理', link: '/page/variable' },
          { text: '页面成员', link: '/page/member' },
        ],
      },
      {
        text: '组件',
        items: [{ text: '组件介绍', link: '/lib' }],
      },
      {
        text: '团队介绍',
        link: '/team',
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/JackySoft/marsview' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present 河畔一角',
    },
    search: {
      provider: 'local',
    },
  },
});
