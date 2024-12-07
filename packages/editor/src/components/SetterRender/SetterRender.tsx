import React, { memo } from 'react';
import { Form, Input, InputNumber, Radio, Select, Switch, Slider, FormInstance, Tooltip, Popover } from 'antd';
import * as icons from '@ant-design/icons';
import { QuestionCircleOutlined, CaretDownOutlined } from '@ant-design/icons';
import { SchemaType } from '@/packages/types';
import MColorPicker from '../ColorPicker';
import VariableBindInput from '../VariableBind/VariableBind';
import InputSelect from '../InputSelect/InputSelect';
import InputPx from '../StyleConfig/InputPx';
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
          if (item.popover) {
            return (
              <Popover title={item.popover?.title} content={item.popover.content} placement={item.popover.placement || 'left'} key={key}>
                <h2 className={styles.title}>
                  <span style={{ marginRight: 10 }}>{item.label}</span>
                  <QuestionCircleOutlined />
                </h2>
              </Popover>
            );
          }
          return (
            <h2 className={styles.title} key={key}>
              <span style={{ marginRight: 10 }}>{item.label}</span>
              {/* 标题增加提示信息 */}
              {item.tooltip ? <Tooltip title={item.tooltip}>{<QuestionCircleOutlined />}</Tooltip> : null}

              {/* 标题增加跳转链接 */}
              {item.link ? (
                <a href={item.link.url} target="_blank" style={{ fontSize: 12 }}>
                  {item.link.label}
                </a>
              ) : null}
            </h2>
          );
        } else if (item.type == 'Input') {
          FormControl = <Input {...item.props} />;
        } else if (item.type === 'InputPx') {
          FormControl = <InputPx {...item.props} />;
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
      {/* 公共属性 */}
      <h2 className={styles.title} key="visibleTitle">
        <span style={{ marginRight: 10 }}>组件显隐</span>
      </h2>
      <Form.Item key="showOrHide" name="showOrHide" label="显示条件">
        <VariableBindInput />
      </Form.Item>
    </>
  );
});

export default SetterRender;
