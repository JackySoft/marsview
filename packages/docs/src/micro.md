# 微服务集成

`Marsview`是一个基于`React`的可视化搭建平台，可以通过微服务集成到传统`Vue`项目中。

如果是集成到传统项目中，我们就不需要创建项目了，直接创建页面即可，页面搭建好以后，点击保存，同时发布到线上，就可以直接访问，复制该页面地址通过`microApp`集成到自己的传统项目中即可。

microApp 文档：https://cangdu.org/micro-app/docs.html#/

## **1. 安装依赖**

打开传统的`Vue`或者`React`项目，安装`@micro-zoe/micro-app`依赖。

```bash
# yarn 安装
yarn add @micro-zoe/micro-app
# npm 安装
npm i @micro-zoe/micro-app --save
# pnpm 安装
pnpm add @micro-zoe/micro-app
```

## **2. 引入微服务**

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

## **3. 创建 microMars.vue**

```html
<template>
  <micro-app name="mars" :url="url" iframe keep-alive @datachange="handleDataChange" />
</template>

<script>
  export default {
    name: 'MicroMars',
    data() {
      return {
        url: 'https://admin.marsview.com.cn',
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

## **4. 配置路由**

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

示例：https://admin.marsview.com.cn/page/stg/149 这是一个数据看板的页面地址，对应的是测试环境，那上面的地址就对应数据看板，当在你的老项目中，点击该菜单时，就会加载该`marsview`页面。

如果你们公司的菜单也是动态创建的，那此处可能需要修改为动态路由，比如：`/page/:env/:id`，然后再你们公司后台配置菜单时，配置对应的页面路由即可，比如：`/page/stg/149`。
