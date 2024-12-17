import { ReactNode } from 'react';
import IconBaseTable from './icons/IconBaseTable';
import IconTitle from './icons/IconTitle';
import IconCard from './icons/IconCard';
import IconForm from './icons/IconForm';
import IconDiv from './icons/IconDiv';
import IconFlex from './icons/IconFlex';
import IconSpace from './icons/IconSpace';
import IconDivider from './icons/IconDivider';
import IconRow from './icons/IconRow';
import IconColumn from './icons/IconColumn';
import IconFormInput from './icons/IconFormInput';
import IconFormInputNumber from './icons/IconFromInputNumber';
import IconFormInputPassword from './icons/IconFormInputPassword';
import IconFormSelect from './icons/IconFormSelect';
import IconFormDate from './icons/IconFormDate';
import IconFormDatepicker from './icons/IconFormDatepicker';
import IconFormRadio from './icons/IconFormRadio';
import IconFormCheckbox from './icons/IconFormCheckbox';
import IconFormSwitch from './icons/IconFormSwitch';
import IconFormTimepicker from './icons/IconFormTimePicker';
import IconImage from './icons/IconImage';
import IconIframe from './icons/IconIFrame';
import IconFileUpload from './icons/IconFileUpload';
import IconList from './icons/IconList';
import IconFormStatic from './icons/IconFormStatic';
import IconFormItem from './icons/IconFormItem';
import IconLink from './icons/IconLink';
import IconPieChart from './icons/IconPieChart';
import IconLineChart from './icons/IconLineChart';
import IconColumnChart from './icons/IconColumnChart';
import IconBarChart from './icons/IconBarChart';
import IconTinyColumn from './icons/IconTinyColumn';
import IconProgress from './icons/IconProgress';
import IconTinyLine from './icons/IconTinyLine';
import IconFormEditTable from './icons/IconFormEditTable';
import IconFormPassValidate from './icons/IconFormPassValidate';
import IconText from './icons/IconText';
import IconTime from './icons/IconFormTime';
import IconFormList from './icons/IconFormList';
import IconFormTextArea from './icons/IconFormTextArea';
import IconDescriptions from './icons/IconDescriptions';
import IconButton from './icons/IconButton';
import IconRate from './icons/IconRate';
import IconJson from './icons/IconJson';
import IconGridForm from './icons/IconGridForm';
import IconColorPicker from './icons/IconColorPicker';
import IconSearchForm from './icons/IconSearcFrom';
import IconRichText from './icons/IconRichText';
import IconCarousel from './icons/IconCarousel';
import IconRignProgress from './icons/IconRingProgress';
import IconBmap from './icons/IconBMap';
import IconRibon from './icons/IconRibon';
import IconCountDown from './icons/IconCountDown';
import IconTag from './icons/IconTag';
import IconLiquid from './icons/IconLiquid.svg';
import IconTinyArea from './icons/IconTinyArea.svg';
import IconWordCloud from './icons/IconWordCloud.svg';
import IconGauge from './icons/IconGauge.svg';
import IconTagGroup from './icons/IconTagGroup';
import IconRadar from './icons/IconRadar.svg';
import IconGrid from './icons/IconGrid';
import IconDropdwon from './icons/IconDropdown';
/**
 * 组件配置列表
 */
