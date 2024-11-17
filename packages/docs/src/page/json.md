# json 源码

画布中的组件都是以 json 的形式渲染出来的，每个组件都对应一个 json 对象，json 对象中包含组件的属性、事件、样式和接口配置等信息，如果你非常熟悉 json，你甚至可以直接修改 json 来实现画布中组件的渲染。

![访问端工作台](/page/click_json.png)

## 组件 json 结构

以下为一个页面的基本结构，`userInfo`为当前登录用户信息对象，`page`为当前页面信息对象。

```json
{
  "userInfo": {
    "userId": 0,
    "userName": ""
  },
  "page": {
    "pageId": 341,
    "pageName": "dsfc",
    "remark": "432432",
    "stgState": 1,
    "preState": 1,
    "prdState": 1,
    "userId": 49,
    "config": {
      "props": {
        "theme": "#1677ff"
      },
      "style": {
        "color": "#000",
        "backgroundColor": "#fff",
        "padding": "20px"
      },
      "scopeCss": "",
      "scopeStyle": {
        "color": "#000",
        "backgroundColor": "#fff",
        "padding": "20px"
      },
      "events": [],
      "api": {
        "sourceType": "json",
        "id": "",
        "source": {},
        "sourceField": ""
      }
    },
    "events": [
      {
        "value": "onLoad",
        "name": "初始化事件"
      }
    ],
    "apis": {},
    "elements": [],
    "elementsMap": {},
    "variables": [],
    "variableData": {},
    "formData": {},
    "interceptor": {
      "headers": [
        {
          "key": "",
          "value": ""
        }
      ],
      "timeout": 8,
      "timeoutErrorMessage": "请求超时，请稍后再试"
    },
    "preview_img": null,
    "stgPublishId": 0,
    "prePublishId": 0,
    "prdPublishId": 0
  }
}
```

## 基本结构

props 属性为页面或组件的属性，style 为页面或组件的样式，scopeCss 为页面或组件的自定义样式，scopeStyle 为组件的最终组合样式，events 为页面或组件的事件，api 为页面或组件的接口配置。

```json
{
  "config": {
    "props": {
      "theme": "#1677ff"
    },
    "style": {
      "color": "#000",
      "backgroundColor": "#fff",
      "padding": "20px"
    },
    "scopeCss": "",
    "scopeStyle": {
      "color": "#000",
      "backgroundColor": "#fff",
      "padding": "20px"
    },
    "events": [],
    "api": {
      "sourceType": "json",
      "id": "",
      "source": {},
      "sourceField": ""
    }
  }
}
```
