import React, { memo } from 'react';
import { Button, Form, FormInstance, Input, Select, Switch } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import * as icons from '@ant-design/icons';
import { iconsList } from '../IConSetting';
import style from './index.module.less';

const formEnum = [
  {
    label: '标签名称',
    name: 'label',
    rules: [],
    initialValue: '',
    attrs: {},
    component: Input,
  },
  {
    label: '图标',
    name: 'icon',
    rules: [],
    attrs: {},
    render: () => (
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
    ),
  },
  {
    label: '是否危险',
    name: 'danger',
    rules: [],
    initialValue: false,
    valuePropName: 'checked',
    attrs: {},
    component: Switch,
  },
  {
    label: '禁用',
    name: 'disabled',
    rules: [],
    initialValue: false,
    valuePropName: 'checked',
    attrs: {},
    component: Switch,
  },
];

export default memo(function DynamicItemSetting({ name }: { form: FormInstance; labelSpan?: number; name: string }) {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item required={false} key={field.key} className={style.area_wrapper} wrapperCol={{ span: 24 }}>
              {formEnum.map((item, index) => (
                <Form.Item
                  {...field}
                  key={item.label + index}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 14 }}
                  name={[field.name, item.name]}
                  initialValue={item.initialValue}
                  label={item.label}
                  rules={item.rules}
                  valuePropName={item.valuePropName || 'value'}
                >
                  {item.render ? item.render() : <item.component {...item.attrs} />}
                </Form.Item>
              ))}
              <Form.Item {...field} noStyle name={[field.name, 'key']} initialValue={field.key} required={false}>
                <div></div>
              </Form.Item>
              <DeleteOutlined className={style.dynamic_delete_button} onClick={() => remove(field.name)} />
            </Form.Item>
          ))}
          <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
            <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} style={{ width: '100%' }}>
              新增Items属性项
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
});
