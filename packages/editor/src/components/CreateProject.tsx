import { Input, Modal, Form } from 'antd';
import { useImperativeHandle, useState, forwardRef, memo } from 'react';
import { addProject } from '@/api';
import UploadImages from './UploadImages/UploadImages';
import { message } from '@/utils/AntdGlobal';

/**
 * 创建项目
 */
const CreateProject = (props: { update: () => void }, ref: any) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // 暴露方法
  useImperativeHandle(ref, () => ({
    open() {
      form.resetFields();
      setVisible(true);
    },
  }));

  // 提交
  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setLoading(true);
      await addProject({ ...values });
      message.success('创建成功');
      props.update();
      setLoading(false);
      setVisible(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // 关闭
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  return (
    <Modal
      title="创建项目"
      open={visible}
      confirmLoading={loading}
      onOk={handleOk}
      onCancel={handleCancel}
      width={600}
      okText="确定"
      cancelText="取消"
    >
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} initialValues={{ logo: 'https://marsview.cdn.bcebos.com/mars-logo.png' }}>
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入页面名称' }]}>
          <Input placeholder="请输入项目名称" maxLength={15} showCount />
        </Form.Item>
        <Form.Item label="描述" name="remark" rules={[{ required: true, message: '请输入项目描述' }]}>
          <Input placeholder="请输入项目描述" maxLength={20} showCount />
        </Form.Item>
        <Form.Item label="LOGO" name="logo" rules={[{ required: true, message: '请上传项目Logo' }]}>
          <UploadImages />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(forwardRef(CreateProject));
