import { useImperativeHandle, useState, forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Form, Radio, Input } from 'antd';
import { usePageStore } from '@/stores/pageStore';
import api from '@/api/pageMember';
/**
 * 成员管理
 */

const MemberSetting = (props: any, ref: any) => {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [type, setType] = useState<1 | 2>(1);
  const { pageId } = usePageStore((state) => ({ pageId: state.page.pageId }));
  const [form] = Form.useForm();
  const projectId = useParams().id as string; // 获取项目ID
  // 暴露方法
  useImperativeHandle(ref, () => ({
    /**
     * 项目和页面统一权限设置
     * @param list 用户列表，用来判断是否已经存在
     * @param type 1：项目成员，2：页面成员
     */
    open(type: 1 | 2) {
      setType(type);
      setVisible(true);
    },
  }));

  // 提交
  const handleOk = async () => {
    const valid = await form.validateFields();
    if (!valid) return;
    const { role, user_name } = form.getFieldsValue();

    try {
      setConfirmLoading(true);
      await api.addPageMember({ type, page_id: type == 1 ? parseInt(projectId) : pageId, role, user_name });
      setConfirmLoading(false);
      handleCancel();
      props?.update();
    } catch (error) {
      setConfirmLoading(false);
    }
  };

  // 关闭
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  return (
    <Modal
      title={type === 1 ? '添加开发者' : '添加页面成员'}
      open={visible}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="提交"
      cancelText="取消"
    >
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} initialValues={{ role: 1 }}>
        <Form.Item label="用户" name="user_name" rules={[{ required: true, message: '请输入用户邮箱' }]}>
          <Input placeholder="请输入用户邮箱" />
        </Form.Item>
        <Form.Item label="角色" name="role" rules={[{ required: true, message: '请选择角色' }]}>
          <Radio.Group>
            <Radio value={1}>开发者</Radio>
            <Radio value={2}>体验者</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default forwardRef(MemberSetting);
