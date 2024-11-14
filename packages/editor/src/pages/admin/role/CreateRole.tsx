import { useImperativeHandle, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Form, Input } from 'antd';
import { Role } from '@/api/types';
import { IAction, IModalProp } from '@/pages/types';
import { message } from '@/utils/AntdGlobal';
import { createRole, updateRole } from '@/api';
export default function CreateRole(props: IModalProp<Role.RoleItem>) {
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState<IAction>('create');
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const { id: projectId } = useParams();
  // 暴露组件方法
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    };
  });
  const open = (type: IAction, data?: Role.RoleItem) => {
    setAction(type);
    setVisible(true);
    setConfirmLoading(false);
    if (data) {
      form.setFieldsValue(data);
    }
  };
  // 提交
  const handleOk = async () => {
    const valid = await form.validateFields();
    if (valid && projectId) {
      try {
        setConfirmLoading(true);
        const { id, name, remark = '' } = form.getFieldsValue();
        if (action === 'create') {
          await createRole({ name, remark, projectId });
        } else {
          await updateRole({ name, remark, id, projectId });
        }
        setConfirmLoading(false);
        message.success('操作成功');
        handleCancel();
        props.update();
      } catch (error) {
        setConfirmLoading(false);
      }
    }
  };
  // 取消
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  return (
    <Modal
      title={action === 'create' ? '新增角色' : '编辑角色'}
      width={600}
      open={visible}
      okText="确定"
      cancelText="取消"
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} labelAlign="right" labelCol={{ span: 4 }}>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="角色名称"
          rules={[
            {
              required: true,
              message: '请输入角色名称',
            },
          ]}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>
        <Form.Item name="remark" label="备注">
          <Input.TextArea placeholder="请输入备注" maxLength={20} showCount />
        </Form.Item>
      </Form>
    </Modal>
  );
}
