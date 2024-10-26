import React, { useState, useMemo } from 'react';
import { Segmented, Select } from 'antd';
import * as icons from '@ant-design/icons';
import { styled } from 'styled-components';

const BoxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 300px;
  overflow: auto;
`;

const IconItem = styled.div`
  width: 50px;
  height: 50px;
  padding: 10px;
  cursor: pointer;
`;
/**
 * 菜单中，自定义图标选择列表
 */
export default function CustomIconOptions({ value, onChange }: any) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('线框风格');

  const allList = useMemo(() => {
    // 获取所有的antd图标，动态渲染到下拉框中
    const iconsList: { [key: string]: any } = icons;

    return Object.keys(icons)
      .filter((item) => !['default', 'createFromIconfontCN', 'getTwoToneColor', 'setTwoToneColor', 'IconProvider'].includes(item))
      .map((key) => ({ value: key, label: React.createElement(iconsList[key], { style: { fontSize: '24px', verticalAlign: 'middle' } }) }));
  }, []);

  // 过滤出不同风格的图标
  const outlined = useMemo(() => allList.filter((item) => item.value.includes('Outlined')), []);
  const filled = useMemo(() => allList.filter((item) => item.value.includes('Filled')), []);
  const twoTone = useMemo(() => allList.filter((item) => item.value.includes('TwoTone')), []);

  const options = useMemo(() => {
    switch (type) {
      case '线框风格':
        return outlined;
      case '实底风格':
        return filled;
      default:
        return twoTone;
    }
  }, [type]);
  return (
    <Select
      placeholder="请选择图标"
      allowClear
      value={value}
      open={open}
      options={options}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      onClear={() => onChange('')}
      dropdownRender={() => (
        <div>
          <Segmented options={['线框风格', '实底风格', '双色风格']} block value={type} onChange={setType}></Segmented>
          <BoxWrapper>
            {options.map((item) => {
              return (
                <IconItem
                  key={item.value}
                  onClick={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                >
                  {item.label}
                </IconItem>
              );
            })}
          </BoxWrapper>
        </div>
      )}
    />
  );
}
