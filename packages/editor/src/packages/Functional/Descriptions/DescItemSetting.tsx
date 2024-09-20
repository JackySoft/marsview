import { EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, FormInstance, Input, Space } from 'antd';
import { memo, useRef } from 'react';
import ColumnSetting from './ItemEdit';
/**
 * 描述列表配置
 */
const DescItemSetting = memo(({ form }: { form: FormInstance }) => {
  const columnRef = useRef<{ open: (index: number) => void }>();
  // 设置
  const handleOpen = (index: number) => {
    columnRef.current?.open(index);
  };
  // 更新
  const handleUpdate = (values: any, index: number) => {
    form.setFieldValue(['items', index], values);
  };
  return (
    <>
      <Form.List name={['items']}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8, padding: '0 10px' }} align="baseline">
                <Form.Item {...restField} wrapperCol={{ span: 22 }} name={[name, 'label']}>
                  <Input placeholder="项名称" />
                </Form.Item>
                <Form.Item {...restField} wrapperCol={{ span: 22 }} name={[name, 'name']}>
                  <Input placeholder="项字段" style={{ width: '100%' }} />
                </Form.Item>
                <EditOutlined onClick={() => handleOpen(name)} />
                <PlusOutlined onClick={() => add({ label: '-', name: `name${name + 1}`, span: 1 }, name + 1)} />
                <MinusOutlined onClick={() => remove(name)} />
              </Space>
            ))}
          </>
        )}
      </Form.List>
      <ColumnSetting columnRef={columnRef} update={handleUpdate} />
    </>
  );
});
export default DescItemSetting;
