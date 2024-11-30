import { Input, Modal, Form, Select, Space, Flex } from 'antd';
import { useImperativeHandle, useState, MutableRefObject } from 'react';
import { getAllProjects } from '@/api';
import api from '@/api/page';
import { PageItem } from '@/api/pageMember';
import { Project } from '@/api/types';
import { useSearchParams } from 'react-router-dom';
/**
 * 创建页面
 */

export interface IModalProp {
  title: string;
  createRef: MutableRefObject<{ open: (record: PageItem) => void } | undefined>;
  update?: (record?: PageItem) => void;
}

const CreatePage = (props: IModalProp) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<'create' | 'edit'>('create');
  const [recordId, setRecordId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [projectList, setProjectList] = useState<Project.ProjectItem[]>([]);
  const [searchParams] = useSearchParams();
  // 暴露方法
  useImperativeHandle(props.createRef, () => ({
    async open(record?: PageItem) {
      const list = await getAllProjects();
      setProjectList(
        list.map((item: Project.ProjectItem) => {
          return {
            name: item.name,
            id: item.id,
            logo: item.logo,
            remark: item.remark,
          };
        }),
      );
      if (record) {
        setType('edit');
        setRecordId(record.id);
        form.setFieldsValue(record);
      } else {
        const projectId = searchParams.get('projectId');
        setType('create');
        setRecordId(0);
        if (projectId) form.setFieldValue('projectId', Number(projectId));
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
          await api.createPageData(params);
        } else {
          await api.updatePageData({
            ...params,
            id: recordId,
          });
        }
        // 编辑器界面 - 左侧菜单修改后刷新
        props.update?.(params);
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
      width={600}
      okText="确定"
      cancelText="取消"
    >
      <Form form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入页面名称' }]}>
          <Input placeholder="请输入页面名称" maxLength={15} showCount />
        </Form.Item>
        <Form.Item label="描述" name="remark">
          <Input placeholder="请输入页面描述" maxLength={20} showCount />
        </Form.Item>
        <Form.Item label="所属项目" name="projectId" rules={[{ required: true, message: '请选择所属项目' }]}>
          <Select
            placeholder="请选择所属项目"
            options={projectList}
            fieldNames={{ label: 'name', value: 'id' }}
            optionRender={(option) => (
              <Space>
                <img src={option.data.logo} style={{ maxWidth: 50, maxHeight: 50 }} />
                <Flex vertical>
                  <span>{option.data.name}</span>
                  <span>{option.data.remark}</span>
                </Flex>
              </Space>
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePage;
