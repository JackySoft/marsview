import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { memo } from 'react';

export default memo(function DynamicItemSetting({ labelSpan }: { labelSpan?: number }) {
  return (
    <Form name="dynamic_form_item">
      <Form.List
        name="names"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 2) {
                return Promise.reject(new Error('At least 2 passengers'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                layout={'vertical'}
                labelCol={{ span: labelSpan || 8 }}
                wrapperCol={{ span: 18 }}
                label={`配置项${index + 1}`}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  // labelCol={{ span: labelSpan || 8 }}
                  // wrapperCol={{ span: 14 }}
                  label="标签名称"
                  labelCol={{ span: labelSpan || 8 }}
                  wrapperCol={{ span: 16 }}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="passenger name" />
                </Form.Item>
                {/* <Form.Item
                  {...field}
                  labelCol={{ span: labelSpan || 8 }}
                  wrapperCol={{ span: 14 }}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="passenger name" style={{ width: '60%' }} />
                </Form.Item>
                <Form.Item
                  {...field}
                  labelCol={{ span: labelSpan || 8 }}
                  wrapperCol={{ span: 14 }}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input passenger's name or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="passenger name" style={{ width: '60%' }} />
                </Form.Item> */}
                {fields.length > 1 ? <DeleteOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} /> : null}
              </Form.Item>
            ))}
            {/* <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Add field
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item> */}
          </>
        )}
      </Form.List>
    </Form>
  );
});
