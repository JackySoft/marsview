import { Flex, Form, Input, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';
import MColorPicker from '../ColorPicker';

const Shadow = (props: any) => {
  const [type, setType] = useState('none');
  const [color, setColor] = useState('#000');
  const [x, setX] = useState('0');
  const [y, setY] = useState('0');
  const [blur, setBlur] = useState('0');
  const [spread, setSpread] = useState('0');
  useEffect(() => {
    const list = props.value?.split(' ');
    if (list && list.length > 0) {
      setColor(list[0] || '#000');
      setX(list[1] || '0px');
      setY(list[2] || '0px');
      setBlur(list[3] || '0px');
      setSpread(list[4] || '0px');
      setType(list[5] || '');
    }
  }, []);
  const handleChangeType = (value: string) => {
    setType(value);
    if (value === 'none') {
      props.onChange('none');
    } else {
      props.onChange(`${color} ${x} ${y} ${blur} ${spread} ${value}`);
    }
  };

  // 设置阴影值
  const handleChange = (condition: string, val: string) => {
    if (condition === 'color') {
      setColor(val);
      props.onChange(`${val} ${x} ${y} ${blur} ${spread} ${type}`);
    } else if (condition === 'x') {
      if (val === '') val = '0px';
      setX(val);
      props.onChange(`${color} ${val} ${y} ${blur} ${spread} ${type}`);
    } else if (condition === 'y') {
      if (val === '') val = '0px';
      setY(val);
      props.onChange(`${color} ${x} ${val} ${blur} ${spread} ${type}`);
    } else if (condition === 'blur') {
      if (val === '') val = '0px';
      setBlur(val);
      props.onChange(`${color} ${x} ${y} ${val} ${spread} ${type}`);
    } else if (condition === 'spread') {
      if (val === '') val = '0px';
      setSpread(val);
      props.onChange(`${color} ${x} ${y} ${blur} ${val} ${type}`);
    }
  };

  return (
    <>
      <Form.Item noStyle>
        <Radio.Group buttonStyle="solid" optionType="button" value={type} onChange={(e) => handleChangeType(e.target.value)}>
          <Radio value="none">无</Radio>
          <Radio value="">外阴影</Radio>
          <Radio value="Inset">内阴影</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="颜色" style={{ marginBlock: 14 }}>
        <MColorPicker showText allowClear value={color} onChange={(val: string) => handleChange('color', val)} />
      </Form.Item>
      <Flex gap={10}>
        <Form.Item label="X轴">
          <Input value={x} onChange={(e) => handleChange('x', e.target.value)} />
        </Form.Item>
        <Form.Item label="Y轴">
          <Input value={y} onChange={(e) => handleChange('y', e.target.value)} />
        </Form.Item>
      </Flex>
      <Flex gap={10} style={{ marginTop: -10, marginBottom: -24 }}>
        <Form.Item label="模糊">
          <Input value={blur} onChange={(e) => handleChange('blur', e.target.value)} />
        </Form.Item>
        <Form.Item label="扩展">
          <Input value={spread} onChange={(e) => handleChange('spread', e.target.value)} />
        </Form.Item>
      </Flex>
    </>
  );
};

export default Shadow;
