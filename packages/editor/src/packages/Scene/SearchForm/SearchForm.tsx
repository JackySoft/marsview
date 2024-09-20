import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Button, ButtonProps, Form, Space } from 'antd';
import { useDrop } from 'react-dnd';
import { ComponentType, IDragTargetItem } from '@/packages/types';
import * as Components from '@/packages/index';
import MarsRender from '@/packages/MarsRender/MarsRender';
import { DownOutlined, UpOutlined, SearchOutlined, RedoOutlined } from '@ant-design/icons';
import * as icons from '@ant-design/icons';
import { usePageStore } from '@/stores/pageStore';
import { FormContext } from '@/packages/utils/context';
import { dateFormat } from '../../utils/util';
import { handleActionFlow } from '@/packages/utils/action';
import styles from './index.module.less';
export interface IConfig {
  form: {
    submitText: string;
    resetText: string;
  };
  bulkActionList?: Array<ButtonProps & { text: string; eventName: string; icon: string }>;
}
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @param attr 组件其它属性，比如：id、type、className
 * @returns
 */
const SearchForm = ({ id, type, config, elements, onSearch, onChange, onReset }: ComponentType<IConfig>, ref: any) => {
  const [form] = Form.useForm();
  const emptyRef = useRef<HTMLDivElement>(null);
  const [isExpand, setIsExpand] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [visible, setVisible] = useState(true);

  const { addChildElements, updateToolbar, formData, setFormData } = usePageStore((state) => ({
    addChildElements: state.addChildElements,
    updateToolbar: state.updateToolbar,
    formData: state.page.formData,
    setFormData: state.setFormData,
  }));
  // 初始化表单值
  useEffect(() => {
    setTimeout(() => {
      // 判断是否显示更多按钮
      if ((emptyRef.current?.offsetTop as number) >= 32 && elements.length > 0) {
        setIsMore(true);
      } else {
        setIsMore(false);
      }
    }, 500);
  }, [elements]);

  // 拖拽接收
  const [, drop] = useDrop({
    accept: 'MENU_ITEM',
    drop(item: IDragTargetItem, monitor) {
      if (monitor.didDrop()) return;
      // 生成默认配置
      const { config, events, methods = [] }: any = Components[(item.type + 'Config') as keyof typeof Components] || {};
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
      });
    },
    getFormData(key: string) {
      if (key && typeof key === 'string') {
        return formData[id]?.[key];
      }
      return formData[id];
    },
  }));

  /**
   * 操作按钮点击
   */
  const handleOperate = (eventName: string) => {
    const values = form.getFieldsValue();
    const transformValue = dateFormat(elements, values);
    const btnEvent = config.events.find((event) => event.eventName === eventName);
    handleActionFlow(btnEvent?.actions, transformValue);
  };

  // 展开收起
  const toggleExpand = () => {
    setIsExpand(!isExpand);
    updateToolbar();
  };

  // 查询和重置按钮
  const { submitText, resetText } = config.props.form || {};
  // 批量操作按钮
  const bulkActionList = config.props.bulkActionList || [];

  const iconsList: { [key: string]: any } = icons;
  return (
    visible && (
      <FormContext.Provider value={form}>
        <Form form={form} layout="inline" style={config.style} data-id={id} data-type={type} onValuesChange={handleValuesChange}>
          <div className={styles.formWrap} ref={drop} style={!isExpand ? { height: 32, overflow: 'hidden' } : {}}>
            {elements.length ? <MarsRender elements={elements} /> : <div className="slots">拖拽表单组件到这里</div>}
            <div ref={emptyRef}></div>
          </div>
          <Space style={{ alignItems: 'baseline', marginLeft: 10 }}>
            {submitText ? (
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                {submitText}
              </Button>
            ) : null}

            {resetText ? (
              <Button type="default" icon={<RedoOutlined />} onClick={handleReset}>
                {resetText}
              </Button>
            ) : null}

            {bulkActionList.length > 0 && (
              <div className={styles.action}>
                {config.props.bulkActionList?.map((item, index) => {
                  return (
                    <Button
                      type={item.type}
                      danger={item.danger}
                      icon={item.icon ? React.createElement(iconsList[item.icon]) : null}
                      onClick={() => handleOperate(item.eventName)}
                      key={`bulkAction${index}`}
                    >
                      {item.text}
                    </Button>
                  );
                })}
              </div>
            )}
            {isMore && (
              <Button type="link" icon={isExpand ? <UpOutlined /> : <DownOutlined />} onClick={toggleExpand}>
                {isExpand ? '收起' : '展开'}
              </Button>
            )}
          </Space>
        </Form>
      </FormContext.Provider>
    )
  );
};
export default forwardRef(SearchForm);
