# Marsview 平台介绍

Marsview 是一个开源的面向后台管理系统的可视化搭建平台，通过点击或拖拽的方式快速构建 CRUD、数据看板、图表等常规后台功能。

## 特性

- 基于 Antd 组件库开发，当前组件已支持 60+个组件，组件通过拖拽或点击方式添加到画布中。
- 项目支持访问权限（RBAC）和开发者权限配置。
- 项目支持名称、Logo、主题色、菜单、图标等基础配置。
- 页面支持页面权限管理、组件树大纲、JSON 源码、页面列表、接口统一管理、变量配置等。
- 页面支持组件属性配置、样式配置、事件配置、数据源配置等。
- 组件支持无线嵌套、组件排序、组件复制粘贴、删除等。
- 页面支持事件流交互，接口配置等。

## 项目和页面关系

项目是主体，页面是内容载体，项目会包含多个页面。跟我们日常后台管理项目类似，我们日常开发会通过脚手架初始化一个项目，然后配置路由、封装`request`，封装组件、封装工具函数等。

在`Marsview`中，我们不需要脚手架，不需要项目架构，只需要可视化创建项目，添加基础配置即可。当项目创建好以后，就可以点击`STG`、`PRE`、`PRD`去访问该项目。 但此时访问的项目只有一个基础的架子，还没有内容载体，所以，我们需要创建菜单，给菜单关联一个页面才算完成一个完整的项目。

![菜单关联页面](/home/page.png)

## 可以跟 Vue 项目集成吗

可以，Marsview 是一个基于 React 的可视化搭建平台，可以通过微服务集成到 Vue 项目中。

如果是集成到传统项目中，我们就不需要创建项目了，直接创建页面即可，页面搭建好以后，点击保存，同时发布到线上，就可以访问，获取该页面地址通过`microApp`集成到自己的传统项目中即可。

### 微服务集成流程

Marsview 默认基于 micro-app 微服务架构实现，所以传统项目也需要使用`microApp`完成微服务集成。
microApp 文档：https://cangdu.org/micro-app/docs.html#/

**1. 安装依赖**

打开传统的`Vue`或者`React`项目，安装`@micro-zoe/micro-app`依赖。

```bash
# yarn 安装
yarn add @micro-zoe/micro-app
# npm 安装
npm i @micro-zoe/micro-app --save
# pnpm 安装
pnpm add @micro-zoe/micro-app
```

**2. 引入微服务**

以`Vue`项目为例，在`main.js`中引入微服务。

```js
import Vue from 'vue';
import App from './App.vue';
import routes from './router';
import microApp from '@micro-zoe/micro-app';

Vue.config.productionTip = false;

microApp.start();

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
```

关键代码就两行：

- `import microApp from '@micro-zoe/micro-app';`
- `microApp.start();`

**3. 创建 microMars.vue**

```html
<template>
  <micro-app name="mars" :url="url" iframe keep-alive @datachange="handleDataChange" />
</template>

<script>
  export default {
    name: 'MicroMars',
    data() {
      return {
        url: 'https://mars-admin-v.marsview.cc/',
      };
    },
    methods: {
      handleDataChange({ detail: { data } }) {
        if (data.type === 'router') {
          this.$router.push({
            path: data.path,
            params: data.data,
            query: data.data,
          });
        }
      },
    },
  };
</script>
```

其实这些配置完全是`microApp`的配置，大家如果对`microApp`不了解，可以看一下官方文档，这里`handleDataChange`也并不是必须的，如果搭建的页面不需要跳转就不需要配置，假如搭建的页面需要跳转到你的 Vue 菜单中，那需要`handleDataChange`来实现跳转。

**4. 配置路由**

常规开发中，我们会在`router.js`中配置路由，我们此时同样需要分配一个路由用来加载`marsview`。

**修改前**

```js
{
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@components/Dashboard.vue'),
},
```

**修改后**

```js
{
    path: '/page/stg/149',
    name: 'mars',
    component: () => import('@components/microMars.vue'),
},
```

示例：http://admin.marsview.cc/page/stg/149 这是一个数据看板的页面地址，对应的是测试环境，那上面的地址就对应数据看板，当在你的老项目中，点击该菜单时，就会加载该`marsview`页面。

如果你们公司的菜单也是动态创建的，那此处可能需要修改为动态路由，比如：`/page/:env/:id`，然后再你们公司后台配置菜单时，配置对应的页面路由即可，比如：`/page/stg/149`。
