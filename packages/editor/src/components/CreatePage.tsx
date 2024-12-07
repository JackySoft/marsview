import { Input, Modal, Form, Select, Space, Flex, Button } from 'antd';
import { useImperativeHandle, useState, MutableRefObject } from 'react';
import projectApi from '@/api/project';
import api from '@/api/page';
import { CreatePageParams, Project } from '@/api/types';
import { useSearchParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { usePageStore } from '@/stores/pageStore';
/**
 * 创建页面
 */
export interface CreatePageRef {
  open: (action: 'create' | 'edit' | 'copy', record?: CreatePageParams) => void;
}
export interface IModalProp {
  createRef: MutableRefObject<{ open: (action: 'create' | 'edit' | 'copy', record?: CreatePageParams) => void } | undefined>;
  update?: (status?: string) => void;
  copy?: (record: CreatePageParams) => void;
}

const CreatePage = (props: IModalProp) => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<'create' | 'edit' | 'copy'>('create');
  const [recordId, setRecordId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [projectList, setProjectList] = useState<Project.ProjectItem[]>([]);
  const [searchParams] = useSearchParams();
  const savePageInfo = usePageStore((state) => state.savePageInfo);
  // 暴露方法
  useImperativeHandle(props.createRef, () => ({
    async open(action: 'create' | 'edit' | 'copy', record?: CreatePageParams) {
      const { list = [] } = await projectApi.getCategoryList({
        pageNum: 1,
        pageSize: 100,
      });
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
      setType(action);
      if (action === 'edit') {
        record && setRecordId(record.id);
        form.setFieldsValue(record);
      } else if (action === 'copy') {
        record && setRecordId(record.id);
        form.setFieldsValue({ ...record, name: `${record?.name}-副本` });
      } else {
        const projectId = searchParams.get('projectId') || record?.projectId;
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
        } else if (type === 'edit') {
          await api.updatePageData({
            ...params,
            id: recordId,
          });
          savePageInfo({
            name: params?.name,
            remark: params?.remark,
            projectId: params?.projectId,
          });
        } else {
          await api.copyPageData({
            ...params,
            id: recordId,
          });
        }
        // 编辑器界面 - 左侧菜单修改后刷新
        props.update?.('success');
        form.resetFields();
        setVisible(false);
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
    props.update?.('cancel');
  };
  return (
    <Modal
      title={type === 'create' ? '初始页面信息' : type === 'edit' ? '编辑页面' : '复制页面'}
      open={visible}
      confirmLoading={loading}
      onOk={handleOk}
      onCancel={handleCancel}
      width={500}
      okText="确定"
      cancelText="取消"
      footer={type === 'create' ? null : undefined}
    >
      <Form layout="vertical" form={form} labelCol={{ span: 5 }} wrapperCol={{ span: 24 }}>
        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入页面名称' }]}>
          <Input placeholder="请输入页面名称" maxLength={15} showCount />
        </Form.Item>
        <Form.Item label="描述" name="remark">
          <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder="请输入描述" maxLength={100} showCount />
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

        {type == 'create' ? (
          <Form.Item>
            <Button block type="primary" onClick={handleOk} loading={loading}>
              快速初始化
            </Button>
          </Form.Item>
        ) : null}
      </Form>
    </Modal>
  );
};

export default CreatePage;
