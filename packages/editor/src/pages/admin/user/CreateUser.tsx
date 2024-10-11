import { useImperativeHandle, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Form, Input, Select, Radio, Spin } from 'antd';
import { useDebounceFn } from 'ahooks';
import { message } from '@/utils/AntdGlobal';
import { IAction, IModalProp } from '@/pages/types';
import { UserItem } from '@/api/types';
import { addUser, updateUser, getRoleListAll } from '@/api';
import { searchUser } from '@/api/user';
export default function CreateMenu(props: IModalProp<UserItem>) {
  const [form] = Form.useForm();
  const [action, setAction] = useState<IAction>('create');
  const [systemRole, setSystemRole] = useState<number>(1);
  const [users, setUsers] = useState<Array<{ id: string; user_name: string }>>([]);
  const [roleList, setRoleList] = useState<Array<{ id: number; name: string }>>([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const project_id = useParams().id as string;

  useImperativeHandle(props.mRef, () => ({
    open,
  }));

  // 打开弹框函数
  const open = async (type: IAction, data?: UserItem) => {
    setAction(type);
    setVisible(true);
    setSystemRole(data?.system_role || 1);
    setLoading(true);
    setConfirmLoading(false);
    try {
      const roleList = await getRoleListAll(parseInt(project_id));
      setRoleList(roleList);
      setLoading(false);
      if (data && project_id) {
        form.setFieldsValue({ ...data, project_id: parseInt(project_id) });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // 系统类型
  const handleRole = (val: number) => {
    setSystemRole(val);
  };

  // 搜索时，使用防抖
  const { run } = useDebounceFn(
    (val) => {
      if (!val) return;
      setUserLoading(true);
      searchUser(val).then((res) => {
        setUsers(
          res.map((item: any) => ({
            label: item.user_name,
            value: item.id,
          })),
        );
        setUserLoading(false);
      });
    },
    {
      wait: 800,
    },
  );

  // 菜单提交
  const handleSubmit = async () => {
    if (!project_id) return;
    const valid = await form.validateFields();
    if (valid) {
      setConfirmLoading(true);
      const { id, system_role, role_id = '', sso_info: { label, value } = { label: '', value: '' } } = form.getFieldsValue();
      try {
        if (action === 'create') {
          await addUser({
            system_role,
            user_id: value,
            user_name: label,
            project_id: parseInt(project_id),
            role_id,
          });
        } else {
          await updateUser({
            id,
            system_role,
            role_id,
          });
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
    setSystemRole(1);
    form.resetFields();
  };

  return (
    <>
      <Modal
        title={action === 'create' ? '创建用户' : '编辑用户'}
        width={600}
        open={visible}
        okText="确定"
        cancelText="取消"
        confirmLoading={confirmLoading}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Spin spinning={loading}>
          <Form form={form} labelAlign="right" labelCol={{ span: 4 }} initialValues={{ system_role: 1 }}>
            <Form.Item hidden name="id">
              <Input />
            </Form.Item>
            <Form.Item label="系统角色" name="system_role" extra="管理员拥有本系统所有功能权限，普通用户需要通过RBAC分配角色权限">
              <Radio.Group onChange={(event) => handleRole(event.target.value)}>
                <Radio value={1}>管理员</Radio>
                <Radio value={2}>普通用户</Radio>
              </Radio.Group>
            </Form.Item>
            {action === 'create' && (
              <Form.Item label="用户" name="sso_info" rules={[{ required: true, message: '请输入用户邮箱' }]}>
                <Select
                  labelInValue
                  filterOption={false}
                  showSearch
                  onSearch={run}
                  notFoundContent={userLoading ? <Spin size="small" /> : null}
                  options={users}
                  placeholder="请输入用户完整邮箱"
                />
              </Form.Item>
            )}

            {/* 只有普通用户才需要设置角色 */}
            {systemRole === 2 && (
              <Form.Item label="角色" name="role_id" rules={[{ required: true, message: '请输入菜单名称' }]}>
                <Select showSearch>
                  {roleList.map((item) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
          </Form>
        </Spin>
      </Modal>
    </>
  );
}
