import React, { useRef, useState } from 'react';
import { Button, Divider, Input, Select, Space } from 'antd';
import type { InputRef } from 'antd';

/**
 * 既能输入，又能选择
 * @returns
 */
const InputSelect: React.FC = ({ value, onChange, ...props }: any) => {
  const [items, setItems] = useState<Array<{ label: string; value: string | number }>>(props.options || []);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (name.trim() === '') return;
    if (items.find((item) => item.value === name)) return;
    setItems([...items, { label: name, value: name }]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      placeholder="请选择或者输入"
      allowClear
      {...props}
      value={value}
      onChange={onChange}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input placeholder="输入" ref={inputRef} value={name} onChange={onNameChange} onKeyDown={(e) => e.stopPropagation()} />
            <Button type="link" onClick={addItem}>
              添加
            </Button>
          </Space>
        </>
      )}
      options={items}
    />
  );
};

export default InputSelect;
