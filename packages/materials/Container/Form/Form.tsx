import { Form } from 'antd';
import { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import MarsRender from '@materials/MarsRender/MarsRender';
import { FormContext } from '@materials/utils/context';
import { usePageStore } from '@materials/stores/pageStore';
import { ComponentType } from '@materials/types';
import { dateFormat, getDateByType, getDateRangeByType, isNotEmpty } from '@materials/utils/util';
import dayjs from 'dayjs';
/**
 *
 * @param props 组件本身属性
 * @param style 组件样式
 * @param attr 组件其它属性，比如：id、type、className
 * @returns
 */
const MForm = ({ id, config, elements, onFinish, onChange }: ComponentType, ref: any) => {
  const [form] = Form.useForm();
  const { formData, setFormData } = usePageStore(
    useShallow((state) => {
      return {
        formData: state.page.pageData.formData,
        setFormData: state.setFormData,
      };
    }),
  );
  const [visible, setVisible] = useState(true);
  const [initialValues, setInitialValues] = useState({});

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
      <FormContext.Provider value={{ initValues }}>
        <Form form={form} style={config.style} {...config.props} initialValues={initialValues} onFinish={handleFinish} onValuesChange={handleChange}>
          <MarsRender elements={elements} />
        </Form>
      </FormContext.Provider>
    )
  );
};
export default memo(forwardRef(MForm));
