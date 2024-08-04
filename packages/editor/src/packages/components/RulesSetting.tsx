import { memo } from 'react';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Dropdown, Form, Input, InputNumber, Switch } from 'antd';
import type { FormInstance, MenuProps } from 'antd';
/**
 * 给表单添加统一的校验规则
 */
const RulesSetting = memo(({ form, labelSpan }: { form: FormInstance; labelSpan?: number }) => {
  const items: MenuProps['items'] = [
    {
      key: 'required',
      label: '必填校验',
    },
    {
      key: 'length',
      label: '长度校验',
    },
    {
      key: 'phone',
      label: '手机号校验',
    },
    {
      key: 'email',
      label: '邮箱校验',
    },
    {
      key: 'idCard',
      label: '身份证号码校验',
    },
    {
      key: 'site',
      label: '网址校验',
    },
    {
      key: 'word',
      label: '纯字母校验',
    },
    {
      key: 'number',
      label: '纯数字校验',
    },
    {
      key: 'chinese',
      label: '纯中文校验',
    },
    {
      key: 'wordAndNumber',
      label: '字母和数字校验',
    },
    {
      key: 'numberMoney',
      label: '金额校验(无小数)',
    },
    {
      key: 'floatMoney',
      label: '金额校验(两位小数)',
    },
    {
      key: 'pattern',
      label: '自定义正则',
    },
  ];
  return (
    <>
      <Form.List name={['formItem', 'rules']}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Form.Item noStyle key={'rules' + key}>
                <div style={{ position: 'relative', backgroundColor: '#f5f5f5', paddingBlock: 10, marginBottom: 10 }}>
                  {/* 必填规则 */}
                  {form.getFieldValue(['formItem', 'rules', name, 'required']) && (
                    <Form.Item labelCol={{ span: labelSpan || 8 }} wrapperCol={{ span: 10 }} name={[name, 'required']} label="必填规则">
                      <Switch />
                    </Form.Item>
                  )}
                  {/* 长度规则 */}
                  {form.getFieldValue(['formItem', 'rules', name, 'min']) && (
                    <>
                      <Form.Item labelCol={{ span: labelSpan || 8 }} wrapperCol={{ span: 14 }} name={[name, 'min']} label="最小长度">
                        <InputNumber placeholder="最小长度" />
                      </Form.Item>
                      <Form.Item labelCol={{ span: labelSpan || 8 }} wrapperCol={{ span: 14 }} name={[name, 'max']} label="最大长度">
                        <InputNumber placeholder="最大长度" />
                      </Form.Item>
                    </>
                  )}
                  {/* 自定义规则 */}
                  {form.getFieldValue(['formItem', 'rules', name, 'key']) && (
                    <Form.Item labelCol={{ span: labelSpan || 8 }} wrapperCol={{ span: 14 }} name={[name, 'pattern']} label="校验规则">
                      <Input placeholder="eg: ^[0-9]+$" />
                    </Form.Item>
                  )}
                  <Form.Item labelCol={{ span: labelSpan || 8 }} wrapperCol={{ span: 14 }} name={[name, 'message']} label="错误提示">
                    <Input placeholder="错误提示" style={{ width: '100%' }} />
                  </Form.Item>
                  <DeleteOutlined onClick={() => remove(name)} style={{ position: 'absolute', top: 10, right: 8, color: 'red' }} />
                </div>
              </Form.Item>
            ))}
            <Dropdown
              menu={{
                items,
                onClick: ({ key }) => {
                  if (key === 'required') {
                    add({ required: true, message: '请输入内容' }, fields.length);
                  } else if (key === 'length') {
                    add({ min: 1, max: 20, message: '最小长度为1，最大长度为20' }, fields.length);
                  } else if (key === 'phone') {
                    add({ key: 'phone', pattern: '^1[3456789]\\d{9}$', message: '请输入正确的手机号' }, fields.length);
                  } else if (key === 'email') {
                    add({ key: 'email', pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\\.[a-zA-Z0-9_-]+$', message: '请输入正确的邮箱' }, fields.length);
                  } else if (key === 'idCard') {
                    add(
                      {
                        key: 'idCard',
                        pattern: '^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$',
                        message: '请输入正确的身份证号码',
                      },
                      fields.length,
                    );
                  } else if (key === 'site') {
                    add({ key: 'site', pattern: '^https?:\\/\\/.*(\\.).*$', message: '请输入正确的网址' }, fields.length);
                  } else if (key === 'word') {
                    add({ key: 'word', pattern: '^[a-zA-Z]+$', message: '只能输入英文单词' }, fields.length);
                  } else if (key === 'number') {
                    add({ key: 'number', pattern: '^[0-9]+$', message: '只能输入数字' }, fields.length);
                  } else if (key === 'chinese') {
                    add({ key: 'chinese', pattern: '^[\u4e00-\u9fa5]+$', message: '只能输入中文' }, fields.length);
                  } else if (key === 'wordAndNumber') {
                    add({ key: 'wordAndNumber', pattern: '^[a-zA-Z0-9]+$', message: '只能输入英文和数字' }, fields.length);
                  } else if (key === 'numberMoney') {
                    add({ key: 'numberMoney', pattern: '^(0|[1-9]\\d+)$', message: '请输入正整数' }, fields.length);
                  } else if (key === 'floatMoney') {
                    add({ key: 'floatMoney', pattern: '^(0|[1-9]\\d+(\\.\\d{2})?)$', message: '请输入正确的金额，保留2位小数' }, fields.length);
                  } else if (key === 'pattern') {
                    add({ key: 'pattern', pattern: '', message: '请输入' }, fields.length);
                  }
                },
              }}
            >
              <a onClick={(e) => e.preventDefault()} style={{ display: 'block', textAlign: 'center' }}>
                <PlusOutlined /> 添加规则
              </a>
            </Dropdown>
          </>
        )}
      </Form.List>
    </>
  );
});
export default RulesSetting;