export interface SysComItem {
  type: string;
  title: string;
  hidden?: boolean;
  data: Array<{
    icon: ReactNode | string;
    name: string;
    type: string;
    hidden?: boolean;
  }>;
}
const components = [
  {
    type: 'Page',
    title: '页面组件',
    hidden: true,
    data: [],
  },
  {
    type: 'Advanced',
    title: '高级组件',
    data: [
      {
        icon: <IconSearchForm />,
        name: '行内表单',
        type: 'SearchForm',
      },
      {
        icon: <IconGridForm />,
        name: '网格表单',
        type: 'GridForm',
      },
      {
        icon: <IconBaseTable />,
        name: '基础表格',
        type: 'MarsTable',
      },
      {
        icon: <IconTagGroup />,
        name: '标签组',
        type: 'TagGroup',
      },
    ],
  },
  {
    type: 'Container',
    title: '容器组件',
    data: [
      {
        icon: <IconFlex />,
        name: 'Flex容器',
        type: 'Flex',
      },
      {
        icon: <IconCard />,
        name: 'Card容器',
        type: 'Card',
      },
      {
        icon: <IconForm />,
        name: 'Form容器',
        type: 'Form',
      },
      {
        icon: <IconDiv />,
        name: 'Div容器',
        type: 'Div',
      },
      {
        icon: <IconGrid />,
        name: '网格容器',
        type: 'Grid',
      },
    ],
  },
  {
    type: 'Layout',
    title: '布局组件',
    data: [
      {
        icon: <IconSpace />,
        name: '间距',
        type: 'Space',
      },
      {
        icon: <IconDivider />,
        name: '分割线',
        type: 'Divider',
      },
      {
        icon: <IconRow />,
        name: '行组件',
        type: 'Row',
      },
      {
        icon: <IconColumn />,
        name: '列组件',
        type: 'Col',
      },
    ],
  },
  {
    type: 'FormItems',
    title: '表单录入',
    data: [
      {
        icon: <IconFormInput />,
        name: '文本框',
        type: 'Input',
      },
      {
        icon: <IconFormInputNumber />,
        name: '数字框',
        type: 'InputNumber',
      },
      {
        icon: <IconFormInputPassword />,
        name: '密码框',
        type: 'InputPassword',
      },
      {
        icon: <IconFormPassValidate />,
        name: '短码验证',
        type: 'InputOTP',
      },
      {
        icon: <IconFormSelect />,
        name: '下拉框',
        type: 'Select',
      },
      {
        icon: <IconFormDate />,
        name: '日期',
        type: 'DatePicker',
      },
      {
        icon: <IconFormDatepicker />,
        name: '日期范围',
        type: 'DatePickerRange',
      },
      {
        icon: <IconFormRadio />,
        name: '单选框',
        type: 'Radio',
      },
      {
        icon: <IconFormCheckbox />,
        name: '多选框',
        type: 'CheckBox',
      },
      {
        icon: <IconFormSwitch />,
        name: '开关',
        type: 'Switch',
      },
      {
        icon: <IconFormTextArea />,
        name: '多行文本框',
        type: 'TextArea',
      },
      {
        icon: <IconTime />,
        name: '时间选择',
        type: 'TimePicker',
      },
      {
        icon: <IconFormTimepicker />,
        name: '时间范围框',
        type: 'TimePickerRange',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XJR2TbS1aaQAAAAAAAAAAAAADrJ8AQ/original',
        name: '分段选择器',
        type: 'Segmented',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ngTnQZNOcK0AAAAAAAAAAAAADrJ8AQ/original',
        name: '级联选择',
        type: 'Cascader',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_4heQaUrFn4AAAAAAAAAAAAADrJ8AQ/original',
        name: '滑动条',
        type: 'Slider',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1zcHQLltaJcAAAAAAAAAAAAADrJ8AQ/original',
        name: '树形选择',
        type: 'TreeSelect',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*93ymR4RD4S0AAAAAAAAAAAAADrJ8AQ/original',
        name: '上传',
        type: 'Upload',
      },
      {
        icon: <IconFormList />,
        name: '动态列表',
        type: 'FormList',
      },
      {
        icon: <IconFormEditTable />,
        name: '编辑表格',
        type: 'EditTable',
      },
      {
        icon: <IconRichText />,
        name: '富文本',
        type: 'RichText',
      },
      {
        icon: <IconFormStatic />,
        name: '静态项',
        type: 'StaticItem',
      },
      {
        icon: <IconFormItem />,
        name: '表单项',
        type: 'FormItem',
      },
      {
        icon: <IconColorPicker />,
        name: '颜色选择器',
        type: 'ColorPicker',
      },
      {
        icon: <IconRate />,
        name: '评分',
        type: 'Rate',
      },
      {
        icon: <IconJson />,
        name: 'Json',
        type: 'Json',
      },
    ],
  },
  {
    type: 'Echart',
    title: '图表组件',
    data: [
      {
        icon: <IconPieChart />,
        name: '饼图',
        type: 'PieChart',
      },
      {
        icon: <IconLineChart />,
        name: '折线图',
        type: 'LineChart',
      },
      {
        icon: <IconColumnChart />,
        name: '柱状图',
        type: 'ColumnChart',
      },
      {
        icon: <IconBarChart />,
        name: '条形图',
        type: 'BarChart',
      },
      {
        icon: <IconTinyLine />,
        name: '迷你折线图',
        type: 'TinyLine',
      },
      {
        icon: IconTinyArea,
        name: '迷你面积图',
        type: 'TinyArea',
      },
      {
        icon: <IconTinyColumn />,
        name: '迷你柱形图',
        type: 'TinyColumn',
      },
      {
        icon: <IconProgress />,
        name: '进度条',
        type: 'Progress',
      },
      {
        icon: <IconRignProgress />,
        name: '进度环图',
        type: 'RingProgress',
      },
      {
        icon: IconLiquid,
        name: '水波图',
        type: 'Liquid',
      },
      {
        icon: IconWordCloud,
        name: '词云图',
        type: 'WordCloud',
      },
      {
        icon: IconGauge,
        name: '仪表盘',
        type: 'Gauge',
      },
      {
        icon: IconRadar,
        name: '雷达',
        type: 'Radar',
      },
    ],
  },
  {
    type: 'Functional',
    title: '功能组件',
    data: [
      {
        icon: <IconButton />,
        name: '按钮',
        type: 'Button',
      },
      {
        icon: <IconFileUpload />,
        name: '文件上传',
        type: 'FileUpload',
      },
      {
        icon: <IconList />,
        name: '列表组件',
        type: 'List',
      },
      {
        icon: <IconDescriptions />,
        name: '描述列表',
        type: 'Descriptions',
      },

      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*677sTqCpE3wAAAAAAAAAAAAADrJ8AQ/original',
        name: '步骤条',
        type: 'Steps',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*72NDQqXkyOEAAAAAAAAAAAAADrJ8AQ/original',
        name: '标签页',
        type: 'Tabs',
      },
      {
        icon: '',
        name: '子标签页',
        type: 'Tab',
        hidden: true,
      },
      {
        icon: <IconCarousel />,
        name: '轮播图',
        type: 'Carousel',
      },
      {
        icon: <IconDropdwon />,
        name: '下拉框',
        type: 'Dropdown',
      },
    ],
  },
  {
    type: 'FeedBack',
    title: '反馈组件',
    data: [
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Z9vzQZAdJDQAAAAAAAAAAAAADrJ8AQ/original',
        name: '弹框',
        type: 'Modal',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BD2JSKm8I-kAAAAAAAAAAAAADrJ8AQ/original',
        name: '抽屉',
        type: 'Drawer',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*-e2IRroDJyEAAAAAAAAAAAAADrJ8AQ/original',
        name: '结果页',
        type: 'Result',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*ZdiZSLzEV0wAAAAAAAAAAAAADrJ8AQ/original',
        name: '空状态',
        type: 'Empty',
      },
    ],
  },
  {
    type: 'Basic',
    title: '数据展示',
    data: [
      {
        icon: <IconImage />,
        name: '图片',
        type: 'Image',
      },
      {
        icon: <IconTitle />,
        name: '标题',
        type: 'Title',
      },
      {
        icon: <IconText />,
        name: '文本',
        type: 'Text',
      },
      {
        icon: <IconLink />,
        name: '超链接',
        type: 'Link',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YL7PRYNtH-4AAAAAAAAAAAAADrJ8AQ/original',
        name: '统计数值',
        type: 'Statistic',
      },
      {
        icon: <IconCountDown />,
        name: '倒计时',
        type: 'CountDown',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*PdAYS7anRpoAAAAAAAAAAAAADrJ8AQ/original',
        name: '图标',
        type: 'Icon',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JJBSS5lBG4IAAAAAAAAAAAAADrJ8AQ/original',
        name: '头像',
        type: 'Avatar',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*cJopQrf0ncwAAAAAAAAAAAAADrJ8AQ/original',
        name: '二维码',
        type: 'QRCode',
      },
      {
        icon: 'https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*e0qITYqF394AAAAAAAAAAAAADrJ8AQ/original',
        name: '徽标',
        type: 'Badge',
      },
      {
        icon: <IconRibon />,
        name: '缎带',
        type: 'Ribbon',
      },
      {
        icon: <IconTag />,
        name: '标签',
        type: 'Tag',
      },
    ],
  },
  {
    type: 'Other',
    title: '其它',
    data: [
      {
        icon: <IconBmap />,
        name: 'BMap',
        type: 'BMap',
      },
      {
        icon: <IconIframe />,
        name: 'IFrame',
        type: 'IFrame',
      },
    ],
  },
];

export default components;
