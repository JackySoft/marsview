/**
 * 定义编辑器默认值
 */

// 默认组件代码
export const defaultReactCode = `/**
 * 支持React、Antd、dayjs、Plots 等插件使用，需要从window对象中导入：
 * 例如:
 * const { Button } = window.antd;
 * const { useEffect,useState } = window.React;
 * const { Stock } = window.Plots;
 */
export default ({ id, type, config, onClick }, ref) => {
  const { useEffect, useState } = window.React;
  const { Flex, Button,Spin } = window.antd;
  const { Stock } = window.Plots;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  // 异步加载
  const asyncFetch = () => {
    setLoading(true);
    fetch(
      'https://gw.alipayobjects.com/os/antfincdn/qtQ9nYfYJe/stock-data.json'
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .finally(()=>{
        setLoading(false);
      });
  };

  const chartConfig = {
    xField: 'date',
    yField: ['open', 'close', 'high', 'low'],
    data: data.map((i) => ({ ...i, date: new Date(i.trade_date) })),
  };
  return (
    <div data-id={id} data-type={type}>
      <Flex justify="space-between">
        <span class="stock-title">{config.props.title}</span>
        <Button type={config.props.type} onClick={asyncFetch}>
          刷新
        </Button>
      </Flex>
      <Spin spinning={loading}>
        <Stock {...chartConfig} />
      </Spin>
    </div>
  );
};
`;

// 默认组件样式
export const defaultLessCode = `.stock-title{
  font-size: 18px;
  font-weight: bold;
}`;

// 默认组件配置
export const defaultConfigCode = `/**
* 组件配置和属性值，默认需要导出一个模块
*/

export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础设置',
      key: 'basic',
    },
    {
      type: 'Variable',
      label: '标题',
      name: ['title'],
    },
    {
      type: 'Select',
      label: '按钮类型',
      name: ['type'],
      props: {
        options: [
          { value: 'primary', label: 'primary' },
          { value: 'default', label: 'default' },
          { value: 'ghost', label: 'ghost' },
          { value: 'dashed', label: 'dashed' },
          { value: 'text', label: 'text' },
          { value: 'link', label: 'link' },
        ],
      },
    }
  ],
  config: {
    // 组件默认属性值
    props: {
      title: '股票分析图',
      type: 'primary',
    },
    // 组件样式
    style: {},
    // 事件
    events: [],
  },
  // 组件事件
  events: [],
  methods: [],
};
`;

export const defaultMdCode = `# 自定义组件

## 介绍

这是一个自定义组件功能，支持属性配置，在线编译，在线预览，通过自定义组件可以满足更多个性化需求。

## 功能介绍
1. 在线开发
2. 代码格式化
3. 在线编译
4. 在线预览
5. 支持样式配置、属性配置

> 开发的过程中如果遇到任何问题，可以查阅开发文档或者联系开发人员。


## 使用介绍

**一、index.jsx**
\`index.jsx\` 为自定义组件源码，支持 \`React 18\` \`Antd\` \`dayjs\` 等插件，无需导入，直接使用即可。

**二、index.less**
\`index.less\` 为自定义组件样式，支持 \`Less\` 语法，编写的过程中尽量使用独有class，不要和全局样式冲突，比如：btn

**三、config.js**

\`config.js\` 为自定义组件配置，目前只支持以json的形式配置组件属性，暂不支持源码开发。同时，配置的格式均为固定模式，具体可以参考开发文档。

**四、index.md**

\`index.md\` 为自定义组件文档，支持 \`Markdown\` 语法，此文档方便其他开发者查看，后续会在组件详情中展示。

## 源码展示

下面展示的是 \`index.jsx\` 源码，id、type、config 三个参数是固定写法，具体可以参考开发文档。

\`\`\`js
/**
* 支持React、Antd、dayjs 等插件使用，不用导入，直接用即可。
*/
export default ({ id, type, config, onClick },ref) => {
  const format = () => {
    return dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss');
  };
  const handleClick = () => {
    onClick?.({ id, type });
  };
  return (
    <div className="bgColor" data-id={id} data-type={type}>
      <Button style={config.style} {...config.props} onClick={handleClick}>
        {config.props.text}
      </Button>
      <p>{format()}</p>
    </div>
  );
};
\`\`\`
`;
