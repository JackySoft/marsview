import { Input, Modal, Form, Col, Row, Select, Switch, Button, Card, InputNumber, Radio, Space, DatePicker, FormInstance } from 'antd';
import { useImperativeHandle, useState, MutableRefObject, memo } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { usePageStore } from '@/stores/pageStore';
import dayjs from 'dayjs';
import VariableBind from '@/components/VariableBind/VariableBind';
import RulesSetting from '@/packages/components/RulesSetting';

export interface IModalProp {
  columnRef: MutableRefObject<{ open: (index: number) => void } | undefined>;
  update: (vals: any, index: number) => void;
}
/**
 * 列设置
 */
const ColumnSetting = memo((props: IModalProp) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [form] = Form.useForm();

  const { selectedElement, elementsMap, editTableProps } = usePageStore((state) => ({
    selectedElement: state.selectedElement,
    elementsMap: state.page.pageData.elementsMap,
    editTableProps: state.editTableProps,
  }));

  // 暴露方法
  useImperativeHandle(props.columnRef, () => ({
    open(index: number) {
      const values = elementsMap[selectedElement?.id as string];
      const { defaultValue, ...defaultValues } = values.config.props.formWrap.columns[index];
      form.resetFields();
      form.setFieldsValue({
        align: 'center',
        fixed: '',
        type: 'text',
        mode: '',
        dataSource: 'static',
        dataType: 'number',
        defaultValue,
        ...defaultValues,
      });
      if (defaultValues.type === 'date' && defaultValue) {
        form.setFieldsValue({
          defaultValue: typeof defaultValue === 'string' ? dayjs(defaultValue) : defaultValue,
        });
      }
      setIndex(index);
      setVisible(true);
    },
  }));

  // 提交
  const handleOk = () => {
    form.validateFields().then(() => {
      const values = form.getFieldsValue();
      // 如果是数字类型，则将value转化为number
      if (values.dataType === 'number' && Array.isArray(values.options)) {
        values.options.map((item: any) => {
          item.value = isNaN(item.value) ? item.value : Number(item.value);
        });
      }
      // 更新操作列属性
      editTableProps({
        id: selectedElement?.id,
        type: 'formTable',
        index,
        props: { ...values, key: values.dataIndex || index },
      });
      props.update(values, index);
      setVisible(false);
    });
  };

  // 关闭
  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <Modal title="列设置" open={visible} onOk={handleOk} onCancel={handleCancel} width={800}>
      <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Card title="基础配置" size="small">
          <Row>
            <Col span={12}>
              <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入列名' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="字段" name="dataIndex" rules={[{ required: true, message: '请输入字段名称' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="宽度" name="width">
                <InputNumber placeholder="eg: 100" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="对齐" name="align">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="left">居左</Radio.Button>
                  <Radio.Button value="center">居中</Radio.Button>
                  <Radio.Button value="right">居右</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="固定" name="fixed">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="">默认</Radio.Button>
                  <Radio.Button value="left">居左</Radio.Button>
                  <Radio.Button value="right">居右</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="列类型" name="type">
                <Select>
                  <Select.Option value="label">静态文本</Select.Option>
                  <Select.Option value="text">文本输入框</Select.Option>
                  <Select.Option value="number">数字输入框</Select.Option>
                  <Select.Option value="date">日期选择框</Select.Option>
                  <Select.Option value="select">下拉选择框</Select.Option>
                  <Select.Option value="switch">开关选择</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Form.Item noStyle shouldUpdate>
          {(form: FormInstance) => {
            const type = form.getFieldValue('type');
            return (
              type !== 'label' && (
                <Card title="表单配置" style={{ marginTop: 20 }} size="small">
                  <Form.Item label="默认值" name="defaultValue" labelCol={{ span: 4 }}>
                    {(type === 'text' || type === 'select') && <Input placeholder="请输入默认值" />}
                    {type === 'number' && <InputNumber placeholder="请输入默认值" style={{ width: '100%' }} />}
                    {type === 'date' && <DatePicker placeholder="请选择日期" format="YYYY-MM-DD" />}
                    {type === 'switch' && <Switch />}
                  </Form.Item>
                  {type !== 'switch' && (
                    <Form.Item label="提示信息" name="placeholder" labelCol={{ span: 4 }}>
                      <Input placeholder="请输入提示信息" />
                    </Form.Item>
                  )}
                  {type === 'select' ? (
                    <>
                      <Form.Item label="包含Label" name={['labelInValue']} labelCol={{ span: 4 }} tooltip="提交时，选中的值包含Label和value">
                        <Switch />
                      </Form.Item>
                      <Form.Item label="选项模式" name="mode" labelCol={{ span: 4 }}>
                        <Radio.Group buttonStyle="solid">
                          <Radio.Button value="">单选</Radio.Button>
                          <Radio.Button value="multiple">多选</Radio.Button>
                          <Radio.Button value="tags">标签</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                        label="数据源类型"
                        name="dataSource"
                        labelCol={{ span: 4 }}
                        tooltip="下拉框的数据来源，静态数据需要手动添加，动态数据可以选择绑定变量。"
                      >
                        <Radio.Group buttonStyle="solid">
                          <Radio.Button value="static">静态数据</Radio.Button>
                          <Radio.Button value="dynamic">动态数据</Radio.Button>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item
                        name={['dataType']}
                        label="数据类型"
                        labelCol={{ span: 4 }}
                        tooltip="下拉选项值(value)对应的类型，当前可选：文本和数字"
                      >
                        <Select
                          placeholder="请选择数据类型"
                          options={[
                            { label: '数字', value: 'number' },
                            { label: '文本', value: 'text' },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item noStyle shouldUpdate>
                        {(form: any) => {
                          const dataSource = form.getFieldValue('dataSource');
                          return dataSource === 'static' ? (
                            <Form.Item label="选项" labelCol={{ span: 4 }}>
                              <Form.List name={['options']}>
                                {(fields, { add, remove }) => (
                                  <>
                                    {fields.map(({ key, name, ...restField }) => (
                                      <Space key={key} style={{ display: 'flex' }} align="baseline">
                                        <Form.Item {...restField} wrapperCol={{ span: 22 }} name={[name, 'label']}>
                                          <Input placeholder="请输入显示的文本" />
                                        </Form.Item>
                                        <Form.Item {...restField} wrapperCol={{ span: 22 }} name={[name, 'value']} shouldUpdate>
                                          <Input placeholder="请输入对应的值" />
                                        </Form.Item>
                                        <PlusOutlined onClick={() => add({ label: '', value: '' }, name + 1)} />
                                        <MinusOutlined onClick={() => remove(name)} />
                                      </Space>
                                    ))}
                                    <Button block type="primary" onClick={() => add({ label: '', value: '' })}>
                                      增加一行
                                    </Button>
                                  </>
                                )}
                              </Form.List>
                            </Form.Item>
                          ) : (
                            <>
                              <Form.Item name={['options']} label="选项" labelCol={{ span: 4 }}>
                                <VariableBind readOnly placeholder="请选择一个动态变量" />
                              </Form.Item>
                              <Form.Item
                                label="字段映射(label)"
                                name={['field', 'label']}
                                labelCol={{ span: 4 }}
                                extra="变量返回的数据可能不是[{label:'',value:''}]结构，因此需要做映射。"
                              >
                                <Input placeholder="请输入变量中对应的label字段" />
                              </Form.Item>
                              <Form.Item label="字段映射(value)" name={['field', 'value']} labelCol={{ span: 4 }}>
                                <Input placeholder="请输入变量中对应的value字段" />
                              </Form.Item>
                            </>
                          );
                        }}
                      </Form.Item>
                    </>
                  ) : null}
                  {type === 'date' && (
                    <Form.Item label="日期格式" name="format" labelCol={{ span: 4 }}>
                      <Select
                        options={[
                          { label: '年-月-日', value: 'YYYY-MM-DD' },
                          { label: '年-月-日 23:59:59', value: 'YYYY-MM-DD 23:59:59' },
                        ]}
                      />
                    </Form.Item>
                  )}
                  <Form.Item labelCol={{ span: 4 }} label="表单验证">
                    <RulesSetting key="rule-list" form={form} labelSpan={5} />
                  </Form.Item>
                </Card>
              )
            );
          }}
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default ColumnSetting;
