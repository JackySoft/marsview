# 开发者本地启动

`Marsview` 包含前端和后端，数据库使用的是 `MySQL`，后端使用`Node.js`开发，请提前安装 `Node`、 `NPM`以及`PNPM` 。

## 仓库地址

https://github.com/JackySoft/marsview

> 注：后端暂不开源，只为付费用户提供服务。

## 前端编辑器启动

前端是一个`monorepo`仓库，因此必须使用`pnpm`启动。里面包含三个项目，分别是编辑器(`editor`)、访问端(`admin`)和文档(`docs`)。

1. 安装依赖

```
# 必须切换到根目录
cd marsview
# 安装全局依赖
pnpm i
```

> 1. 没有安装`pnpm`，通过`npm i -g pnpm`安装。
> 2. pnpm i 会全局安装前端项目所有依赖，前提是必须在`marsview`目录下执行。

2. 修改编辑器配置

打开`marsview/packages/editor/vite.config.ts`，修改`proxy`中的`target`为本地后端接口地址

```shell
proxy: {
  '/api': {
    // 如果本地启动后端，请替换为后端地址
    target: 'http://mars-api.marsview.cc',
    changeOrigin: true,
  },
},
```

注意：

- `target`对应`Node`服务地址，默认连接线上服务。
- 生产环境需要在`nginx`中添加反向代理。

3. 启动编辑器

```
pnpm start:editor
```

4. 访问编辑器

http://127.0.0.1:8080

启动后，即可在浏览器访问`Marsview`编辑器项目。

**注意：**
此时本地访问的项目地址是`admin.marsview.cc`，如果想要跳转到本地，需要修改`packages/editor/.env.development`文件中的`VITE_ADMIN_URL`，改为用户端启动后的地址。

线上部署时，同样需要修改`packages/editor/.env.production`文件中的`VITE_ADMIN_URL`。

## 前端用户端启动

用户端主要用来访问搭建好的项目或者页面，但前提是页面必须已经发布到对应的环境中。

1. 修改接口配置

打开 `marsview/packages/admin/vite.config.ts`，修改 `proxy` 中的 `target` 为本地后端接口地址

```
proxy: {
  '/api': {
    // 如果本地启动后端，请替换为后端地址
    target: 'http://mars-api.marsview.cc',
    changeOrigin: true,
  },
},
```

- `target`对应`Node`服务地址，默认连接线上服务。
- 生产环境需要在`nginx`中添加反向代理。

2. 启动用户端

```
pnpm start:admin
```

4. 访问用户端

http://127.0.0.1:8090

**注意：**
此时本地访问的项目地址是`admin.marsview.cc`，如果想要跳转到本地，需要修改`packages/admin/.env.development`文件中的`VITE_ADMIN_URL`，改为用户端启动后的地址。

线上部署时，同样需要修改`packages/admin/.env.production`文件中的`VITE_ADMIN_URL`。

## 总结

1. 以上是本地部署和启动的过程，由于项目依赖百度云`OSS`和`CDN`，所以没有百度云的同学，可能会导致图片云服务和自定义组件功能不可用。

2. 后端服务默认只支持`Node`版本。

3. 本地部署时需要关注`.env.development`文件配置。

4. 线上部署需要关注`.env.production`文件配置，同时线上`nginx`需要添加反向代理。

```shell
# 通过反向代理可以解决跨域问题。
location ^~/api {
  proxy_pass http://106.xx.xx.xx:9001;
}
```
