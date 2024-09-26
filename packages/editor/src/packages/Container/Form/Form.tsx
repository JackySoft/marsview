import { ComponentType, IDragTargetItem } from '@/packages/types';
import { Form } from 'antd';
import { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useShallow } from 'zustand/react/shallow';
import * as Components from '@/packages/index';
import MarsRender from '@/packages/MarsRender/MarsRender';
import { usePageStore } from '@/stores/pageStore';
import { FormContext } from '@/packages/utils/context';
import { dateFormat } from '@/packages/utils/util';
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @param attr 组件其它属性，比如：id、type、className
 * @returns
 */
const MForm = ({ id, type, config, elements, onFinish, onChange }: ComponentType, ref: any) => {
  const [form] = Form.useForm();
  const { addChildElements, formData, setFormData } = usePageStore(
    useShallow((state) => ({
      addChildElements: state.addChildElements,
      formData: state.page.formData,
      setFormData: state.setFormData,
    })),
  );

  const [visible, setVisible] = useState(true);

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
  const handleFinish = (values: any) => {
    onFinish?.(dateFormat(elements, values));
  };
  // 监听表单值变化
  const handleChange = (_: any, allValues: any) => {
    const values = dateFormat(elements, allValues);
    onChange?.(values);
    setFormData({
      name: id,
      value: values,
    });
  };
  // 对外暴露重置和获取值方法
  useImperativeHandle(ref, () => {
    return {
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
      async validate() {
        try {
          await form.validateFields();
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
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
    };
  });
  return (
    visible && (
      <FormContext.Provider value={{ form, formId: id, setFormData }}>
        <div ref={drop}>
          <Form
            form={form}
            style={config.style}
            {...config.props}
            data-id={id}
            data-type={type}
            onFinish={handleFinish}
            onValuesChange={handleChange}
          >
            {elements.length ? (
              <MarsRender elements={elements} />
            ) : (
              <div className="slots" style={{ lineHeight: '150px' }}>
                拖拽表单组件到这里
              </div>
            )}
          </Form>
        </div>
      </FormContext.Provider>
    )
  );
};
export default memo(forwardRef(MForm));
