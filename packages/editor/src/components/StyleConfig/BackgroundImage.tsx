import { Input } from 'antd';
import { useEffect, useState } from 'react';

const BackgroundImage = (props: any) => {
  const [value, setValue] = useState('');
  useEffect(() => {
    if (props.value?.startsWith('url')) {
      setValue(props.value.replace('url(', '').replace(')', ''));
    }
  }, []);
  const handleChange = (value: string) => {
    if (value === '') {
      setValue('');
      props.onChange('');
      return;
    }
    if (value.startsWith('http')) {
      setValue(value);
      props.onChange(`url(${value})`);
    } else {
      setValue(`${value}`);
      props.onChange(value);
    }
  };

  return <Input value={value} onChange={(e) => handleChange(e.target.value)} placeholder="http://xxx.png" />;
};

export default BackgroundImage;
