# 自定义登录表单组件开发

![预览](/custom/loginForm/preview.png)

这里以登录表单为例演示完整的组件开发流程，你将在此学会表单创建、组件属性编辑、登录事件流、接口请求、页面变量创建和变量赋值。

## 视频演示

<video width="680" controls>  
  <source src="https://marsview.cdn.bcebos.com/vedio/createLoginLib.mp4" type="video/mp4">  
  您的浏览器不支持 Video 标签。  
</video>

## 创建组件

在组件列表页面创建一个组件，起名: loginForm，表单描述: 登录表单组件，然后点击【确定】创建组件。

## 开发组件

创建组件成功后，点击【开发】进入到组件开发页面。

### 主要文件介绍

进入到组件开发页面后，与组件开发相关的主要有三个文件：`index.jsx`，`index.less` 和 `config.js`。

它们的作用如下：

- `index.jsx` 用于书写组件的结构
- `index.less` 用于自定义组件样式（更加推荐使用 `config.js` 中的 `config.style` 进行样式定义）
- `config.js` 用于自定义组件的属性以及属性值编辑操作，在此向组件使用用户暴露调整组件的接口

config.js 主要属性值有：

- `attrs` 数组：它定义哪些属性值可被进行调整以及如何调整
- `config` 对象：其中的 props 定义属性以及初始化属性值，style 定义自定义样式（其与 index.less 发挥相同的作用）
- `events` 数组：用于定义组件内所有的事件，是事件流的方法入口

（我们可以先将初始化的代码全部删除，每个文件保留最基本的格式）

#### 一、 `index.jsx`

```jsx
export default ({ id, type, config }, ref) => {
  return <div data-id={id} data-type={type}></div>;
};
```

#### 二、 `config.js`

```js
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础设置',
      key: 'basic',
    },
  ],
  config: {
    // 组件默认属性值
    props: {},
    // 组件样式
    style: {},
    // 事件
    events: [],
  },
  // 组件事件
  events: [],
  methods: [],
};
```

#### 三、 组件结构编写

在 `index.jsx` 文件中书写组件结构。

支持 `React`、`Antd`、`dayjs` 等插件，但需要从 `windows` 对象进行导入。

组件的入口必须包含两个参数，其中第一个参数是一个对象，它必须包含 `id`、`type` 和 `config` 三个属性；第二个参数是 `ref`。

下面，开始开发登录表单组件。

1. 从 `windows` 对象中引入 antd 及所需的组件

```jsx
const { Form, Button, Input } = window.antd;
```

2. 编写结构，主要包含用户名输入框、密码输入框以及提交按钮。

在这里，如果需要组件是可被调整的，如调整占位宽度、调整输入框最大宽度以及调整提交按钮文字等，可以通过 `config` 对象中的 `props` 对象中的对应属性进行赋值。（具体的 `props` 详见下文的 `config` 配置）

```jsx
<Form
  name="login"
  labelCol={{ span: config.props.labelCol }}
  wrapperCol={{ span: config.props.wrapperCol }}
  style={{ maxWidth: config.props.maxWidth }}
  onFinish={onFinish}
>
  <Form.Item label="用户名" name="username">
    <Input />
  </Form.Item>
  <Form.Item label="密码" name="password">
    <Input.Password />
  </Form.Item>
  <Form.Item
    wrapperCol={{
      offset: config.props.offset,
      span: config.props.wrapperCol,
    }}
  >
    <Button htmlType="submit" block={config.props.block} type="primary">
      {config.props.loginBtn}
    </Button>
  </Form.Item>
</Form>
```

3. 定义组件事件

表单提供 `onFinish` 方法，将在用户点击按钮时进行触发，所以需要定义 `onFinish` 方法，其接收表单属性值对象 `values` 作为参数。

针对于事件流，如果需要用户点击按钮后执行某些操作，则需要向事件流暴露出组件事件入口。

暴露组件事件入口要注意两点：

- 在组件定义入口增加事件声明

```jsx
export default ({ id, type, config, onClick }, ref) => {};
```

onClick 是事件名称，需要与 `config.js` 中 `events` 数组中定义名称一致（详见下文的 `config` 配置），它是事件流的事件入口。

- 组件中使用 onClick

```jsx
const onFinish = (values) => {
  onClick?.(values);
};
```

`onFinish` 是用户点击按钮触发的事件，当用户触发此事件后，将执行 `onClick` 方法，`onClick`方法被触发将一一执行用户在事件流中定义的所有操作。（详见下文事件流配置）

完整 index.jsx 代码

```jsx
export default ({ id, type, config, onClick }, ref) => {
  const { Form, Button, Input } = window.antd;
  const onFinish = (values) => {
    onClick?.(values);
  };
  return (
    <div data-id={id} data-type={type}>
      <Form
        name="login"
        labelCol={{ span: config.props.labelCol }}
        wrapperCol={{ span: config.props.wrapperCol }}
        style={{ maxWidth: config.props.maxWidth }}
        onFinish={onFinish}
      >
        <Form.Item label="用户名" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="密码" name="password">
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: config.props.offset,
            span: config.props.wrapperCol,
          }}
        >
          <Button htmlType="submit" block={config.props.block} type="primary">
            {config.props.loginBtn}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
```

#### 四、 `config` 配置

`config` 是定义属性值以及属性值的修改方式。

1. `props` 对象配置

`jsx` 文件通过 c`onfig.props` 使用的属性值都需要在此进行定义并初始化。

> 注意：`props` 是在 `config.js` 文件中的 `config` 对象下，请勿弄混，在 `jsx` 中引入的 `config` 也表示 `config` 对象而不是 `config.js` 文件

