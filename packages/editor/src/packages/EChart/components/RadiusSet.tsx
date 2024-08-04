import { Form, InputNumber, Space } from 'antd';
import { memo } from 'react';
export default memo(({ name = 'columnStyle' }: any) => {
  // 柱状图和条形图共用组件，通过name做动态设置
  const fieldName = [name, 'radius'];
  return (
    <Form.Item label="圆角">
      <Form.List name={fieldName}>
        {(fields) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ marginBottom: 8 }}>
                <Form.Item noStyle {...restField} name={[name]}>
                  <InputNumber />
                </Form.Item>
              </Space>
            ))}
          </>
        )}
      </Form.List>
    </Form.Item>
  );
});
