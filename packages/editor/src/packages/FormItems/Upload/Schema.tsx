/**
 * 组件配置和属性值
 */
import { FormInstance } from 'antd';
import RulesSetting from '../../components/RulesSetting';
export default {
  // 组件属性配置JSON
  attrs: [
    {
      type: 'Title',
      label: '标签配置',
      key: 'title1',
    },
    {
      type: 'Input',
      label: '标题',
      name: ['formItem', 'label'],
    },
    {
      type: 'Input',
      label: '字段',
      name: ['formItem', 'name'],
    },
    {
      type: 'Switch',
      label: '无样式',
      name: ['formItem', 'noStyle'],
    },
    {
      type: 'Input',
      label: 'Extra',
      name: ['formItem', 'extra'],
      tooltip: '表单控件下方显示的提示信息',
    },
    {
      type: 'Input',
      label: 'Tooltip',
      name: ['formItem', 'tooltip'],
      tooltip: '表单项后面显示的提示信息',
    },
    {
      type: 'Title',
      label: '上传配置',
      key: 'title2',
    },
    {
      type: 'Select',
      label: '文件类型',
      name: ['formWrap', 'accept'],
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
            label: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
          {
            value: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            label: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          },
          {
            value: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            label: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
          },
        ],
      },
    },
    {
      type: 'InputNumber',
      label: '文件大小',
      name: ['formWrap', 'limitSize'],
      props: {
        placeholder: '单位：K',
      },
    },
    {
      type: 'Select',
      label: '列表类型',
      name: ['formWrap', 'listType'],
      props: {
        options: [
          { value: 'text', label: 'text' },
          { value: 'picture', label: 'picture' },
          { value: 'picture-card', label: 'picture-card' },
          { value: 'picture-circle', label: 'picture-circle' },
        ],
      },
    },
    {
      type: 'Switch',
      label: '是否禁用',
      name: ['formWrap', 'disabled'],
    },
    {
      type: 'InputNumber',
      label: '最大个数',
      name: ['formWrap', 'maxCount'],
    },
    {
      type: 'Switch',
      label: '上传列表',
      name: ['formWrap', 'showUploadList'],
    },
    {
      type: 'Input',
      label: '显示文本',
      name: ['text'],
    },
    {
      type: 'Select',
      label: '上传结构',
      name: 'structure',
      props: {
        options: [
          { value: 'url', label: '文件地址' },
          { value: 'object', label: '文件对象' },
        ],
      },
    },
    {
      type: 'Title',
      label: '校验规则',
      key: 'rules',
    },
    {
      type: 'function',
      render: (form: FormInstance) => {
        return <RulesSetting key="rule-list" form={form} />;
      },
    },
  ],
  config: {
    props: {
      formItem: {
        label: '上传',
        name: 'upload',
      },
      // 组件默认属性值
      formWrap: {
        accept: ['image/jpeg', 'image/png'],
        listType: 'picture-card',
        maxCount: 1,
        limitSize: 1024,
        showUploadList: true,
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
      value: 'handleClick',
      name: '上传事件',
    },
  ],
};
