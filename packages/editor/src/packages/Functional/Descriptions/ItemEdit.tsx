import { Input, Modal, Form, Col, Row, Select, Switch, InputNumber } from 'antd';
import { useImperativeHandle, useState, MutableRefObject, memo } from 'react';
import { useForm } from 'antd/es/form/Form';
import { ComponentType } from '../../types';
import { usePageStore } from '@/stores/pageStore';
import VsEditor from '@/components/VsEditor';
import { createId } from '@/utils/util';

export interface IModalProp {
  columnRef: MutableRefObject<{ open: (index: number) => void } | undefined>;
  update: (values: any, index: number) => void;
}
/**
 * 列设置
 */
const ColumnSetting = memo((props: IModalProp) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [form] = useForm();

  const { selectedElement, elementsMap, editTableProps, editEvents } = usePageStore((state) => ({
    selectedElement: state.selectedElement,
    elementsMap: state.page.pageData.elementsMap,
    editTableProps: state.editTableProps,
    editEvents: state.editEvents,
  }));

  // 暴露方法
  useImperativeHandle(props.columnRef, () => ({
    open(index: number) {
      const values = elementsMap[selectedElement?.id as string];
      const defaultValues = values.config.props.items[index];
      const renderFn =
        defaultValues.render ||
        `function render(text,record) {
    return text;
}`;
      form.resetFields();
      form.setFieldsValue({
        span: 1,
        type: 'text',
        ...defaultValues,
        render: renderFn,
      });
      setIndex(index);
      setVisible(true);
    },
  }));

  // 提交
  const handleOk = () => {
    form.validateFields().then(() => {
      const values = form.getFieldsValue();
      const element: ComponentType = elementsMap[selectedElement?.id as string];
      // 给当前列创建事件
      const cellEventName = createId(`ClickItem${values.name}`);
      if (values.clickable) {
        values.eventName = values.eventName || cellEventName;
      } else {
        values.eventName = '';
      }
      // 更新操作列属性
      editTableProps({
        id: selectedElement?.id,
        type: 'items',
        index,
        props: { ...values, key: values.dataIndex || index },
      });
      // 需要提前把已经存进去的动态事件过滤掉，不然会重复
      let events: any = element.events;
      // 如果列点击事件存在，先删除
      const oldEventName = element.config.props.items[index].eventName;
      events = events.filter((item: any) => item.value != oldEventName);
      // 更新列点击事件
      if (values.clickable) {
        events.push({
          name: `${values.label}点击事件`,
          value: values.eventName || cellEventName,
        });
      }
      // 更新操作列事件
      editEvents({
        id: element.id,
        events,
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
    <Modal title="描述项设置" open={visible} onOk={handleOk} onCancel={handleCancel} width={800}>
      <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 14 }}>
        <Row>
          <Col span={12}>
            <Form.Item label="标题" name="label" rules={[{ required: true, message: '请输入项名称' }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="字段" name="name" rules={[{ required: true, message: '请输入项字段' }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="跨列数" name="span">
              <InputNumber />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="列类型" name="type">
              <Select>
                <Select.Option value="text">文本</Select.Option>
                <Select.Option value="image">图片</Select.Option>
                <Select.Option value="date1">日期-不含时分秒</Select.Option>
                <Select.Option value="date2">日期-包含时分秒</Select.Option>
                <Select.Option value="money">金额千分位</Select.Option>
                <Select.Option value="number">数字千分位</Select.Option>
                <Select.Option value="tag">标签</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {/* 如果是文本类型，可设置字体大小 */}
        <Row>
          <Col span={12}>
            <Form.Item label="字体大小" name="fontSize" tooltip="只有文本类生效">
              <InputNumber />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="文字提示" name="openTooltip" tooltip="只有文本类生效">
              <Switch />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="提示内容" name="tipContent" tooltip="只有文本类生效">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="超长省略" name="ellipsis" tooltip="省略后，会自动开启tooltip功能">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="可点击" name="clickable" tooltip="开启后，当前列展示为可点击的link格式">
              <Switch />
            </Form.Item>
            <Form.Item name="eventName" hidden>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="可复制" name="copyable" tooltip="开启后，列增加复制功能，只对文本生效">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="自定义渲染"
              name="render"
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 21 }}
              tooltip="通过编程的方式实现值渲染，不支持ReactNode渲染。例如：if(text === 1)return '在线'; "
            >
              <VsEditor />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});

export default ColumnSetting;
