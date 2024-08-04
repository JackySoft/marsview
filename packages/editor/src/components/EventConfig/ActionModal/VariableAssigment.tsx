import { Form, Select, Divider, Input, Radio, InputNumber, Switch, FormInstance } from 'antd';
import { usePageStore } from '@/stores/pageStore';
import styles from './index.module.less';
import { useEffect, useState } from 'react';
import VsEditor from '@/components/VsEditor';
import VariableBind from '@/components/VariableBind/VariableBind';
const VariableAssigment = ({ form }: { form: FormInstance }) => {
  const variables = usePageStore((state) => state.page.variables);
  const [dataType, setDataType] = useState('string');

  useEffect(() => {
    const variableType = form.getFieldValue('variableType');
    setDataType(variableType);
  }, []);

  // 设置数据类型
  const handleDataChange = (name: string) => {
    const dataType = variables.find((item) => item.name === name)?.type;
    setDataType(dataType);
    form.setFieldValue('variableType', dataType);
  };
  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>给页面全局变量动态赋值。页面中支持绑定动态变量的地方都可以使用此功能来添加动态值。</p>
        <Divider />
      </div>
      <Form.Item label="赋值类型" name="assigmentType">
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="assigment">变量赋值</Radio.Button>
          <Radio.Button value="reset">变量重置</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="选择变量" name="name" wrapperCol={{ span: 16 }} rules={[{ required: true, message: '请选择变量' }]}>
        <Select onChange={(val) => handleDataChange(val)}>
          {variables.map((item) => (
            <Select.Option key={item.name} value={item.name}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="数据类型" name="variableType" hidden>
        <Input />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {(form: FormInstance) => {
          const assigmentType = form.getFieldValue('assigmentType');
          if (assigmentType === 'assigment')
            return (
              <Form.Item
                label="赋值方式"
                name="assigmentWay"
                wrapperCol={{ span: 16 }}
                tooltip="动态赋值会默认接收上一个行为的数据作为变量值，比如上一个行为是接口请求"
                rules={[{ required: true, message: '请选择赋值方式' }]}
              >
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="static">静态赋值</Radio.Button>
                  <Radio.Button value="dynamic">动态赋值</Radio.Button>
                </Radio.Group>
              </Form.Item>
            );
        }}
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {(form: FormInstance) => {
          const { assigmentType, assigmentWay } = form.getFieldsValue();
          if (assigmentType === 'assigment' && assigmentWay === 'static')
            return (
              <Form.Item label="变量值" name="value" wrapperCol={{ span: 16 }} rules={[{ required: true, message: '请输入变量值' }]}>
                {/* {dataType === 'string' && <Input placeholder="请输入变量值" />} */}
                {/* {dataType === 'number' && <InputNumber placeholder="请输入变量值" style={{ width: '100%' }} />} */}
                {/* {dataType === 'boolean' && <Switch />} */}
                {dataType === 'string' || dataType === 'number' || dataType === 'boolean' ? <VariableBind /> : null}
                {(dataType === 'array' || dataType === 'object') && <VsEditor height="250px" language="json" />}
              </Form.Item>
            );
        }}
      </Form.Item>
    </>
  );
};
export default VariableAssigment;
