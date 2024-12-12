import { forwardRef, useEffect, useImperativeHandle, memo, useRef, useState, useCallback } from 'react';
import { Button, Form, Space } from 'antd';
import { useDrop } from 'react-dnd';
import { DownOutlined, UpOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons';
import { omit } from 'lodash-es';
import styled from 'styled-components';
import MarsRender from '@/packages/MarsRender/MarsRender';
import { usePageStore } from '@/stores/pageStore';
import { FormContext } from '@/packages/utils/context';
import { dateFormat, getDateByType, getDateRangeByType, isNotEmpty } from '../../utils/util';
import { getComponent } from '@/packages/index';
import { ComponentType, IDragTargetItem } from '@/packages/types';
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

  const { addChildElements, updateToolbar, formData, setFormData } = usePageStore((state) => ({
    addChildElements: state.addChildElements,
    updateToolbar: state.updateToolbar,
    formData: state.page.pageData.formData,
    setFormData: state.setFormData,
  }));

  // 拖拽接收
  const [, drop] = useDrop({
    accept: 'MENU_ITEM',
    async drop(item: IDragTargetItem, monitor) {
      if (monitor.didDrop()) return;
      // 生成默认配置
      const { config, events, methods = [] }: any = (await getComponent(item.type + 'Config'))?.default || {};
      addChildElements({
        type: item.type,
        name: item.name,
        parentId: id,
        id: item.id,
        config,
        events,
        methods,
      });
    },
    // TODO: 拖拽组件时，容器呈现背景色（后期需要判断组件是否可以拖入）
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

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

  useEffect(() => {
    if (formRef.current) {
      drop(formRef.current);
    }
  }, [formRef]);

  // 展开收起
  const toggleExpand = () => {
    setIsExpand(!isExpand);
    updateToolbar();
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
      <FormContext.Provider value={{ form, initValues }}>
        <Form
          form={form}
          style={config.style}
          {...omit(config.props, 'cols')}
          initialValues={initialValues}
          onValuesChange={handleValuesChange}
          data-id={id}
          data-type={type}
        >
          <DivWrapper $len={len} $minWidth={minWidth} ref={formRef}>
            {elements.length ? (
              <MarsRender elements={elements} />
            ) : (
              <div>
                <div className="slots">拖拽表单组件到这里</div>
              </div>
            )}
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
