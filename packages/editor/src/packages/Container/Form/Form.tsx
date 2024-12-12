import { ComponentType, IDragTargetItem } from '@/packages/types';
import { Form } from 'antd';
import { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useShallow } from 'zustand/react/shallow';
import { getComponent } from '@/packages/index';
import MarsRender from '@/packages/MarsRender/MarsRender';
import { usePageStore } from '@/stores/pageStore';
import { FormContext } from '@/packages/utils/context';
import { dateFormat, getDateByType, getDateRangeByType, isNotEmpty } from '@/packages/utils/util';
import dayjs from 'dayjs';
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
      formData: state.page.pageData.formData,
      setFormData: state.setFormData,
    })),
  );

  const [visible, setVisible] = useState(true);
  const [initialValues, setInitialValues] = useState({});

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
        setFormData({
          name: id,
          value: form.getFieldsValue(),
          type: 'override',
        });
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
        form.setFieldsValue({ ...initData });
        setFormData({
          name: id,
          value: { ...initData },
          type: 'override',
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
        <div ref={drop}>
          <Form
            form={form}
            style={config.style}
            {...config.props}
            data-id={id}
            data-type={type}
            initialValues={initialValues}
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
