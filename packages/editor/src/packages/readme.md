## 组件说明文档

### 为什么每个组件都要使用forwardRef进行包裹？

因为组件内部需要使用ref，如果直接使用forwardRef包裹的话，那么在父组件中，ref的值会是一个对象，而不是一个dom。之所以使用ref是因为组件需要在画布中，完成拖拽等操作，useDrag和useDrop依赖于ref。

### 组件schema目前的完整结构是什么？

```js
export default {
    // 组件配置项
    attrs: [] 
    // 组件事件配置项
    events: [],
    // 组件接口配置项
    api: {},
    // 组件值
    config: {
        // 组件的属性默认值 TODO
        props: {},
        // 组件的样式默认值
        style: {},
        // 组件的事件默认值
        events: [],
        // 组件的接口默认值
        api: {},
    }
}
```

### 组件如何渲染的？

组件拖拽到画布（[id].tsx）后，会生成json数据，调用MarsRender渲染引擎进行渲染。

### 组件的事件、接口如何调用的？

组件的公共能力，比如渲染、拖拽、事件发布、接口调用等，都封装在MarsRender中。

### 组件的所有类型从哪儿看？

组件的属性、事件、接口等完整类型在types/index.ts中定义。