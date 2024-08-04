import { EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, FormInstance, Input, Space } from 'antd';
import { memo, useRef } from 'react';
import ColumnSetting from './ColumnSetting.tsx';
/**
 * 表格配置
 */
const TableSetting = memo(({ form }: { form: FormInstance }) => {
  const columnRef = useRef<{ open: (index: number) => void }>();
  // 设置
  const handleOpen = (index: number) => {
    columnRef.current?.open(index);
  };
  // 更新
  const handleUpdate = (vals: any, index: number) => {
    form.setFieldValue(['formWrap', 'columns', index], vals);
  };
  return (
    <>
      <Form.List name={['formWrap', 'columns']}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8, padding: '0 10px' }} align="baseline">
                <Form.Item {...restField} wrapperCol={{ span: 22 }} name={[name, 'title']}>
                  <Input placeholder="列名称" />
                </Form.Item>
                <Form.Item {...restField} wrapperCol={{ span: 22 }} name={[name, 'dataIndex']}>
                  <Input placeholder="列字段" style={{ width: '100%' }} />
                </Form.Item>
                <EditOutlined onClick={() => handleOpen(name)} />
                <PlusOutlined onClick={() => add({ title: `列${name + 2}`, dataIndex: `Col-${name + 2}`, type: 'text' }, name + 1)} />
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
export default TableSetting;
