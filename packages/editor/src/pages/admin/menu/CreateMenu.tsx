import { useImperativeHandle, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Form, TreeSelect, Input, Select, InputNumber, Radio, Spin } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { message } from '@/utils/AntdGlobal';
import { IAction, IModalProp } from '@/pages/types';
import { Menu } from '@/api/types';
import { getMenuList, addMenu, updateMenu, getPageList } from '@/api';
import { PageItem } from '@/api/pageMember';
import { arrayToTree } from '@/utils/util';
import CreatePage from '@/components/CreatePage';
import CustomIconOptions from '@/components/CustomIconList';

export default function CreateMenu(props: IModalProp<Menu.EditParams>) {
  const [form] = Form.useForm();
  const createRef = useRef<{ open: (record?: PageItem) => void }>();
  const [action, setAction] = useState<IAction>('create');
  const [visible, setVisible] = useState(false);
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([]);
  const [pageList, setPageList] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { id: project_id } = useParams();

  useImperativeHandle(props.mRef, () => ({
    open,
  }));

  // 打开弹框函数
  const open = async (type: IAction, data?: Menu.EditParams | { parentId: string; code: string }) => {
    setAction(type);
    setVisible(true);
    setLoading(true);
    // 获取菜单列表
    getMenus();
    type === 'edit' && getMyPageList();
    setLoading(false);
    if (data && project_id) {
      form.setFieldsValue({ ...data, project_id: parseInt(project_id), code: data.code?.split('_')[2] || '' });
    }
  };

  // 获取菜单列表，生成菜单树
  const getMenus = async () => {
    if (!project_id) return;
    const res = await getMenuList({
      project_id: parseInt(project_id),
    });
    const menuData = arrayToTree(res.list);
    setMenuList(menuData);
  };

  // 获取用户页面列表
  const getMyPageList = async () => {
    const res = await getPageList({ pageNum: 1, pageSize: 50 });
    setPageList(res.list);
  };

  // 菜单提交
  const handleSubmit = async () => {
    const valid = await form.validateFields();
    if (valid) {
      setConfirmLoading(true);
      const values = form.getFieldsValue();
      try {
        if (values.type === 2) {
          values.code = values.project_id + '_' + values.parent_id + '_' + values.code;
        } else {
          values.code = '';
        }
        values.page_id = values.page_id || 0;
        if (action === 'create') {
          await addMenu(values);
        } else {
          await updateMenu(values);
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
  // 关闭和重置弹框
  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };
  return (
    <>
      <Modal
        title={action === 'create' ? '创建菜单' : '编辑菜单'}
        width={800}
        open={visible}
        okText="确定"
        cancelText="取消"
        confirmLoading={confirmLoading}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Spin spinning={loading}>
          <Form form={form} labelAlign="right" labelCol={{ span: 4 }} wrapperCol={{ span: 18 }} initialValues={{ type: 1, status: 1, is_create: 2 }}>
            <Form.Item hidden name="id">
              <Input />
            </Form.Item>
            <Form.Item hidden name="project_id">
              <InputNumber />
            </Form.Item>
            <Form.Item label="父级菜单" name="parent_id">
              <TreeSelect
                placeholder="请选择父级菜单"
                allowClear
                treeDefaultExpandAll
                fieldNames={{ label: 'name', value: 'id' }}
                treeData={menuList}
              />
            </Form.Item>
            <Form.Item label="菜单类型" name="type">
              <Radio.Group>
                <Radio value={1}>菜单</Radio>
                <Radio value={2}>按钮</Radio>
                <Radio value={3}>页面</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              {() => {
                const type = form.getFieldValue('type');
                return type === 1 ? (
                  <Form.Item label="菜单名称" name="name" rules={[{ required: true, message: '请输入菜单名称' }]}>
                    <Input placeholder="请输入菜单名称" allowClear maxLength={15} showCount />
                  </Form.Item>
                ) : type === 2 ? (
                  <Form.Item label="按钮名称" name="name" rules={[{ required: true, message: '请输入按钮名称' }]}>
                    <Input placeholder="请输入按钮名称" allowClear />
                  </Form.Item>
                ) : (
                  <Form.Item label="页面名称" name="name" rules={[{ required: true, message: '请输入页面名称' }]}>
                    <Input placeholder="请输入页面名称" allowClear />
                  </Form.Item>
                );
              }}
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              {() => {
                const type = form.getFieldValue('type');
                return type === 2 ? (
                  <Form.Item label="权限标识" name="code" extra="同一个菜单下按钮标识不要重复，请根据语义定义。">
                    <Input placeholder="权限标识，例如: create、edit、export" />
                  </Form.Item>
                ) : (
                  <>
                    {type === 1 ? (
                      <Form.Item label="菜单图标" name="icon">
                        <CustomIconOptions />
                      </Form.Item>
                    ) : null}
                    {action === 'edit' ? (
                      <Form.Item
                        label="绑定页面"
                        extra={
                          <span>
                            该菜单可以解绑、修改、新增绑定页面。暂无页面？
                            <a
                              onClick={() => {
                                createRef.current?.open();
                              }}
                            >
                              去创建
                            </a>
                          </span>
                        }
                        name="page_id"
                      >
                        <Select
                          placeholder="请选择关联页面"
                          allowClear
                          showSearch
                          filterOption={(input, option) => (option?.name ?? '').toLowerCase().includes(input.toLowerCase())}
                          options={[...pageList, { name: '空页面', id: 0 }]}
                          fieldNames={{ label: 'name', value: 'id' }}
                        ></Select>
                      </Form.Item>
                    ) : (
                      <Form.Item label="生成页面" name="is_create" extra="如果你创建的是末级菜单，请给它生成一个页面，父菜单不需要生成。">
                        <Radio.Group>
                          <Radio value={1}>是</Radio>
                          <Radio value={2}>否</Radio>
                        </Radio.Group>
                      </Form.Item>
                    )}
                  </>
                );
              }}
            </Form.Item>

            <Form.Item label="排序" name="sort_num" extra="排序值越大越靠后。">
              <InputNumber placeholder="请输入排序值" />
            </Form.Item>
            <Form.Item label="菜单状态" name="status" extra="停用后，菜单不会在admin系统中展示。">
              <Radio.Group>
                <Radio value={1}>启用</Radio>
                <Radio value={2}>停用</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      {/* 创建和修改页面 */}
      <CreatePage title="创建页面" createRef={createRef} update={() => getMyPageList()} />
    </>
  );
}
