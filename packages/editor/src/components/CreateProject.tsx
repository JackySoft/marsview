import { Input, Modal, Form, Radio } from 'antd';
import { useImperativeHandle, useState, forwardRef, useMemo } from 'react';
import { addProject } from '@/api';
import { usePageStore } from '@/stores/pageStore';
import UploadImages from './UploadImages/UploadImages';
import { message } from '@/utils/AntdGlobal';

/**
 * 创建项目
 */
const CreateProject = (props: { update: () => void }, ref: any) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const userId = usePageStore((store) => store.userInfo.userId);

  // 暴露方法
  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));

  // 提交
  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setLoading(true);
      await addProject({ ...initValue, ...values });
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

  const initValue = useMemo(() => {
    return {
      layout: 1,
      menu_mode: 'inline',
      menu_theme_color: 'dark',
      system_theme_color: '#1677ff',
      breadcrumb: true,
      tag: true,
      footer: false,
      logo: 'https://marsview.cdn.bcebos.com/mars-logo.png',
      is_public: 1,
      is_edit: 2,
    };
  }, []);
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
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }} initialValues={initValue}>
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入页面名称' }]}>
          <Input placeholder="请输入项目名称" maxLength={15} showCount />
        </Form.Item>
        <Form.Item label="描述" name="remark">
          <Input placeholder="请输入项目描述" maxLength={20} showCount />
        </Form.Item>
        <Form.Item label="LOGO" name="logo" rules={[{ required: true, message: '请上传项目Logo' }]}>
          <UploadImages />
        </Form.Item>
        <Form.Item
          label="权限"
          name="is_public"
          rules={[{ required: true, message: '请选择访问类型' }]}
          extra="公开页面支持所有人访问。私有页面仅自己可访问。"
        >
          <Radio.Group>
            <Radio value={1}>公开</Radio>
            <Radio value={2}>私有</Radio>
            {/* 普通用户暂不开放模板设置 */}
            {userId == 50 ? <Radio value={3}>公开模板</Radio> : null}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="模式" name="is_edit" rules={[{ required: true, message: '请选择编辑模式' }]} extra="公开后设置他人可查看或编辑；">
          <Radio.Group>
            <Radio value={1}>编辑</Radio>
            <Radio value={2}>查看</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default forwardRef(CreateProject);
