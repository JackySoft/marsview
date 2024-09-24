import { Input, Modal, Form, Radio } from 'antd';
import { useImperativeHandle, useState, MutableRefObject } from 'react';
import { createPageData, updatePageData } from '@/api';
import { PageItem } from '@/api/pageMember';
/**
 * 创建页面
 */

export interface IModalProp {
  title: string;
  createRef: MutableRefObject<{ open: (record: PageItem) => void } | undefined>;
  update?: () => void;
}

const CreatePage = (props: IModalProp) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<'create' | 'edit'>('create');
  const [recordId, setRecordId] = useState(0);
  const [loading, setLoading] = useState(false);

  // 暴露方法
  useImperativeHandle(props.createRef, () => ({
    open(record?: PageItem) {
      if (record) {
        setType('edit');
        setRecordId(record.id);
        form.setFieldsValue(record);
      } else {
        setType('create');
        setRecordId(0);
      }
      setVisible(true);
    },
  }));

  // 提交
  const handleOk = async () => {
    const params = form.getFieldsValue();
    const valid = await form.validateFields();
    if (valid) {
      setLoading(true);
      try {
        if (type === 'create') {
          await createPageData(params);
        } else {
          await updatePageData({
            ...params,
            id: recordId,
          });
        }
        // 编辑器界面 - 左侧菜单修改后刷新
        props.update?.();
        handleCancel();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  };

  // 关闭
  const handleCancel = () => {
    form.resetFields();
    setVisible(false);
  };
  return (
    <Modal
      title={props.title}
      open={visible}
      confirmLoading={loading}
      onOk={handleOk}
      onCancel={handleCancel}
      width={500}
      okText="确定"
      cancelText="取消"
    >
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} initialValues={{ is_public: 1, is_edit: 1 }}>
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入页面名称' }]}>
          <Input placeholder="请输入页面名称" maxLength={15} showCount />
        </Form.Item>
        <Form.Item label="描述" name="remark">
          <Input placeholder="请输入页面描述" maxLength={20} showCount />
        </Form.Item>
        <Form.Item label="权限" name="is_public" rules={[{ required: true, message: '请选择访问类型' }]}>
          <Radio.Group>
            <Radio value={1}>公开</Radio>
            <Radio value={2}>私有</Radio>
            <Radio value={3}>公开模板</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="模式" name="is_edit" rules={[{ required: true, message: '请选择编辑模式' }]}>
          <Radio.Group>
            <Radio value={1}>编辑</Radio>
            <Radio value={2}>查看</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePage;
