import React, { memo } from 'react';
import { Form, Input, InputNumber, Radio, Select, Switch, Slider, FormInstance } from 'antd';
import * as icons from '@ant-design/icons';
import { SchemaType } from '@/packages/types';
import { CaretDownOutlined } from '@ant-design/icons/lib';
import MColorPicker from '../ColorPicker';
import VariableBindInput from '../VariableBind/VariableBind';
import InputSelect from '../InputSelect/InputSelect';
import styles from './index.module.less';

// 如果没有设置label，则独占一行
const formLayoutFull = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};
interface IAttrs {
  attrs: SchemaType[];
  form: FormInstance;
}
/**
 * 属性设置器
 * 根据JSON生成简单的属性配置
 */
const SetterRender = memo(({ attrs, form }: IAttrs) => {
  if (attrs.length === 0) return <></>;
  // 根据type枚举
  return (
    <>
      {attrs.map((item: SchemaType, index) => {
        if (!item) return;
        const key = item.key || item.name?.toString() || item.label?.toString() + index.toString();
        let FormControl = <></>;
        if (item.type == 'Title') {
          return (
            <h2 className={styles.title} key={key}>
              {item.label}
            </h2>
          );
        } else if (item.type == 'Input') {
          FormControl = <Input {...item.props} />;
        } else if (item.type == 'TextArea') {
          FormControl = <Input.TextArea rows={3} cols={8} {...item.props} />;
        } else if (item.type == 'InputSelect') {
          FormControl = <InputSelect {...item.props} />;
        } else if (item.type == 'Switch') {
          return (
            <Form.Item key={key} name={item.name} label={item.label} tooltip={item.tooltip} valuePropName="checked">
              <Switch />
            </Form.Item>
          );
        } else if (item.type == 'Select') {
          FormControl = <Select {...item.props} suffixIcon={<CaretDownOutlined />} />;
        } else if (item.type == 'Radio') {
          FormControl = <Radio.Group {...item.props} suffixIcon={<CaretDownOutlined />} />;
        } else if (item.type == 'InputNumber') {
          FormControl = <InputNumber {...item.props} style={{ width: '100%' }} />;
        } else if (item.type == 'RadioGroup') {
          FormControl = <Radio.Group {...item.props} />;
        } else if (item.type == 'ColorPicker') {
          FormControl = <MColorPicker {...item.props} format="hex" />;
        } else if (item.type == 'Slider') {
          FormControl = <Slider {...item.props} />;
        } else if (item.type === 'Variable') {
          FormControl = <VariableBindInput {...item.props} />;
        } else if (item.type === 'function') {
          return item.render?.(form);
        } else if (item.type === 'Icons') {
          // 获取所有的antd图标，动态渲染到下拉框中
          const iconsList: { [key: string]: any } = icons;
          FormControl = (
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
          );
        }
        return (
          <Form.Item key={key} name={item.name} label={item.label} tooltip={item.tooltip} {...(item.label ? null : formLayoutFull)}>
            {FormControl}
          </Form.Item>
        );
      })}
    </>
  );
});

export default SetterRender;