```js
config: {
  // 组件默认属性值
  props: {
    loginBtn: '登陆',
    block: true,
    labelCol: 8,
    wrapperCol: 16,
    offset: 8,
    maxWidth: 700
  },
}
```

2. `attrs` 数组配置

`attrs` 数组将定义 `props` 对象中哪些属性可以被修改，以及如何进行修改，用户在使用组件的时候将以预期的方式调整组件。

在 `attrs` 数组中的每个对象的定义如下:

```js
{
 // 组件类型
  type: FormType;
  // 组件Key
  key: string;
  // 组件FormItem样式
  style?: React.CSSProperties;
  // 组件FormItem文本
  label?: string;
  // 组件form对象
  name?: (string | number)[];
  // tooltips
  tooltip?: string;
  // Switch节点值
  valuePropName?: string;
  // 表单验证规则
  rules?: any;
  // 表单属性，非FormItem属性
  props?: any;
  // 子节点
  children?: SchemaType[];
  // 渲染函数
  render?: (props?: any) => React.ReactNode;
},
```

一般而言，只需要关注 `type、key、name、label` 四个属性即可，具体描述请参考组件开发文档或者示例。

在这里，我们需要调整 `loginBtn`、`block`、`labelCol`、`wrapperCol`、`offset` 和 `maxWidth`，代码如下：

```js
attrs: [
  {
    type: 'Title',
    label: '基础设置',
    key: 'basic'
  },
  {
    type: 'Input',
    label: '登陆名称',
    name: ['loginBtn']
  },
  {
    type: 'Switch',
    label: '块状按钮',
    name: ['block']
  },
  {
    type: 'InputNumber',
    label: 'LabelCol',
    name: ['labelCol']
  },
  {
    type: 'InputNumber',
    label: 'WrapperCol',
    name: ['wrapperCol']
  },
  {
    type: 'InputNumber',
    label: 'Offset',
    name: ['offset']
  },
  {
    type: 'InputNumber',
    label: 'MaxWidth',
    name: ['maxWidth']
  }
],
```

3. `events` 数组配置

`events` 数组定义组件向事件流暴露的事件入口，在登录表单组件中，只引入了 `onClick` 方法，所以在此只需要定义 `onClick` 方法。

```js
events: [
  {
    value: 'onClick',
    name: '登陆事件'
  }
],
```

> 如果此处未定义事件，在使用组件时将无法设置事件流。

![config配置](/custom/loginForm/config_set.png)

上述所有配置完成后，即可验证编译，编译成功后点击【保存】-【发布】，发布成功后即可在页面中进行使用。

## 在页面中使用自定义组件

新建一个页面或者打开已有页面，在组件物料中选择自定义组件，找到登录表单组件，将其拖入画布。

在画布中选定登录表单组件后，即可对登录表单进行配置。

右侧属性配置可对组件进行调整。

## 事件流配置

在这里，将演示如何通过事件流实现登录请求、展示返回数据以及消息通知。

### 如何实现携带数据发送登录请求

1. 点击【事件】-【添加事件】-【登陆事件】-【设置事件流】

新建事件流节点，起名：登录请求，然后配置节点。

2. 在事件流行为配置面板中选择【发送请求】

此时还没有配置任何接口，点击配置请求右边的设置图标，配置一个新请求接口

需要设置接口名称、请求方式、接口地址以及参数设置。

这些在真实开发中以接口文档为准。这里设置如下：

![登录请求](/custom/loginForm/url_set.png)

由于表单中设置的属性是 username 和 password，与此接口需要传送的数据 userName 和 userPwd 并不一直，所以要配置映射关系。
如果一致的情况，则可以忽略参数配置。

完成后，一个登录请求接口即完成配置了。

### 展示返回数据

如果想要展示接口返回的数据，比如展示用户名，需要进行以下步骤：

1. 明确接口返回的数据和数据类型

根据接口文档明确接口返回的数据和类型，这里返回的数据如下：

```js
{
  userName: '',
  userId: '',
  token: ''
}
```

页面中如果需要获取到返回值，首先需要配置相关的变量，然后再页面中使用这一变量。

2. 配置页面变量

![页面变量配置](/custom/loginForm/variable_set.png)

将事件流暂时保存后，回到页面编辑画布，在右侧菜单栏选择【页面变量】-【新建】变量，起名：user。

user 是一个对象，在对象中以 json 的形式书写各项属性。

![新增页面](/custom/loginForm/add_variable.png)

3. 事件流配置页面赋值，实现动态赋值

回到事件流配置，在登录请求节点之后新增事件流节点。

配置事件行为，选择【变量赋值】，在变量赋值面板中选择刚刚新增的页面变量，选择【动态赋值】。

![动态赋值](/custom/loginForm/variable.png)

4. 页面中展示数据

完成事件流配置后，当登录请求成功后，会将返回值赋值给变量 user，即可在页面中的其他组件使用 user 中的值。

在页面中拖入文本组件，这里简单演示展示登录用户名。

选定文本组件，在右侧属性配置中，选择逻辑编辑器，修改初始值并使用页面变量。

![使用页面变量](/custom/loginForm/use_variable.png)

### 消息通知

在变量赋值节点后面新增节点，并配置消息通知。

完整的事件流：

![完整事件流](/custom/loginForm/eventStream.png)
event stream

## 预览和发布页面

所有配置完成后，即可点击页面上方的预览，测试页面各项组件是否工作正常，全部测试完成后可选择发布页面。

![预览测试](/custom/loginForm/test.png)

以上，就是以登录表单组件完整实现自定义开发的过程。
