import Mock from 'mockjs';
Mock.mock('/api/user/login', 'post', {
  code: 0,
  data: {
    userId: 100000,
    userName: 'Marsview',
    token: '88888888',
  },
  message: '操作成功',
});
Mock.mock('/api/user/info', 'get', {
  code: 0,
  data: {
    userId: 100000,
    userName: 'Marsview',
    nickName: 'Marsview管理员',
    avatar: 'https://marsview.cdn.bcebos.com/mars-logo.png',
    createdAt: '2025-01-14 12:00:00',
  },
  message: '操作成功',
});
Mock.mock('/api/projects/create', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock(/\/api\/projects\/list(\?.*)?/, 'get', {
  code: 0,
  data: {
    total: 1,
    list: [
      {
        id: 100001,
        name: 'Marsview',
        remark: '后台管理系统',
        userId: 100000,
        userName: 'Marsview',
        logo: 'https://marsview.cdn.bcebos.com/mars-logo.png',
        updatedAt: Date.now(),
        count: 1,
      },
    ],
  },
  message: '操作成功',
});
Mock.mock(/\/api\/projects\/detail\/\d+/, 'get', {
  code: 0,
  data: {
    id: 100000,
    name: 'Marsview',
    remark: '后台管理系统',
    logo: 'https://marsview.cdn.bcebos.com/mars-logo.png',
    userId: 100000,
    layout: 1,
    menuMode: 'vertical',
    menuThemeColor: 'dark',
    breadcrumb: 1,
    tag: 1,
    footer: 0,
    isPublic: 2,
    userName: 'admin',
  },
  message: '操作成功',
});
Mock.mock('/api/pages/role/list', 'post', {
  code: 0,
  data: {
    list: [
      {
        id: 1,
        pageId: 100000,
        role: 1,
        userId: 100000,
        userName: 'demo@qq.com',
      },
    ],
  },
  message: '操作成功',
});
// 项目更新
Mock.mock('/api/projects/update', 'get', {
  code: 0,
  data: '',
  message: '操作成功',
});
// 菜单列表
Mock.mock('/api/project/menu/list', 'post', {
  code: 0,
  data: {
    list: [
      {
        id: 1,
        projectId: 100000,
        name: '用户管理',
        type: 1,
        icon: 'UngroupOutlined',
        status: 1,
        userId: 100000,
        userName: 'Marsview',
        updatedAt: new Date().toLocaleString(),
        createdAt: new Date().toLocaleString(),
      },
      {
        id: 2,
        projectId: 100000,
        name: '数据看板',
        type: 1,
        icon: 'DashboardOutlined',
        path: '/dashboard',
        pageId: 100000,
        sortNum: 1,
        status: 1,
        userId: 100000,
        userName: 'Marsview',
        updatedAt: new Date().toLocaleString(),
        createdAt: new Date().toLocaleString(),
      },
    ],
  },
});
Mock.mock('/api/project/menu/copy', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock('/api/project/menu/delete', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock('/api/project/menu/create', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock('/api/project/menu/update', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock('/project/user/create', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock('/project/user/delete', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock('/project/user/update', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock('/api/project/role/create', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock('/api/project/role/delete', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock('/api/project/role/list', 'get', {
  code: 0,
  data: {
    list: [
      {
        id: 100000,
        projectId: 100000,
        name: '产品',
        halfChecked: '545,226',
        checked: '542,543,8820',
        remark: '',
        updatedAt: '2025-01-02 20:38:47',
        createdAt: '2025-01-02 20:32:46',
        userId: 100000,
        userName: 'Marsview',
      },
    ],
    total: 1,
    pageSize: 10,
    pageNum: 1,
  },
  message: '操作成功',
});

Mock.mock(/\/api\/project\/role\/list(\?.*)?/, 'get', {
  code: 0,
  data: {
    list: [],
  },
});
Mock.mock(/\/api\/project\/role\/listAll(\?.*)?/, 'get', {
  code: 0,
  data: {
    list: [],
  },
});
Mock.mock(/\/api\/project\/user\/list(\?.*)?/, 'get', {
  code: 0,
  data: {
    list: [],
  },
  message: '操作成功',
});
Mock.mock(/\/api\/pages\/list(\?.*)?/, 'get', {
  code: 0,
  data: {
    list: [
      {
        id: 100000,
        name: 'CRUD',
        userId: 100000,
        remark: '调用线上接口',
        isPublic: 1,
        projectId: 100000,
        updatedAt: '2025-01-14 17:29:15',
        userName: 'Marsview',
      },
    ],
  },
});
Mock.mock('/api/pages/create', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock('/api/pages/delete', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock('/api/pages/update', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock('/api/pages/copy', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
Mock.mock(/\/api\/pages\/detail\/\d+/, 'get', {
  code: 0,
  data: {
    id: 144,
    name: 'CRUD案例',
    userId: 100000,
    userName: 'Marsview',
    remark: '验证增删改查',
    isPublic: 2,
    pageData:
      '{"config":{"props":{"theme":"#1677ff"},"style":{"height":"100%","color":"#000","backgroundColor":"#f0f2f5","padding":"20px"},"scopeCss":"/* 请在此处添加样式*/\\n.marsview{\\n    \\n}","scopeStyle":{"height":"100%","color":"#000","backgroundColor":"#f0f2f5","padding":"20px"},"events":[{"nickName":"初始化事件","eventName":"onLoad","actions":[{"id":"start","type":"start","title":"开始"},{"id":"end","type":"end","title":"结束"}]}],"api":{"sourceType":"json","id":"","source":{},"sourceField":""}},"events":[{"value":"onLoad","name":"初始化事件"}],"apis":{},"elements":[{"id":"SearchForm_60spo02i5g","type":"SearchForm","name":"搜索表单","elements":[{"id":"Input_fb19o54fjh","parentId":"SearchForm_60spo02i5g","type":"Input","name":"文本框","elements":[]},{"id":"Input_5jntc6ed9n","parentId":"SearchForm_60spo02i5g","type":"Input","name":"文本框","elements":[]},{"id":"Select_6qj74nfqku","parentId":"SearchForm_60spo02i5g","type":"Select","name":"下拉框","elements":[]}]},{"id":"MarsTable_3gx13gh2ht","type":"MarsTable","name":"普通表格","elements":[]},{"id":"Modal_er4mn6jbtk","type":"Modal","name":"弹框","elements":[{"id":"Form_alk8l8x02c","parentId":"Modal_er4mn6jbtk","type":"Form","name":"Form容器","elements":[{"id":"Input_1zt7tznrjf","parentId":"Form_alk8l8x02c","type":"Input","name":"文本框","elements":[]},{"id":"Input_b5n1wg2jvh","parentId":"Form_alk8l8x02c","type":"Input","name":"文本框","elements":[]},{"id":"Input_2a9wt4s7qi","parentId":"Form_alk8l8x02c","type":"Input","name":"文本框","elements":[]},{"id":"TreeSelect_lx8mkqr47t","parentId":"Form_alk8l8x02c","type":"TreeSelect","name":"树形选择","elements":[]},{"id":"Input_b8weoo8y9i","parentId":"Form_alk8l8x02c","type":"Input","name":"文本框","elements":[]},{"id":"Select_fr4urxhlyd","parentId":"Form_alk8l8x02c","type":"Select","name":"下拉框","elements":[]},{"id":"Select_fuacq11d7t","parentId":"Form_alk8l8x02c","type":"Select","name":"下拉框","elements":[]},{"id":"Upload_ci5jxg8dyf","parentId":"Form_alk8l8x02c","type":"Upload","name":"上传","elements":[]},{"id":"Input_12b3q5mdua","parentId":"Form_alk8l8x02c","type":"Input","name":"文本框","elements":[]}]}]}],"elementsMap":{"SearchForm_60spo02i5g":{"type":"SearchForm","name":"搜索表单","id":"SearchForm_60spo02i5g","config":{"props":{"form":{"submitText":"查询","resetText":"重置"}},"style":{"backgroundColor":"#ffffff","borderRadius":"8px","border":"","padding":"20px 10px"},"events":[{"nickName":"查询事件","eventName":"onSearch","actions":[{"id":"start","type":"start","title":"开始"},{"id":"38466954","type":"normal","title":"节点1969","content":"组件方法","config":{"actionType":"methods","actionName":"组件方法","data":[],"target":"MarsTable_3gx13gh2ht","method":"search","methodName":"搜索"},"children":[]},{"id":"end","type":"end","title":"结束"}]},{"nickName":"重置事件","eventName":"onReset","actions":[{"id":"start","type":"start","title":"开始"},{"id":"24413808","type":"normal","title":"刷新表格","content":"组件方法","config":{"actionType":"methods","actionName":"组件方法","target":"MarsTable_3gx13gh2ht","method":"search","methodName":"搜索"},"children":[]},{"id":"end","type":"end","title":"结束"}]},{"nickName":"值变化事件","eventName":"onChange","actions":[{"id":"start","type":"start","title":"开始"},{"id":"45874598","type":"normal","title":"表格搜索","content":"组件方法","config":{"actionType":"methods","actionName":"组件方法","target":"MarsTable_3gx13gh2ht","method":"search","methodName":"搜索"},"children":[]},{"id":"end","type":"end","title":"结束"}]}],"api":{},"scopeCss":"/* 请在此处添加样式*/\\n.marsview{\\n\\n}","scopeStyle":{"backgroundColor":"#ffffff","borderRadius":"8px","border":"","padding":"20px 10px"}},"events":[{"value":"onSearch","name":"查询事件"},{"value":"onReset","name":"重置事件"},{"value":"onChange","name":"值变化事件"}],"methods":[{"name":"reset","title":"表单重置"},{"name":"submit","title":"表单提交"},{"name":"init","title":"表单初始化"},{"name":"getFormData","title":"获取表单数据"}]},"Input_fb19o54fjh":{"type":"Input","name":"文本框","parentId":"SearchForm_60spo02i5g","id":"Input_fb19o54fjh","config":{"props":{"formItem":{"label":"用户ID","name":"useId","labelCol":{},"wrapperCol":{}},"defaultValue":"","formWrap":{"placeholder":"请输入用户ID","allowClear":true}},"style":{}},"events":[{"value":"onChange","name":"输入事件"},{"value":"onBlur","name":"失焦事件"},{"value":"onPressEnter","name":"回车事件"}],"methods":[]},"Input_5jntc6ed9n":{"type":"Input","name":"文本框","parentId":"SearchForm_60spo02i5g","id":"Input_5jntc6ed9n","config":{"props":{"formItem":{"label":"用户名称","name":"userName","labelCol":{},"wrapperCol":{}},"defaultValue":"","formWrap":{"placeholder":"请输入用户名称","allowClear":true}},"style":{}},"events":[{"value":"onChange","name":"输入事件"},{"value":"onBlur","name":"失焦事件"},{"value":"onPressEnter","name":"回车事件"}],"methods":[]},"Select_6qj74nfqku":{"type":"Select","name":"下拉框","parentId":"SearchForm_60spo02i5g","id":"Select_6qj74nfqku","config":{"props":{"formItem":{"label":"状态","name":"state","labelCol":{},"wrapperCol":{}},"formWrap":{"allowClear":true,"mode":"","placeholder":"请选择数据"},"field":{"label":"label","value":"value"}},"style":{"minWidth":120},"api":{"sourceType":"json","source":[{"label":"在职","value":1},{"label":"离职","value":2},{"label":"试用期","value":3}]}},"events":[{"value":"onChange","name":"onChange事件"}],"methods":[{"name":"update","title":"更新数据"}]},"MarsTable_3gx13gh2ht":{"type":"MarsTable","name":"普通表格","id":"MarsTable_3gx13gh2ht","config":{"props":{"bulkActionList":[{"text":"新增","type":"primary","eventName":"BulkAction_7ym3hhr5gu"},{"text":"批量删除","eventName":"BulkAction_efiho4dz4b","type":"primary","danger":true}],"leftTitle":"用户列表","bordered":true,"selectionType":"checkbox","scroll":{"x":1000},"empty":"-","size":"large","rowKey":"userId","columns":[{"title":"用户ID","dataIndex":"userId","key":"name","width":90,"align":"center"},{"title":"用户名称","dataIndex":"userName","key":"type","width":80,"align":"center"},{"title":"用户邮箱","dataIndex":"userEmail","width":200,"align":"center","fixed":false,"type":"text","eventName":"","onCell":"function onCell(record, index) {\\n    // 此处可以设置数据跨行、跨列\\n    return {\\n\\n    }\\n}","render":"function render(text, record, index) {\\n    return text;\\n}","key":"userEmail"},{"title":"用户角色","dataIndex":"role","width":90,"align":"center","fixed":false,"type":"tag","eventName":"","onCell":"function onCell(record, index) {\\n    // 此处可以设置数据跨行、跨列\\n    return {\\n\\n    }\\n}","render":"function render(text, record, index) {\\n    let label = \'超级管理员\';\\n    let color = \'green\';\\n    switch(String(text)) {\\n        case \'0\': \\n            label = \'超级管理员\';\\n            color = \'green\';\\n            break;\\n        case \'1\': \\n            label = \'管理员\';\\n            color = \'red\';\\n            break;\\n        case \'2\': \\n            label = \'体验管理员\';\\n            color = \'orange\';\\n            break;\\n        case \'3\': \\n            label = \'普通用户\';\\n            color = \'purple\';\\n            break;\\n    }\\n    return [{\\n        label: label,\\n        color: color\\n    }]\\n}","key":"role"},{"title":"用户状态","dataIndex":"state","width":110,"align":"center","fixed":false,"type":"status","eventName":"","onCell":"function onCell(record, index) {\\n    // 此处可以设置数据跨行、跨列\\n    return {\\n\\n    }\\n}","render":"function render(text,record){\\n     let label = \'在职\';\\n    let status = \'success\';\\n    switch(String(text)) {\\n        case \'1\': \\n            label = \'在职\';\\n            status = \'success\';\\n            break;\\n        case \'2\': \\n            label = \'离职\';\\n            status = \'default\';\\n            break;\\n        case \'3\': \\n            label = \'试用期\';\\n            status = \'processing\';\\n            break;\\n    }\\n    return [{\\n        status: status,\\n        text: label\\n    }]\\n}","key":"state"},{"title":"注册时间","dataIndex":"createTime","width":200,"align":"center","fixed":false,"type":"date2","eventName":"","onCell":"function onCell(record, index) {\\n    // 此处可以设置数据跨行、跨列\\n    return {\\n\\n    }\\n}","render":"function render(text, record, index) {\\n    return text;\\n}"},{"title":"操作","dataIndex":"action","width":220,"align":"center","fixed":"right","type":"action","clickable":false,"eventName":"","list":[{"text":"编辑","type":"link","eventName":"DynamicEdit"},{"text":"删除","type":"link","danger":true,"eventName":"DynamicDelete"}],"onCell":"function onCell(record, index) {\\n    // 此处可以设置数据跨行、跨列\\n    return {\\n\\n    }\\n}","render":"function render(text, record, index) {\\n    return text;\\n}","key":"action"}],"expandable":{},"hidePager":false,"pagination":{"position":["bottomRight"],"pageSize":10,"showTotal":true,"showSizeChanger":true,"showQuickJumper":true},"field":{"pageNum":"page.pageNum","pageSize":"page.pageSize","total":"page.total"}},"style":{"backgroundColor":"#ffffff","borderRadius":"8px","border":"","padding":"0 20px","margin":"20px 0 0"},"events":[{"nickName":"新增事件","eventName":"BulkAction_7ym3hhr5gu","actions":[{"id":"start","type":"start","title":"开始"},{"id":"56132221","type":"normal","title":"节点7690","content":"打开弹框","config":{"actionType":"openModal","actionName":"打开弹框","target":"Modal_er4mn6jbtk"},"children":[]},{"id":"19016838","type":"normal","title":"节点6532","content":"变量赋值","config":{"actionType":"variable","actionName":"变量赋值","assigmentType":"assigment","name":"type","variableType":"string","assigmentWay":"static","value":{"type":"static","value":"create"}},"children":[]},{"id":"74784125","type":"normal","title":"节点7810","content":"组件方法","config":{"actionType":"methods","actionName":"组件方法","target":"Form_alk8l8x02c","method":"reset","methodName":"表单重置"},"children":[]},{"id":"end","type":"end","title":"结束"}]},{"nickName":"操作列编辑事件","eventName":"DynamicEdit","actions":[{"id":"start","type":"start","title":"开始"},{"id":"42210718","type":"normal","title":"节点8247","content":"打开弹框","config":{"actionType":"openModal","actionName":"打开弹框","target":"Modal_er4mn6jbtk"},"children":[]},{"id":"50842313","type":"normal","title":"节点0181","content":"变量赋值","config":{"actionType":"variable","actionName":"变量赋值","assigmentType":"assigment","name":"type","variableType":"string","assigmentWay":"static","value":{"type":"static","value":"edit"}},"children":[]},{"id":"94866850","type":"normal","title":"表单赋值","content":"组件方法","config":{"actionType":"methods","actionName":"组件方法","target":"Form_alk8l8x02c","method":"init","methodName":"表单初始化"},"children":[]},{"id":"end","type":"end","title":"结束"}]},{"nickName":"操作列删除事件","eventName":"DynamicDelete","actions":[{"id":"start","type":"start","title":"开始"},{"id":"88465991","type":"normal","title":"刷新表格","content":"组件方法","config":{"actionType":"methods","actionName":"组件方法","target":"MarsTable_3gx13gh2ht","method":"reload","methodName":"刷新"},"children":[]},{"id":"end","type":"end","title":"结束"}]},{"nickName":"批量删除事件","eventName":"BulkAction_efiho4dz4b","actions":[{"id":"start","type":"start","title":"开始"},{"id":"87185908","type":"normal","title":"判断是否选中","content":"组件方法","config":{"actionType":"methods","actionName":"组件方法","target":"MarsTable_3gx13gh2ht","method":"checkSelectedRow","methodName":"判断是否选中一条"},"children":[]},{"id":"96737633","type":"condition","title":"","content":"行为配置","config":{},"children":[{"id":"48710245","type":"success","children":[{"id":"63094159","type":"normal","title":"获取选取的keys","content":"组件方法","config":{"actionType":"methods","actionName":"组件方法","target":"MarsTable_3gx13gh2ht","method":"getSelectedRowKeys","methodName":"获取选中的Keys"},"children":[]}],"title":"成功","content":"成功后执行此流程"},{"id":"34208832","type":"fail","title":"失败","content":"失败后执行此流程","children":[{"id":"86376567","type":"normal","title":"提示选择","content":"全局提示","config":{"actionType":"message","actionName":"全局提示","type":"warning","content":"请选择要删除的数据","duration":3},"children":[]}]}]},{"id":"01355420","type":"normal","title":"刷新表格","content":"组件方法","config":{"actionType":"methods","actionName":"组件方法","target":"MarsTable_3gx13gh2ht","method":"reload","methodName":"刷新"},"children":[]},{"id":"end","type":"end","title":"结束"}]}],"api":{"sourceType":"json","source":[{"userImg":"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png","createTime":"2024-10-23T08:22:40.215Z","userId":1000016,"userName":"张三","userEmail":"zhangsan@example.com","mobile":"17011221122","sex":0,"deptId":"","deptName":"","job":"前端工程师","state":1,"role":2,"createId":1000002,"lastLoginTime":"2024-11-30T11:32:37.244Z","roleList":"655dbedb11c02c8597dce76f"},{"userId":100017,"userName":"李四","userEmail":"lisi@example.com","deptId":"655dbef811c02c8597dce77a","deptName":"大前端","state":1,"role":1,"roleList":"655dbedb11c02c8597dce76f","createId":1000002,"userImg":"","createTime":"2023-11-22T08:52:47.963Z","lastLoginTime":"2024-07-22T08:15:24.102Z","__v":0},{"userId":100018,"userName":"王五","userEmail":"wangwu@example.com","deptId":"","deptName":"","state":1,"role":1,"roleList":"","createId":1000002,"userImg":"http://api-driver.marsview.cc/3f9393c68f57ac57704652f00.png","createTime":"2023-11-22T08:52:47.963Z","lastLoginTime":"2024-03-05T07:18:46.815Z","__v":0,"job":"测试"},{"userId":100020,"userName":"赵六","userEmail":"zhaoliu@example.com","deptId":"6568c7254a54800ac8d5b18e","deptName":"部门5","state":1,"role":1,"roleList":"","createId":1000002,"userImg":"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png","createTime":"2023-11-22T08:52:47.963Z","lastLoginTime":"2024-11-30T10:25:19.834Z","mobile":"13072361279","job":"前端1"},{"userId":100022,"userName":"钱七","userEmail":"qianqi@example.com","deptId":"6582ae994a54800ac8d76b80","deptName":"前端","state":1,"role":1,"roleList":"6582aeb44a54800ac8d76b88","createId":1000002,"userImg":"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png","createTime":"2023-11-22T08:52:47.963Z","lastLoginTime":"2024-06-01T06:06:23.234Z","job":"前端"},{"userId":100023,"userName":"孙八","userEmail":"sunba@example.com","deptId":"","deptName":"大前端","state":1,"role":1,"roleList":"","createId":1000002,"userImg":"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png","createTime":"2023-11-22T08:52:47.963Z","lastLoginTime":"2024-03-08T08:33:42.675Z"},{"userId":100024,"userName":"周九","userEmail":"zhoujiu@example.com","deptId":"","deptName":"大前端","state":1,"role":1,"roleList":"","createId":1000002,"userImg":"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png","createTime":"2023-11-22T08:52:47.963Z","lastLoginTime":"2024-05-29T02:02:06.830Z"},{"userId":100025,"userName":"吴十","userEmail":"wushi@example.com","deptId":"","deptName":"大前端","state":1,"role":1,"roleList":"","createId":1000002,"userImg":"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png","createTime":"2023-11-22T08:52:47.963Z","lastLoginTime":"2024-07-01T16:46:53.689Z"},{"userId":100027,"userName":"郑十一","userEmail":"zheng11@example.com","deptId":"65eacdb84a54800ac8dd6183","deptName":"2312312","state":1,"role":1,"roleList":"65eaeafb4a54800ac8dd6429","createId":1000002,"userImg":"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png","createTime":"2023-11-22T08:52:47.963Z","lastLoginTime":"2024-07-01T16:42:10.830Z"},{"userId":100028,"userName":"何十二","userEmail":"heshi@example.com","deptId":"666020984a54800ac8e38f05","deptName":"产品中心","state":1,"role":1,"roleList":"665fd3194a54800ac8e38b84","createId":1000002,"userImg":"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png","createTime":"2023-11-22T08:52:47.963Z","lastLoginTime":"2024-11-12T08:42:44.582Z","job":"产品经理","mobile":"16675199700"}]},"scopeCss":"/* 请在此处添加样式*/\\n.marsview{\\n\\n}","scopeStyle":{"backgroundColor":"#ffffff","borderRadius":"8px","border":"","padding":"0 20px","margin":"20px 0 0"}},"events":[{"value":"onCheckedChange","name":"单选/多选事件"},{"name":"新增事件","value":"BulkAction_7ym3hhr5gu"},{"name":"批量删除事件","value":"BulkAction_efiho4dz4b"}],"methods":[{"name":"search","title":"搜索"},{"name":"reload","title":"刷新"},{"name":"clearData","title":"清空列表"},{"name":"开始Loading","title":"startLoading"},{"name":"结束Loading","title":"stopLoading"},{"name":"checkSelectedRow","title":"判断是否选中一条"},{"name":"setSelectedRowKeys","title":"设置默认选中的Keys"},{"name":"getSelectedRowKeys","title":"获取选中的Keys"},{"name":"getSelectedRow","title":"获取选中的行数据"}]},"Modal_er4mn6jbtk":{"type":"Modal","name":"弹框","id":"Modal_er4mn6jbtk","config":{"props":{"title":{"type":"variable","value":"context.variable.type === \'create\' ? \'创建用户\': \'编辑用户\'"},"width":700,"closable":true,"footer":true,"okText":"确定","cancelText":"取消","destroyOnClose":false,"confirmLoading":false},"style":{"width":""},"scopeCss":"/* 请在此处添加样式*/\\n.marsview{\\n\\n}","scopeStyle":{"width":""},"events":[{"nickName":"确认事件","eventName":"onOk","actions":[{"id":"start","type":"start","title":"开始"},{"id":"07259998","type":"normal","title":"判断类型","content":"脚本运行","config":{"actionType":"script","actionName":"脚本运行","scripts":"/**\\n* 触发动作后，会执行该函数\\n* 变量: variable\\n* 事件参数: eventParams\\n*/\\nfunction run(){\\n    return context.variable.type === \'create\'\\n}\\n"},"children":[]},{"id":"33935119","type":"condition","title":"","content":"行为配置","config":{},"children":[{"id":"62327184","type":"success","children":[{"id":"18596826","type":"normal","title":"获取表单值","content":"组件方法","config":{"actionType":"methods","actionName":"组件方法","target":"Form_alk8l8x02c","method":"getFormData","methodName":"获取表单数据"},"children":[]},{"id":"20121198","type":"normal","title":"新增请求","content":"发送请求","config":{"actionType":"request","actionName":"发送请求","id":"ab55303e-24d8-4d3f-9134-c4bc67743bd6"},"children":[]}],"title":"成功","content":"成功后执行此流程"},{"id":"33106906","type":"fail","title":"失败","content":"失败后执行此流程","children":[{"id":"70223070","type":"normal","title":"获取表单数据","content":"组件方法","config":{"actionType":"methods","actionName":"组件方法","target":"Form_alk8l8x02c","method":"getFormData","methodName":"获取表单数据"},"children":[]},{"id":"29095124","type":"normal","title":"编辑","content":"发送请求","config":{"actionType":"request","actionName":"发送请求","id":"a28dcba7-b20e-4618-925d-d3b9d6815431"},"children":[]}]}]},{"id":"50077050","type":"normal","title":"隐藏弹框","content":"关闭弹框","config":{"actionType":"closeModal","actionName":"关闭弹框","target":"Modal_er4mn6jbtk"},"children":[]},{"id":"56186228","type":"normal","title":"刷新表格","content":"组件方法","config":{"actionType":"methods","actionName":"组件方法","target":"MarsTable_3gx13gh2ht","method":"reload","methodName":"刷新"},"children":[]},{"id":"end","type":"end","title":"结束"}]}]},"events":[{"value":"onLoad","name":"初始化事件"},{"value":"onOk","name":"确认事件"},{"value":"onCancel","name":"取消事件"}],"methods":[{"name":"open","title":"打开弹框"},{"name":"close","title":"关闭弹框"},{"name":"showConfirmLoading","title":"确认Loading"},{"name":"hideConfirmLoading","title":"隐藏确认Loading"},{"name":"showLoading","title":"显示加载Loading"},{"name":"hideLoading","title":"隐藏加载Loading"}]},"Form_alk8l8x02c":{"type":"Form","name":"Form容器","parentId":"Modal_er4mn6jbtk","id":"Form_alk8l8x02c","config":{"props":{"colon":true,"labelAlign":"right","layout":"horizontal","labelCol":{"span":4},"wrapperCol":{}},"style":{"padding":"20px 10px","backgroundColor":"#fff"},"events":[],"api":{}},"events":[{"value":"onReset","name":"重置事件"},{"value":"onChange","name":"表单变化事件"},{"value":"onFinish","name":"表单提交事件"}],"methods":[{"name":"reset","title":"表单重置"},{"name":"submit","title":"表单提交"},{"name":"validate","title":"表单校验"},{"name":"init","title":"表单初始化"},{"name":"getFormData","title":"获取表单数据"}]},"Input_1zt7tznrjf":{"type":"Input","name":"文本框","parentId":"Form_alk8l8x02c","id":"Input_1zt7tznrjf","config":{"props":{"formItem":{"label":"用户名称","name":"userName","labelCol":{},"wrapperCol":{},"rules":[{"required":true,"message":"请输入内容"}]},"defaultValue":"","formWrap":{"placeholder":"请输入文本","allowClear":true}},"style":{}},"events":[{"value":"onChange","name":"输入事件"},{"value":"onBlur","name":"失焦事件"},{"value":"onPressEnter","name":"回车事件"}],"methods":[]},"Input_b5n1wg2jvh":{"type":"Input","name":"文本框","parentId":"Form_alk8l8x02c","id":"Input_b5n1wg2jvh","config":{"props":{"formItem":{"label":"邮箱","name":"userEmail","labelCol":{},"wrapperCol":{},"rules":[{"required":true,"message":"请输入内容"}]},"defaultValue":"","formWrap":{"placeholder":"请输入文本","allowClear":true}},"style":{}},"events":[{"value":"onChange","name":"输入事件"},{"value":"onBlur","name":"失焦事件"},{"value":"onPressEnter","name":"回车事件"}],"methods":[]},"Input_2a9wt4s7qi":{"type":"Input","name":"文本框","parentId":"Form_alk8l8x02c","id":"Input_2a9wt4s7qi","config":{"props":{"formItem":{"label":"手机号","name":"mobile","labelCol":{},"wrapperCol":{},"rules":[{"key":"phone","pattern":"^1[3456789]\\\\d{9}$","message":"请输入正确的手机号"}]},"defaultValue":"","formWrap":{"placeholder":"请输入手机号","allowClear":true}},"style":{}},"events":[{"value":"onChange","name":"输入事件"},{"value":"onBlur","name":"失焦事件"},{"value":"onPressEnter","name":"回车事件"}],"methods":[]},"Input_b8weoo8y9i":{"type":"Input","name":"文本框","parentId":"Form_alk8l8x02c","id":"Input_b8weoo8y9i","config":{"props":{"formItem":{"label":"岗位","name":"job","labelCol":{},"wrapperCol":{}},"defaultValue":"","formWrap":{"placeholder":"请输入文本","allowClear":true}},"style":{}},"events":[{"value":"onChange","name":"输入事件"},{"value":"onBlur","name":"失焦事件"},{"value":"onPressEnter","name":"回车事件"}],"methods":[]},"TreeSelect_lx8mkqr47t":{"type":"TreeSelect","name":"树形选择","parentId":"Form_alk8l8x02c","id":"TreeSelect_lx8mkqr47t","config":{"props":{"formItem":{"label":"部门","name":"deptId","labelCol":{},"wrapperCol":{},"rules":[{"required":true,"message":"请输入内容"}]},"formWrap":{"allowClear":true,"labelInValue":false,"multiple":false,"placement":"bottomLeft","fieldNames":{"label":"deptName","value":"_id","children":"children"}}},"style":{"minWidth":120},"api":{"sourceType":"json","source":[{"_id":"655dbeee11c02c8597dce776","deptName":"技术中心","userName":"admin","parentId":"","createId":1000002,"updateTime":"2023-11-22T08:23:39.919Z","createTime":"2023-11-22T08:23:39.919Z","__v":0,"children":[{"_id":"655dbef811c02c8597dce77a","deptName":"大前端","userName":"Jack","parentId":"655dbeee11c02c8597dce776","createId":1000002,"updateTime":"2023-11-22T08:23:39.919Z","createTime":"2023-11-22T08:23:39.919Z","__v":0},{"_id":"655dc06811c02c8597dce7ae","deptName":"测试部门","userName":"Jack","parentId":"655dbeee11c02c8597dce776","createId":1000002,"updateTime":"2023-11-22T08:48:49.920Z","createTime":"2023-11-22T08:23:39.919Z","__v":0},{"_id":"655dc07e11c02c8597dce7b5","deptName":"产品中心","userName":"Jack","parentId":"655dbeee11c02c8597dce776","createId":1000002,"updateTime":"2023-11-22T08:23:39.919Z","createTime":"2023-11-22T08:23:39.919Z","__v":0},{"_id":"655dc08911c02c8597dce7b9","deptName":"营销中心","userName":"Jack","parentId":"655dbeee11c02c8597dce776","createId":1000002,"updateTime":"2023-11-22T08:23:39.919Z","createTime":"2023-11-22T08:23:39.919Z","__v":0},{"_id":"655dc09311c02c8597dce7bd","deptName":"增长中心","userName":"Jack","parentId":"655dbeee11c02c8597dce776","createId":1000002,"updateTime":"2023-11-22T08:23:39.919Z","createTime":"2023-11-22T08:23:39.919Z","__v":0}]},{"_id":"6735e43fe92c3a995cc49023","deptName":"ces ","userName":"admin","parentId":"","createId":1000002,"updateTime":"2024-10-23T08:22:40.231Z","createTime":"2024-10-23T08:22:40.231Z","__v":0}]}},"events":[{"value":"onChange","name":"onChange事件"}],"methods":[{"name":"update","title":"更新数据"}]},"Select_fr4urxhlyd":{"type":"Select","name":"下拉框","parentId":"Form_alk8l8x02c","id":"Select_fr4urxhlyd","config":{"props":{"formItem":{"label":"状态","name":"state","labelCol":{},"wrapperCol":{}},"formWrap":{"allowClear":true,"mode":"","placeholder":"请选择用户状态"},"field":{"label":"label","value":"value"}},"style":{"minWidth":120},"api":{"sourceType":"json","source":[{"label":"在职","value":1},{"label":"离职","value":2},{"label":"试用期","value":3}]}},"events":[{"value":"onChange","name":"onChange事件"}],"methods":[{"name":"update","title":"更新数据"}]},"Select_fuacq11d7t":{"type":"Select","name":"下拉框","parentId":"Form_alk8l8x02c","id":"Select_fuacq11d7t","config":{"props":{"formItem":{"label":"系统角色","name":"roleList","labelCol":{},"wrapperCol":{}},"formWrap":{"allowClear":true,"mode":"","placeholder":"请选择用户角色"},"field":{"label":"roleName","value":"_id"}},"style":{"minWidth":120},"api":{"sourceType":"json","source":[{"_id":"655dbed711c02c8597dce76b","roleName":"产品"},{"_id":"655dbedb11c02c8597dce76f","roleName":"技术"}]}},"events":[{"value":"onChange","name":"onChange事件"}],"methods":[{"name":"update","title":"更新数据"}]},"Upload_ci5jxg8dyf":{"type":"Upload","name":"上传","parentId":"Form_alk8l8x02c","id":"Upload_ci5jxg8dyf","config":{"props":{"formItem":{"label":"头像","name":"userImg"},"formWrap":{"accept":["image/jpeg","image/png"],"limitSize":1024,"listType":"picture-circle","maxCount":1,"showUploadList":true},"text":"Upload","structure":"url"},"style":{},"events":[{"nickName":"上传事件","eventName":"handleClick","actions":[{"id":"start","type":"start","title":"开始"},{"id":"40113691","type":"normal","title":"节点3384","content":"发送请求","config":{"actionType":"request","actionName":"发送请求","id":"3b297b3c-7eeb-43c5-b0e6-9bed86c6f185"},"children":[]},{"id":"end","type":"end","title":"结束"}]}],"api":{},"source":[]},"events":[{"value":"handleClick","name":"上传事件"}],"methods":[]},"Input_12b3q5mdua":{"type":"Input","name":"文本框","parentId":"Form_alk8l8x02c","id":"Input_12b3q5mdua","config":{"props":{"formItem":{"label":"输入框","name":"userId","hidden":true,"labelCol":{},"wrapperCol":{}},"defaultValue":"","formWrap":{"placeholder":"请输入文本","allowClear":true}},"style":{}},"events":[{"value":"onChange","name":"输入事件"},{"value":"onBlur","name":"失焦事件"},{"value":"onPressEnter","name":"回车事件"}],"methods":[]}},"variables":[{"name":"roleList","type":"array","defaultValue":[],"remark":"角色列表"},{"name":"deptList","type":"array","defaultValue":[]},{"name":"type","type":"string","defaultValue":"create"}],"variableData":{},"formData":{},"interceptor":{"headers":[{"key":"","value":{"type":"static","value":""}}],"timeout":8,"timeoutErrorMessage":"请求超时，请稍后再试","requestInterceptor":"/**\\n * config: 请求完整配置，请严格按照以下格式使用和返回\\n * config.url: 请求地址,eg: config.url = \'https://xxx.marsview.cc/api/xxx\'\\n * config.params: Get请求对应参数,eg: config.params = {name:\'xxx\'}\\n * config.data: Post请求对应数据,eg: config.data = {name:\'xxx\'}\\n * config.timeout: 超时时间（秒）,eg: config.timeout = 5\\n * config.headers: 请求头,eg: config.headers.token = \'xxx\'\\n */\\nfunction request(config){\\n    return config;\\n}","responseInterceptor":"/**\\n* response: 返回值完整结构\\n* response.config: 请求完整配置。\\n* response.data: 请求返回数据\\n* response.headers: 请求头\\n* response.status: 请求状态码\\n*/\\nfunction response(response){\\n    return response;\\n}"},"userId":50,"canvasWidth":1900}',
    stgState: 2,
    preState: 2,
    prdState: 2,
    projectId: 100000,
    updatedAt: '2025-01-14 10:31:23',
  },
});
Mock.mock('/api/pages/role/delete', 'post', {
  code: 0,
  data: '',
  message: '操作成功',
});
export default Mock;