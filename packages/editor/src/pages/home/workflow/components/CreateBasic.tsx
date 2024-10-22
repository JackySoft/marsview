import { Input, Modal, Form } from 'antd';
import { useImperativeHandle, useState, MutableRefObject } from 'react';
import api from '@/api/workflow';
/**
 * 创建模板基础配置
 */

export interface IModalProp {
  createRef: MutableRefObject<{ open: () => void } | undefined>;
  update?: () => void;
}

const CreateBasic = (props: IModalProp) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  // 暴露方法
  useImperativeHandle(props.createRef, () => ({
    open() {
      setVisible(true);
    },
  }));

  // 提交
  const handleOk = async () => {
    const values = form.getFieldsValue();
    const valid = await form.validateFields();
    if (valid) {
      await api.createTemplate(values);
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
    <Modal title="创建工作流模板" open={visible} onOk={handleOk} onCancel={handleCancel} width={500} okText="确定" cancelText="取消">
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <Form.Item label="模板名称" name="form_name" rules={[{ required: true, message: '请输入模板名称' }]}>
          <Input placeholder="请输入模板名称" />
        </Form.Item>
        <Form.Item label="模板描述" name="form_desc">
          <Input.TextArea placeholder="请输入模板介绍" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateBasic;
