import { Form, TreeSelect, Divider, Select, Input, FormInstance } from 'antd';
import { useEffect, useState } from 'react';
import { ComponentMethodParams, ComponentMethodType } from '@/packages/types';
import { usePageStore } from '@/stores/pageStore';
import styles from './index.module.less';
import VariableBind from '@/components/VariableBind/VariableBind';

/**
 * 调用各个组件暴露的方法
 * @returns
 */
const ComponentMethods = ({ form }: { form: FormInstance }) => {
  // 页面组件
  const state = usePageStore();

  const [methods, setMethods] = useState<ComponentMethodType[]>([]);
  const [methodParams, setMethodParams] = useState<ComponentMethodParams[]>([]);

  useEffect(() => {
    const target = form.getFieldValue('target');
    if (!target) return;
    const element = state.page.pageData.elementsMap[target];
    if (!element) return;
    setMethods(element.methods || []);
  }, [form?.getFieldValue('target')]);

  const handleChange = (value: string) => {
    const element = state.page.pageData.elementsMap[value];
    if (!element) return;
    setMethods(element.methods || []);
  };

  const update = (methodName?: string) => {
    form.setFieldValue('methodName', methodName);
  };

  const handleChangeMethod = (value: string) => {
    const targetMethod = methods.find((item) => item.name === value);
    if (!targetMethod) return;
    update(targetMethod?.title);
    setMethodParams(targetMethod?.params || []);
  };

  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>事件触发后，可以调用目标组件提供的方法，并自动传入参数。比如：表格的搜索、表单的提交、重置等。</p>
        <Divider />
      </div>
      <Form.Item label="目标组件" name={'target'} rules={[{ required: true, message: '请选择目标组件' }]}>
        <TreeSelect
          allowClear
          placeholder="请选择目标组件"
          treeDefaultExpandAll
          fieldNames={{ label: 'type', value: 'id', children: 'elements' }}
          treeData={state.page.pageData.elements}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item label="组件方法" name={'method'} rules={[{ required: true, message: '请选择调用的方法' }]}>
        <Select onChange={(val) => handleChangeMethod(val)} placeholder="请选择要调用的组件方法">
          {methods.map((item) => (
            <Select.Option key={item.name} value={item.name}>
              {item.title}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {methodParams.map((item, index) => (
        <Form.Item
          label={item.title}
          name={['params', item.name]}
          rules={[{ required: item.required || false, message: '请选择调用的方法' }]}
          key={'params' + index}
        >
          {item.type === 'select' ? <Select placeholder="请选择" options={item.options} /> : <VariableBind placeholder="参数值" />}
        </Form.Item>
      ))}

      <Form.Item label="方法名称" name={'methodName'} hidden>
        <Input />
      </Form.Item>
    </>
  );
};
export default ComponentMethods;
