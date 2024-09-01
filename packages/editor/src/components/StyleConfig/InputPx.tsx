import { useEffect, useState } from 'react';
import { InputNumber, Select } from 'antd';
const { Option } = Select;
const InputPx = ({ value, onChange, ...props }: any) => {
  const [num, setNum] = useState<null | number | string>('');
  const [unit, setUnit] = useState<string>('px');

  useEffect(() => {
    const num = value?.toString().replace(/(px|%|vw|vh|rem|em)/, '');
    if (num) setNum(num);
  }, [value]);

  // 输入框改变
  const handleChange = (value: null | number | string) => {
    if (value) {
      setNum(value);
      onChange(value + unit);
    } else {
      setNum(null);
      onChange('');
    }
  };

  // 下拉框改变
  const handleSelect = (value: string) => {
    setUnit(value);
    if (num !== null && num !== '') onChange(num + value);
  };

  const selectAfter = (
    <Select defaultValue="px" onChange={handleSelect} size="small">
      <Option value="px">px</Option>
      <Option value="%">%</Option>
      <Option value="vw">vw</Option>
      <Option value="vh">vh</Option>
      <Option value="em">em</Option>
      <Option value="rem">rem</Option>
    </Select>
  );

  return <InputNumber placeholder="输入尺寸: 10" {...props} addonAfter={selectAfter} value={num} onChange={(val) => handleChange(val)} />;
};

export default InputPx;
