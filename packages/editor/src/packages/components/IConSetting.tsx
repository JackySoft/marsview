import React from 'react';
import { Form, Select } from 'antd';
import * as icons from '@ant-design/icons';

/**
 * 公共图标设置
 */
export default function IConSetting({ name = 'icon' }: { name?: string | string[] }) {
  // 获取所有的antd图标，动态渲染到下拉框中
  const iconsList: { [key: string]: any } = icons;
  return (
    <Form.Item label="按钮图标" name={name}>
      <Select placeholder="请选择菜单图表" showSearch allowClear>
        {Object.keys(icons)
          .filter((item) => !['default', 'createFromIconfontCN', 'getTwoToneColor', 'setTwoToneColor', 'IconProvider'].includes(item))
          .map((key) => {
            return (
              <Select.Option value={key} key={key}>
                {React.createElement(iconsList[key], {
                  style: {
                    fontSize: '18px',
                    verticalAlign: 'middle',
                  },
                })}
              </Select.Option>
            );
          })}
      </Select>
    </Form.Item>
  );
}
