import { memo } from 'react';
import { Form, Input, Space, Button, FormInstance } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { usePageStore } from '@/stores/pageStore';
import { createId } from '@/utils/util';
import TabConfig from './../Tab/Schema';
/**
 * 操作栏配置
 */
const ActionSetting = memo(({ form }: { form: FormInstance }) => {
  const { selectedElement, addChildElements } = usePageStore((state) => {
    return {
      selectedElement: state.selectedElement,
      addChildElements: state.addChildElements,
    };
  });
  // 创建批量操作按钮
  const handleCreate = (add: any, index: number) => {
    const id = createId('Tab');
    add({
      id,
      key: 'active' + index,
      label: 'Tab' + index,
    });
    // 生成默认配置
    const { config, events, methods = [] }: any = TabConfig || {};
    addChildElements({
      type: 'Tab',
      name: '子页签',
      parentId: selectedElement?.id,
      id,
      config: {
        ...config,
        props: {
          ...config.props,
          activeKey: 'Tab' + index,
        },
      },
      events,
      methods,
    });
  };
  // 删除批量操作按钮
  const handleDelete = (remove: any, name: number) => {
    remove(name);
  };
  return (
    <>
      <Form.List name={['items']}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} align="baseline">
                <Form.Item {...restField} labelCol={{ span: 12 }} name={[name, 'label']} label="页签">
                  <Input placeholder="页签名称" />
                </Form.Item>
                <DeleteOutlined onClick={() => handleDelete(remove, name)} />
              </Space>
            ))}
            <div style={{ padding: '0 10px 10px' }}>
              <Button type="primary" block ghost onClick={() => handleCreate(add, fields.length + 1)} icon={<PlusOutlined />}>
                新增
              </Button>
            </div>
          </>
        )}
      </Form.List>
    </>
  );
});
export default ActionSetting;
