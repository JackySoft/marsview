import { forwardRef, useEffect, useImperativeHandle, memo, useRef, useState, useCallback } from 'react';
import { Button, Form, Space } from 'antd';
import { DownOutlined, UpOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { omit } from 'lodash-es';
import styled from 'styled-components';
import MarsRender from '@materials/MarsRender/MarsRender';
import { usePageStore } from '@materials/stores/pageStore';
import { FormContext } from '@materials/utils/context';
import { dateFormat, getDateByType, getDateRangeByType, isNotEmpty } from '@materials/utils/util';
import { ComponentType } from '@materials/types';
import dayjs from 'dayjs';

// 定义包裹容器
const DivWrapper: any = memo(styled.div<{ $minWidth: number; $len: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${(props) => props.$minWidth}px, 1fr));
  & {
    .ant-form-item:nth-child(n + ${(props) => props.$len}) {
      display: none;
    }
    .ant-form-item:last-child {
      display: block;
    }
  }
`);

/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @param attr 组件其它属性，比如：id、type、className
 * @returns
 */
const GridForm = ({ id, type, config, elements, onSearch, onChange, onReset }: ComponentType, ref: any) => {
  const [form] = Form.useForm();
  const [isExpand, setIsExpand] = useState(true);
  const [visible, setVisible] = useState(true);
  const [len, setlen] = useState(0);
  const [minWidth, setMinWidth] = useState(200);
  const [initialValues, setInitialValues] = useState({});
  const formRef = useRef<HTMLDivElement>(null);
  const formItemRef = useRef<HTMLDivElement>(null);

  const { formData, setFormData } = usePageStore((state) => ({
    formData: state.page.pageData.formData,
    setFormData: state.setFormData,
  }));

  // 提交表单
  const handleSearch = () => {
    const values = form.getFieldsValue();
    onSearch && onSearch(dateFormat(elements, values));
  };
  // 重置表单
  const handleReset = () => {
    form.resetFields();
    const values = form.getFieldsValue();
    onReset && onReset(dateFormat(elements, values));
    setFormData({
      name: id,
      value: values,
      type: 'override',
    });
  };

  // 监听表单值变化
  const handleValuesChange = (_: any, allValues: any) => {
    const values = dateFormat(elements, allValues);
    onChange?.(values);
    setFormData({
      name: id,
      value: values,
    });
  };

  // 暴露表单函数
  useImperativeHandle(ref, () => ({
    show() {
      setVisible(true);
    },
    hide() {
      setVisible(false);
    },
    reset() {
      form.resetFields();
      setFormData({
        name: id,
        value: form.getFieldsValue(),
        type: 'override',
      });
    },
    submit() {
      form.submit();
    },
    init(values: any = {}) {
      const initData = dateFormat(elements, values);
      form.setFieldsValue(initData);
      setFormData({
        name: id,
        value: initData,
        type: 'override',
      });
    },
    getFormData(key: string) {
      if (key && typeof key === 'string') {
        return formData[id]?.[key];
      }
      return formData[id];
    },
  }));

  // 控制显示表单个数
  useEffect(() => {
    const parentEl = formRef.current?.getBoundingClientRect();
    const subEl = formItemRef.current?.getBoundingClientRect();
    if (!parentEl || !subEl) return;
    // 计算可以放入的个数
    const count = config.props.cols;
    const minWidth = Math.floor(parentEl.width / count);
    setMinWidth(minWidth);
    if (!isExpand) {
      setlen(count);
    } else {
      setlen(elements.length + 1);
    }
  }, [elements, isExpand, config.props.cols]);

  // 展开收起
  const toggleExpand = () => {
    setIsExpand(!isExpand);
  };

  // 设置默认值
  const initValues = useCallback((type: string, name: string, value: any) => {
    if (name && isNotEmpty(value)) {
      let initValue = value;
      if (type === 'InputNumber') initValue = Number(value);
      if (type === 'DatePicker') initValue = getDateByType(value);
      if (type === 'DatePickerRange') initValue = getDateRangeByType(value);
      if (type === 'TimePicker') initValue = dayjs(value, 'HH:mm:ss');
      setInitialValues({ [name]: initValue });
      form.setFieldValue([name], initValue);
      setFormData({
        name: id,
        value: { [name]: initValue },
      });
    }
  }, []);

  return (
    visible && (
      <FormContext.Provider value={{ initValues }}>
        <Form
          form={form}
          style={config.style}
          {...omit(config.props, 'cols')}
          initialValues={initialValues}
          data-id={id}
          data-type={type}
          onValuesChange={handleValuesChange}
        >
          <DivWrapper $len={len} $minWidth={minWidth} ref={formRef}>
            {elements.length ? <MarsRender elements={elements} /> : null}
            <Form.Item {...config.props.formItem} wrapperCol={{ span: 24 }} style={{ textAlign: 'right', gridColumn: '-2/-1' }}>
              <Space ref={formItemRef} style={{ justifyContent: 'right', width: '100%' }}>
                <Button type="default" icon={<RedoOutlined />} onClick={handleReset}>
                  重置
                </Button>
                <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                  查询
                </Button>
                <Button type="link" icon={isExpand ? <UpOutlined /> : <DownOutlined />} onClick={toggleExpand}>
                  {isExpand ? '收起' : '展开'}
                </Button>
              </Space>
            </Form.Item>
          </DivWrapper>
        </Form>
      </FormContext.Provider>
    )
  );
};
export default forwardRef(GridForm);
