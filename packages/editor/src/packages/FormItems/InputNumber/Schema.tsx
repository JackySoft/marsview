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
      type: 'Variable',
      label: '默认值',
      name: ['defaultValue'],
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
      label: '表单配置',
    },
    {
      type: 'Input',
      label: '占位提示',
      name: ['formWrap', 'placeholder'],
    },
    {
      type: 'InputNumber',
      label: '最大值',
      name: ['formWrap', 'max'],
    },
    {
      type: 'InputNumber',
      label: '最小值',
      name: ['formWrap', 'min'],
    },
    {
      type: 'Switch',
      label: '是否禁用',
      name: ['formWrap', 'disabled'],
    },
    {
      type: 'Input',
      label: '前缀',
      name: ['formWrap', 'prefix'],
    },
    {
      type: 'Input',
      label: '后缀',
      name: ['formWrap', 'suffix'],
    },
    {
      type: 'Select',
      label: '边框样式',
      name: ['formWrap', 'variant'],
      props: {
        options: [
          { value: '', label: '无' },
          { value: 'outlined', label: '外边框' },
          { value: 'borderless', label: '无边框' },
          { value: 'filled', label: '填充' },
        ],
      },
    },
    {
      type: 'Variable',
      label: '展示加工',
      name: ['formWrap', 'formatter'],
      tooltip: () => (
        <div>
          <div>修改展示的内容，如展示百分比。</div>
          <p>function run(value) {'{'} </p>
          <p> return `${'{value}'}%`;</p>
          <p>{'}'}</p>
        </div>
      ),
      props: {
        placeholder: '输入加工函数',
      },
    },
    {
      type: 'Variable',
      label: '值加工',
      name: ['formWrap', 'parser'],
      tooltip: () => (
        <div>
          <div>修改最终的值，如百分比。</div>
          <p>function run(value) {'{'} </p>
          <p> return value?.replace('%', '');</p>
          <p>{'}'}</p>
        </div>
      ),
      props: {
        placeholder: '输入加工函数',
      },
    },
    {
      type: 'Title',
      label: '布局',
      key: 'FormLayout',
    },
    {
      type: 'InputNumber',
      label: '标签占位',
      name: ['formItem', 'labelCol', 'span'],
      props: {
        placeholder: '占位格数',
      },
    },
    {
      type: 'InputNumber',
      label: '标签偏移',
      name: ['formItem', 'labelCol', 'offset'],
      props: {
        placeholder: '偏移数',
      },
    },
    {
      type: 'InputNumber',
      label: '控件占列',
      name: ['formItem', 'wrapperCol', 'span'],
      props: {
        placeholder: '占位格数',
      },
    },
    {
      type: 'InputNumber',
      label: '控件偏移',
      name: ['formItem', 'wrapperCol', 'offset'],
      props: {
        placeholder: '偏移数',
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
        label: '数字框',
        name: 'number',
      },
      // 组件默认属性值
      formWrap: {
        placeholder: '请输入数字框',
      },
    },
    // 组件样式
    style: {},
  },
  // 组件事件
  events: [
    {
      value: 'onChange',
      name: 'onChange事件',
    },
  ],
};
