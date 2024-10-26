# 开发者本地启动

`Marsview` 包含前端和后端，数据库使用的是 `MySQL`，如果后端采用`koa`需要提前安装 `Node` 和 `NPM`以及`PNPM`，如果后端采用`java`需要安装`jdk` `maven` 。

## 数据库安装

1. 安装过程省略，请自行百度。

2. 创建数据库，名称随意，比如 `marsview`

3. 初始化数据库脚本，执行 `backend/sql` 文件夹下的 `DDL_mars.sql` 脚本

## 后端启动

后端提供 `JAVA` 和 `Koa` 两个版本。

### `java` 版本启动：

环境准备：`jdk` `mysql` `maven` `redis`

1. 安装 `jdk`，建议使用 `17` 及以上版本

2. 安装 `maven`，安装方式自行百度

3. 安装 `redis`，安装方式自行百度

4. 安装 `mysql`，安装方式自行百度

5. 修改 `application.yml` 配置文件的 `eamil`、`redis`、`mybatis` 连接信息

```java
spring：
  #邮箱配置
  mail：
    host：smtp地址，例如：smtp.qq.com
    username：demo@qq.com（换成自己的邮箱）
    password：yitmkgakdggbbceg（qq邮箱开启服务生成的密文，注意不是qq密码）
  # redis配置
  data：
    redis：
      host: XXXX
      port: XXXX
      password: XXXX
      database: XXXX

#mybatis配置
mybatis：
  jdbc：
    url：XXXX
    username: XXXX
    password: XXXX

```

6. 运行 com.xintr.LowcodeApplication 启动服务

> 注意，邮箱必须是自己的 163 邮箱，并且开启 POP3 服务，否则无法发送验证码

### koa 版本启动：

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

> 1. 上面的配置，对于必填的，都有备注。
> 2. 邮箱必须是自己的 163 邮箱，并且开启 POP3 服务，否则无法发送验证码

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

> 启动成功后，控制台会打印接口地址：`http://localhost:5000`

## 前端编辑器启动

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

### 域名介绍：

1. `www.marsview.cn` 是给开发者使用的。
2. `admin.marsview.cn` 是给用户访问的。

### 项目介绍

1. `editor`项目是给开发者使用的，提供可视化搭建功能。
2. `admin` 项目是给用户访问的，搭建好以后，通过`admin`域名可以访问搭建的成果。
