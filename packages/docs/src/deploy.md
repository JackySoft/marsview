# 开发者本地启动

`Marsview` 包含前端和后端，数据库使用的是 `MySQL`，部署需要先安装 `Node` 和 `NPM`，安装 `MySQL` 数据库。

## 数据库安装

安装过程省略，请自行百度。

## 后端启动

后端提供 `JAVA` 和 `Koa` 两个版本，`JAVA` 启动请自行百度，`Koa` 版本启动：

1. 请务必安装 `node.js 18.0.0` 以上版本

2. 修改`koa`中`config.js`配置

```
/**
 * MySQL数据库配置
 */
const SERVER_HOST = 'http://localhost';
const SERVER_PORT = 5000;
const DATABASE_HOST = '';// 自己数据库地址，本地可以写localhost
const DATABASE_PORT = 3306;// 自己数据库端口
const DATABASE_USER = '';// 自己数据库用户名
const DATABASE_PASSWORD = '';// 自己数据库密码
const DATABASE_NAME = ''; // 自己数据库名称

/**
 * 飞书应用配置，用来发送飞书消息。可以暂时忽略
 */
const FEISHU_APP_ID = '';
const FEISHU_APP_SECRET = '';

/**
 * JWT签名密钥和过期时间
 */
const JWT_SECRET = '';// jwt密钥随便填写，用来做token鉴权用
const JWT_EXPIRES_IN = '7d';// jwt过期时间

/**
 * 百度云OSS配置，如果没有百度云，也可以暂时忽略，只是无法生成图片和文件上传。
 */
const OSS_ENDPOINT = '';
const OSS_BUCKET1 = '';
const OSS_BUCKET2 = '';
const OSS_ACCESSKEY = '';
const OSS_ACCESSKEYSECRET = '';
const OSS_CDNDOMAIN1 = '';
const OSS_CDNDOMAIN2 = '';

/**
 * 邮箱服务配置，必须填写自己的真实163邮箱和密码，用来注册账号，发送验证码。
 */
const EMAIL_HOST = 'smtp.163.com';
const EMAIL_PORT = 465;
const EMAIL_USER = '';
const EMAIL_PASSWORD = '';

/**
 * 大模型配置，大模型密钥，在自定义组件中，会调用大模型生成代码，如果没有可以忽略。
 */

const ZHIPU_AI_KEY = '';

```

> 上面的配置，对于必填的，都有备注。

3. 安装依赖

```
cd backend/koa

yarn install
```

> 如果安装失败，需要切换一下镜像源：npm config set registry https://registry.npmmirror.com

4. 启动

```
yarn dev

```

> 启动成功后，控制台会打印接口地址：http://localhost:5000

## 前端编辑器启动

1. 安装依赖

```
# 必须切换到根目录
cd marsview
# 安装全局依赖
pnpm i
```

> pnpm i 会全局安装前端项目所有依赖，前提是必须在`marsview`目录下执行

2. 修改编辑器配置

打开`marsview/packages/editor/.env.development`，修改`VITE_BASE_API`为本地后端接口地址

```
VITE_BASE_API=http://localhost:5000/api
```

3. 启动编辑器

```
pnpm start:editor
```

4. 访问编辑器

http://127.0.0.1:8080

## 前端用户端启动

1. 修改接口配置

打开`marsview/packages/admin/.env.development`，修改`VITE_BASE_API`为本地后端接口地址

```
VITE_BASE_API=http://localhost:5000/api
```

2. 启动用户端

```
pnpm start:admin
```

4. 访问用户端

http://127.0.0.1:8090

## 总结

以上是本地部署和启动的过程，服务器部署类似。如果你用的是阿里云服务器，可能关于`cdn`部分需要修改一下上传接口代码，比如：`upload.router.js`，因为我代码基于百度云的存储`SDK`实现的。
