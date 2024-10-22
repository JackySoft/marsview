import { Input, Modal, Form } from 'antd';
import { useImperativeHandle, useState, MutableRefObject } from 'react';
import { useForm } from 'antd/es/form/Form';
import { createLib } from '@/api/lib';
/**
 * 创建自定义组件库
 */

export interface IModalProp {
  createRef: MutableRefObject<{ open: () => void } | undefined>;
  update?: () => void;
}

const CreateLib = (props: IModalProp) => {
  const [form] = useForm();
  const [visible, setVisible] = useState(false);

  // 暴露方法
  useImperativeHandle(props.createRef, () => ({
    open() {
      setVisible(true);
    },
  }));

  // 提交
  const handleOk = async () => {
    const { tag, name, description } = form.getFieldsValue();
    const valid = await form.validateFields();
    if (valid) {
      await createLib({ tag, name, description });
      props.update?.();
      handleCancel();
    }
  };

  // 关闭
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  return (
    <Modal title="创建组件库" open={visible} onOk={handleOk} onCancel={handleCancel} width={600} okText="确定" cancelText="取消">
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
        <Form.Item
          label="组件标识"
          name="tag"
          rules={[
            { required: true, message: '请输入组件标识' },
            { pattern: /^[a-zA-Z]+$/g, message: '只支持英文' },
          ]}
        >
          <Input placeholder="请输入英文标识：Button" prefix="MC" />
        </Form.Item>
        <Form.Item label="组件名称" name="name" rules={[{ required: true, message: '请输入组件名称' }]}>
          <Input placeholder="请输入中文名称：按钮" />
        </Form.Item>
        <Form.Item label="组件描述" name="description">
          <Input.TextArea placeholder="一句话介绍" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateLib;
