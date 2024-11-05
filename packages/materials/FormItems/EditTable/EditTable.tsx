import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { Table, Form, Input, InputNumber, Select, DatePicker, Switch, Space, Button } from 'antd';
import { ComponentType } from '@materials/types';
import { useFormContext } from '@materials/utils/context';
import * as util from '@materials/utils/util';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import { message } from '@materials/utils/AntdGlobal';
/**
 * 编辑表格
 */
function EditTable({ id, type, config }: ComponentType, ref: any) {
  const [visible, setVisible] = useState(true);

  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
    },
    hide() {
      setVisible(false);
    },
  }));

  return (
    visible && (
      <Form.Item {...config.props.formItem} data-id={id} data-type={type}>
        <TableForm config={config} />
      </Form.Item>
    )
  );
}

function TableForm({ config }: any) {
  const [data, setData] = useState<any[]>([]);
  const { form } = useFormContext();
  const initRow = useMemo(() => {
    const dataMap: { [key: string]: any } = { key: util.createId('key') };
    config.props.formWrap?.columns.map((item: any) => {
      if (util.isNotEmpty(item.defaultValue)) {
        if (item.type === 'date') {
          if (typeof item.defaultValue === 'string') {
            dataMap[item.dataIndex] = dayjs(item.defaultValue);
          } else {
            dataMap[item.dataIndex] = item.defaultValue;
          }
        } else if (item.type === 'select') {
          if (item.dataSource === 'static') {
            dataMap[item.dataIndex] = item.dataType === 'text' ? item.defaultValue : Number(item.defaultValue);
          } else {
            // 动态数据源，需要进一步解析变量
            dataMap[item.dataIndex] = util.renderFormula(item.options.value);
          }
        } else {
          dataMap[item.dataIndex] = item.defaultValue;
        }
      }
    });
    return dataMap;
  }, [config.props.formWrap?.columns]);

  useEffect(() => {
    // 通过Form组件init赋值后，就不用再次赋值
    const list = form?.getFieldValue(config.props.formItem.name);
    if (!list) {
      const initData = { ...initRow, key: util.createId('key') };
      form?.setFieldValue(config.props.formItem.name, [initData]);
      setData(() => [initData]);
    } else if (list.length !== data.length) {
      setData(() => [...list.map((item: any) => ({ ...initRow, key: item.id || util.createId('key') }))]);
    }
  }, [form?.getFieldValue(config.props.formItem?.name)]);

  // 新增数据
  const handleAdd = (index: number) => {
    if (!config.props.formItem.name) return message.error('请配置name字段');
    const list = form?.getFieldsValue()?.[config.props.formItem.name] || [];
    list.splice(index + 1, 0, { ...initRow, key: util.createId('key') });
    form?.setFieldValue(config.props.formItem.name, [...list]);
    setData(() => [...list.map((item: any) => ({ ...item, key: item.key || item.id || util.createId('key') }))]);
  };

  // 删除数据
  const handleRemove = (index: number) => {
    const list = form?.getFieldsValue()?.[config.props.formItem.name] || [];
    list.splice(index, 1);
    form?.setFieldValue(config.props.formItem.name, [...list]);
    setData(() => [...list]);
  };
  // 表格配置
  const tableProps = useMemo(
    () => ({
      ...config.props.formWrap,
      rowKey: 'key',
      columns: config.props.formWrap?.columns
        .map((item: any, index: number) => {
          const rules: any = [];
          item.formItem?.rules?.map((item: any) => {
            const rule = { ...item };
            if (item.pattern) rule.pattern = new RegExp(item.pattern);
            rules.push(rule);
          });
          return {
            ...item,
            key: item.dataIndex || index,
            render(text: any, record: any, index: number) {
              if (item.type === 'label') return text;
              if (item.type === 'text')
                return (
                  <Form.Item style={{ margin: 0 }} name={[config.props.formItem.name, index, item.dataIndex]} colon={false} label=" " rules={rules}>
                    <Input placeholder={item.placeholder} style={{ width: '100%' }} />
                  </Form.Item>
                );
              if (item.type === 'number')
                return (
                  <Form.Item style={{ margin: 0 }} name={[config.props.formItem.name, index, item.dataIndex]} colon={false} label=" " rules={rules}>
                    <InputNumber placeholder={item.placeholder} style={{ width: '100%' }} />
                  </Form.Item>
                );
              if (item.type === 'select') {
                let options: Array<{ label: string; value: number | string }> = [];
                // 动态数据源，需要进一步解析变量
                if (item.dataSource === 'dynamic') {
                  options = util.renderFormula(item.options.value) || [];
                  // 下拉框数据结构为label-value，需要进一步处理
                  if (Array.isArray(options) && item.field.label && item.field.value) {
                    options = options.map((option: any) => {
                      return { label: option[item.field.label], value: option[item.field.value] };
                    });
                  }
                } else {
                  options = item.options || [];
                }
                return (
                  <Form.Item style={{ margin: 0 }} name={[config.props.formItem.name, index, item.dataIndex]} colon={false} label=" " rules={rules}>
                    <Select placeholder={item.placeholder} options={options || []} mode={item.mode} style={{ width: '100%' }}></Select>
                  </Form.Item>
                );
              }

              if (item.type === 'date')
                return (
                  <Form.Item style={{ margin: 0 }} name={[config.props.formItem.name, index, item.dataIndex]} colon={false} label=" " rules={rules}>
                    <DatePicker placeholder={item.placeholder} format={item.format} style={{ width: '100%' }} />
                  </Form.Item>
                );
              if (item.type === 'switch') {
                return (
                  <Form.Item style={{ margin: 0 }} name={[config.props.formItem.name, index, item.dataIndex]} colon={false} label=" " rules={rules}>
                    <Switch />
                  </Form.Item>
                );
              }
            },
          };
        })
        .concat([
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render(text: any, record: any, index: number) {
              return (
                <Space>
                  <a onClick={() => handleAdd(index)}>添加</a>
                  <a onClick={() => handleRemove(index)}>删除</a>
                </Space>
              );
            },
          },
        ]),
      dataSource: data,
    }),
    [data, config.props.formWrap?.columns],
  );
  return (
    <>
      <Table {...tableProps} pagination={false} scroll={{ x: tableProps.scroll?.x, y: tableProps.scroll?.y }} />
      <Button type="dashed" block icon={<PlusOutlined />} style={{ marginTop: 10 }} onClick={() => handleAdd(data.length)}>
        增加一行
      </Button>
    </>
  );
}

export default forwardRef(EditTable);
