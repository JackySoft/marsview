/**
 * 组件配置和属性值
 */
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '基础配置',
      key: 'title1',
    },
    {
      type: 'Input',
      label: '按钮名称',
      name: ['button', 'text'],
    },
    {
      type: 'Select',
      label: '按钮类型',
      name: ['button', 'type'],
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
    },
    {
      type: 'Select',
      label: '按钮形状',
      name: ['button', 'shape'],
      props: {
        options: [
          { value: 'default', label: 'default' },
          { value: 'circle', label: 'circle' },
          { value: 'round', label: 'round' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '块状按钮',
      name: ['button', 'block'],
    },
    {
      type: 'Switch',
      label: '幽灵按钮',
      name: ['button', 'ghost'],
    },
    {
      type: 'Switch',
      label: '危险按钮',
      name: ['button', 'danger'],
    },
    {
      type: 'Icons',
      label: '按钮图标',
      name: ['button', 'icon'],
    },
    {
      type: 'Title',
      label: '上传配置',
      key: 'title2',
    },
    {
      type: 'Input',
      label: '参数名称',
      name: ['upload', 'name'],
      props: {
        placeholder: '请输入上传参数',
      },
    },
    {
      type: 'Select',
      label: '文件类型',
      name: ['upload', 'accept'],
      props: {
        mode: 'multiple',
        options: [
          { value: 'image/jpeg', label: 'image/jpeg' },
          { value: 'image/png', label: 'image/png' },
          { value: 'image/gif', label: 'image/gif' },
          { value: 'video/mp4', label: 'video/mp4' },
          { value: 'text/csv', label: 'text/csv' },
          { value: 'text/html', label: 'text/html' },
          { value: 'application/zip', label: 'application/zip' },
          { value: 'application/pdf', label: 'application/pdf' },
          {
            value: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            label: 'excel',
          },
          {
            value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            label: 'word',
          },
          {
            value: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            label: 'ppt',
          },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '文件大小',
      name: ['upload', 'limitSize'],
      props: {
        placeholder: '单位：MB',
        addonAfter: 'MB',
      },
    },
    {
      type: 'Switch',
      label: '支持多选',
      name: ['upload', 'multiple'],
    },
    {
      type: 'Input',
      label: '上传地址',
      name: ['upload', 'action'],
      props: {
        placeholder: '请输入上传地址',
      },
    },
  ],
  config: {
    props: {
      button: {
        type: 'primary',
        size: 'middle',
        text: '上传',
        shape: 'default',
        icon: 'UploadOutlined',
      },
      // 组件默认属性值
      upload: {
        name: 'file',
        accept: ['excel'],
        listType: 'text',
        multiple: false,
        limitSize: 10,
      },
      text: 'Upload',
      structure: 'url',
    },
    // 组件样式
    style: {},
    events: [],
    api: {},
    source: [],
  },
  // 组件事件
  events: [
    {
      value: 'onSuccess',
      name: '上传成功事件',
    },
    {
      value: 'onFail',
      name: '上传失败事件',
    },
  ],
};
