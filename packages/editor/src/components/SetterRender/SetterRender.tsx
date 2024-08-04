import { SchemaType } from '@/packages/types';
import { CaretDownOutlined } from '@ant-design/icons/lib';
import { Form, Input, InputNumber, Radio, Select, Switch, Slider, FormInstance } from 'antd';
import { memo } from 'react';
import MColorPicker from '../ColorPicker';
import VariableBindInput from '../VariableBind/VariableBind';
import styles from './index.module.less';
import InputSelect from '../InputSelect/InputSelect';
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
