import React, { useImperativeHandle, useState, MutableRefObject, memo } from 'react';
import { Input, Modal, Form, Select, Switch, Radio } from 'antd';
import * as icons from '@ant-design/icons';
import { usePageStore } from '@/stores/pageStore';
import VariableBind from '../VariableBind/VariableBind';

/**
 * 列设置
 */

export interface IModalProp {
  modalRef: MutableRefObject<{ open: (index: number) => void } | undefined>;
  update: (text: string, index: number) => void;
}

const ActionButtonModal = memo((props: IModalProp) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const [form] = Form.useForm();

  const { selectedElement, elementsMap, editTableProps } = usePageStore((state) => ({
    selectedElement: state.selectedElement,
    elementsMap: state.page.pageData.elementsMap,
    editTableProps: state.editTableProps,
  }));

  // 暴露方法
  useImperativeHandle(props.modalRef, () => ({
    open(index: number) {
      const values = elementsMap[selectedElement?.id as string];
      form.setFieldsValue({
        danger: false,
        ...values.config.props.bulkActionList[index],
      });
      setIndex(index);
      setVisible(true);
    },
  }));

  // 提交
  const handleOk = () => {
    form.validateFields().then(() => {
      const values = form.getFieldsValue();
      editTableProps({
        id: selectedElement?.id,
        type: 'bulkActionList',
        index,
        props: values,
      });
      props.update(values, index);
      setVisible(false);
    });
  };

  // 关闭
  const handleCancel = () => {
    setVisible(false);
  };

  // 获取所有的antd图标，动态渲染到下拉框中
  const iconsList: { [key: string]: any } = icons;
  return (
    <Modal title="操作按钮设置" open={visible} onOk={handleOk} onCancel={handleCancel} width={600} destroyOnClose>
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="按钮名称" name="text" rules={[{ required: true, message: '请输入按钮名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="eventName" hidden>
          <Input />
        </Form.Item>
        <Form.Item label="按钮类型" name="type">
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            options={[
              {
                label: '主按钮',
                value: 'primary',
              },
              {
                label: '默认',
                value: 'default',
              },
              {
                label: '虚线按钮',
                value: 'dashed',
              },
              {
                label: '文本按钮',
                value: 'text',
              },
              {
                label: '链接按钮',
                value: 'link',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="危险按钮" name="danger" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="块状按钮" name="block" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="按钮图标" name="icon">
          <Select placeholder="请选择菜单图表" showSearch allowClear>
            {Object.keys(icons)
              .filter((item) => !['default', 'createFromIconfontCN', 'getTwoToneColor', 'setTwoToneColor', 'IconProvider'].includes(item))
              .map((key) => {
                return (
                  <Select.Option value={key} key={key}>
                    {React.createElement(iconsList[key], {
                      style: {
                        fontSize: '24px',
                        verticalAlign: 'middle',
                      },
                    })}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item name={'authCode'} label="权限标识">
          <Input />
        </Form.Item>
        <Form.Item name={'authScript'} label="三方脚本">
          <VariableBind />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default ActionButtonModal;
