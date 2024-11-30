import { useEffect, useState } from 'react';
import { InputNumber, Select } from 'antd';
const { Option } = Select;
const InputPx = ({ value, onChange, ...props }: any) => {
  const [num, setNum] = useState<null | number | string>('');
  const [unit, setUnit] = useState<string>('px');

  useEffect(() => {
    const val = value?.toString();
    const num = val?.replace(/(px|%|vw|vh|em|rem|auto)/, '');
    if (num) setNum(num);
    const reg = new RegExp('(px|%|vw|vh|em|rem|auto)');
    const unit = val?.match(reg);
    if (unit) setUnit(unit[0]);
  }, [value]);

  // 输入框改变
  const handleChange = (value: null | number | string) => {
    if (value || value === 0) {
      setNum(value);
      onChange(unit === 'auto' ? unit : value + unit);
    } else {
      setNum(null);
      onChange('auto');
    }
  };

  // 下拉框改变
  const handleSelect = (value: string) => {
    setUnit(value);
    if (num !== null && num !== '') onChange(num + value);
    if (value === 'auto') onChange(value);
  };

  const selectAfter = (
    <Select defaultValue="px" value={unit} onChange={handleSelect} size="small" style={{ width: 60 }}>
      <Option value="px">px</Option>
      <Option value="%">%</Option>
      <Option value="vw">vw</Option>
      <Option value="vh">vh</Option>
      <Option value="em">em</Option>
      <Option value="rem">rem</Option>
      <Option value="auto">auto</Option>
    </Select>
  );

  return (
    <InputNumber
      placeholder="输入尺寸: 10"
      {...props}
      addonAfter={selectAfter}
      value={num}
      controls={false}
      onChange={(val) => handleChange(val)}
      style={{ width: '100%' }}
    />
  );
};

export default InputPx;
