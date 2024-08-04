import { ColorPicker } from 'antd';
/**
 * HOC：颜色选择器高阶组件
 * 由于ColorPicker返回的颜色是对象，需要转换成字符串才能使用，因此我们刻意封装一下
 * @returns React.FC
 */
const MColorPicker = (props: any) => {
  const handleChange = (color: any) => {
    props.onChange(color.toHexString());
  };
  const handleClear = () => {
    props.onChange('');
  };
  return <ColorPicker {...props} format="hex" showText allowClear value={props.value} onChange={handleChange} onClear={handleClear} />;
};

export default MColorPicker;
