import { memo, useRef } from 'react';
import { Form, Dropdown, Button } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { usePageStore } from '@/stores/pageStore';
import NodeModal from '../FlowNode/NodeModal';
import { NodeType } from '../FlowNode/FlowNode';
import styles from './index.module.less';

const EventConfig = memo(() => {
  type callback = (nodeList: NodeType[]) => void;
  const nodeRef = useRef<{ open: (nodeList: NodeType[], callback: callback) => void }>();

  // 页面组件
  const state = usePageStore();
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
    let values: any = [];
    // 如果未选中，则填充页面事件
    if (!state.selectedElement) {
      values = state.page.pageData.config.events || [];
    } else {
      // 如果选中，填充组件事件
      const config = state.page.pageData.elementsMap[state.selectedElement.id]?.config || {};
      values = config.events || [];
    }
    form.setFieldsValue({ events: values });
  }, [state.selectedElement]);

  // 定义事件列表
  const items: Array<{ key: string; label: string }> | undefined = state.selectedElement?.id
    ? state.page.pageData.elementsMap[state.selectedElement.id]?.events?.map((item) => ({
        key: item.value,
        label: item.name,
      }))
    : state.page.pageData.events.map((item) => ({
        key: item.value,
        label: item.name,
      }));

  // 值变化
  const handleValueChange = (_: any, values: any) => {
    if (state.selectedElement?.id) {
      state.editElement({
        id: state.selectedElement.id,
        type: 'events',
        events: values.events || [],
      });
    } else {
      state.savePageInfo({
        type: 'events',
        events: values.events || [],
      });
    }
  };

  // 添加事件行为
  const handleAddAction = (index: number) => {
    nodeRef.current?.open(form.getFieldValue(['events', index, 'actions']), (nodeList: any) => {
      form.setFieldValue(['events', index, 'actions'], nodeList);
      handleValueChange(null, form.getFieldsValue());
    });
  };

  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 15 },
  };

  return (
    <>
      <Form form={form} {...formLayout} onValuesChange={handleValueChange}>
        <div style={{ marginBottom: 10 }}>
          <Form.List name={['events']}>
            {(fields, { add, remove }) => (
              <>
                <div className={styles.event}>
                  <Dropdown
                    menu={{
                      items,
                      onClick: ({ key }) => {
                        const nickName = items?.find((item) => item?.key === key)?.label;
                        add({ nickName, eventName: key, actions: [] });
                      },
                    }}
                    placement="bottom"
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <PlusOutlined />
                      <span className={styles.ml5}>添加事件</span>
                    </a>
                  </Dropdown>
                </div>
                {fields.map(({ key, name }) => (
                  <div key={'event' + key} className={styles.eventFlow}>
                    {/* 循环添加的事件 */}
                    <h2 className={styles.title}>
                      <span>{form.getFieldValue(['events', name, 'nickName'])}</span>
                      {/* 删除事件 */}
                      <DeleteOutlined onClick={() => remove(name)} className={styles.ml5} />
                    </h2>
                    {/* 循环事件对应的行为 */}
                    <div className={styles.addAction}>
                      {/* 添加事件行为 */}
                      <Button type="primary" onClick={() => handleAddAction(name)}>
                        设置事件流
                      </Button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </Form.List>
        </div>
      </Form>
      <NodeModal ref={nodeRef} />
    </>
  );
});
export default EventConfig;
