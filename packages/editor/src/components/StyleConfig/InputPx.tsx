import { useEffect, useState } from 'react';
import { InputNumber } from 'antd';

const InputPx = ({ value, onChange, ...props }: any) => {
  const [num, setNum] = useState<null | number | string>('');

  useEffect(() => {
    const num = value?.toString().replace('px', '');
    if (num) setNum(num);
  }, [value]);

  const handleChange = (value: null | number | string) => {
    if (value) {
      setNum(value);
      onChange(value + 'px');
    } else {
      setNum(null);
      onChange('');
    }
  };

  return <InputNumber placeholder="输入尺寸: 10" {...props} addonAfter="px" value={num} onChange={(val) => handleChange(val)} />;
};

export default InputPx;
