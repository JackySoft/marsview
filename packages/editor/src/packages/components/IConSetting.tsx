import React from 'react';
import { Form, Select } from 'antd';
import * as icons from '@ant-design/icons';
export const iconsList: { [key: string]: any } = icons;
/**
 * 公共图标设置
 */
export default function IConSetting({ name = 'icon', initalValue }: { name?: string | string[], initalValue?: string }) {
  // 获取所有的antd图标，动态渲染到下拉框中
  return (
    <Form.Item label="按钮图标" name={name} initialValue={initalValue}>
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
