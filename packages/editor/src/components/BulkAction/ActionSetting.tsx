import { memo, useRef } from 'react';
import { Form, Input, Space, Button, FormInstance, Select } from 'antd';
import { useDebounceFn } from 'ahooks';
import { cloneDeep } from 'lodash-es';
import { MinusOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';
import ActionButtonModal from './ActionButtonModal';
import { usePageStore } from '@/stores/pageStore';
import { ComponentType } from '@/packages/types';
import { createId } from '@/utils/util';
/**
 * 操作栏配置
 */
const ActionSetting = memo(({ form }: { form: FormInstance }) => {
  const { selectedElement, elementsMap, editEvents } = usePageStore((state) => ({
    selectedElement: state.selectedElement,
    elementsMap: state.page.pageData.elementsMap,
    editEvents: state.editEvents,
  }));
  const modalRef = useRef<{ open: (index: number) => void }>();
  // 创建批量操作按钮
  const handleCreate = (add: any) => {
    add({
      text: '下载',
      type: 'primary',
      eventName: createId('BulkAction'),
    });
    handleEvents();
  };
  // 删除批量操作按钮
  const handleDelete = (remove: any, name: number) => {
    remove(name);
    handleEvents();
  };
  // 更新事件
  const handleEvents = () => {
    const element: ComponentType = elementsMap[selectedElement?.id as string];
    // 需要提前把已经存进去的action事件过滤掉，不然会重复
    const events: any = element.events?.filter((item: any) => item.value.indexOf('BulkAction') == -1);
    form.getFieldValue('bulkActionList')?.map((item: any) => {
      // 动态新增的按钮，需要动态生成事件
      events.push({
        name: item.text + '事件',
        value: item.eventName,
      });
    });
    editEvents({
      id: selectedElement?.id,
      events,
    });
  };
  // 设置
  const handleOpen = (index: number) => {
    modalRef.current?.open(index);
  };
  const { run } = useDebounceFn(
    (text: string, index: number) => {
      handleUpdate(text, index);
    },
    { wait: 500 },
  );
  /**
   * 更新按钮名称和事件名称
   * @param values 来自弹框的修改为对象，直接修改为字符串
   * @param index 索引
   */
  const handleUpdate = (values: any, index: number) => {
    if (typeof values === 'string') {
      form.setFieldValue(['bulkActionList', index, 'text'], values);
    } else {
      form.setFieldValue(['bulkActionList', index], values);
    }
    const eventName = form.getFieldValue(['bulkActionList', index, 'eventName']);
    // 更新事件名称
    const element: ComponentType = elementsMap[selectedElement?.id as string];
    const events: Array<{ name: string; value: string }> = cloneDeep(element.events);
    events.map((event) => {
      if (event.value === eventName) {
        if (typeof values === 'string') {
          event.name = values + '事件';
        } else {
          event.name = values.text + '事件';
        }
      }
      return event;
    });
    editEvents({
      id: selectedElement?.id,
      events,
    });
  };
  return (
    <>
      <Form.List name={['bulkActionList']}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} align="baseline">
                <Form.Item {...restField} labelCol={{ span: 12 }} name={[name, 'text']} label="按钮">
                  <Input placeholder="请输入按钮名称" onChange={(event) => run(event.target.value, name)} />
                </Form.Item>
                <Form.Item name={[name, 'eventName']} hidden>
                  <Input />
                </Form.Item>
                <Form.Item name={[name, 'type']} hidden>
                  <Input />
                </Form.Item>
                <EditOutlined onClick={() => handleOpen(name)} />
                <MinusOutlined onClick={() => handleDelete(remove, name)} />
              </Space>
            ))}
            <div style={{ padding: '0 10px 10px' }}>
              <Button type="primary" block ghost onClick={() => handleCreate(add)} icon={<PlusOutlined />}>
                新增
              </Button>
            </div>
          </>
        )}
      </Form.List>
      <ActionButtonModal modalRef={modalRef} update={handleUpdate} />
    </>
  );
});
export default ActionSetting;
