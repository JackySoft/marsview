import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Table, Form, Input, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { message, Modal } from '@/utils/AntdGlobal';
import SearchForm from '../components/SearchForm';
import CreateRole from './CreateRole';
import SetPermission from './SetPermission';
import { getRoleList, delRoleById } from '@/api';
import { IAction } from '@/pages/types';
import { Role } from '@/api/types';
export default function RoleList() {
  const [list, setList] = useState<Role.RoleItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { id: project_id } = useParams();

  const roleRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void;
  }>();
  const permissionRef = useRef<{
    open: (data?: Role.RoleItem) => void;
  }>();
  useEffect(() => {
    getList();
  }, []);

  // 获取用户列表
  const getList = async (pageNum: number = current) => {
    if (!project_id) return;
    setLoading(true);
    const { name } = form.getFieldsValue();
    const res = await getRoleList({
      pageNum,
      pageSize: 10,
      project_id: parseInt(project_id),
      name,
    });
    setLoading(false);
    setTotal(res?.total || 0);
    setList(res?.list || []);
  };

  // 分页事件
  const handleChange = (page: number) => {
    setCurrent(page);
    getList(page);
  };

  // 创建角色
  const handleCreate = () => {
    roleRef.current?.open('create');
  };

  // 编辑角色
  const handleEdit = (data: Role.RoleItem) => {
    roleRef.current?.open('edit', data);
  };

  // 删除确认
  const handleDelete = (id: number) => {
    if (!project_id) return;
    Modal.confirm({
      title: '确认',
      content: <span>确认删除该角色吗？</span>,
      async onOk() {
        message.success('删除成功');
        await delRoleById({ id, project_id: parseInt(project_id) });
        getList();
      },
    });
  };

  // 设置权限
  const handleSetPermission = (record: Role.RoleItem) => {
    permissionRef.current?.open(record);
  };

  const columns: ColumnsType<Role.RoleItem> = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '创建人',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: '操作',
      key: 'action',
      render(_, record) {
        return (
          <Space>
            <Button type="text" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type="text" onClick={() => handleSetPermission(record)}>
              设置权限
            </Button>
            <Button type="text" onClick={() => handleDelete(record.id)} danger>
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  const pagination = {
    current,
    total,
    pageSize: 10,
    showTotal: (total: number) => `共 ${total} 条`,
    onChange: handleChange,
  };
  return (
    <div className="role-wrap">
      <SearchForm form={form} submit={getList} reset={getList}>
        <Form.Item name="name" label="角色名称">
          <Input placeholder="请输入角色名称" />
        </Form.Item>
      </SearchForm>
      <div className="base-table">
        <div className="header-wrapper">
          <div className="title">角色列表</div>
          <div className="action">
            <Button type="primary" onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey="id" loading={loading} columns={columns} dataSource={list} pagination={pagination} />
      </div>
      {/* 创建角色组件 */}
      <CreateRole mRef={roleRef} update={getList} />
      {/* 设置权限 */}
      <SetPermission mRef={permissionRef} update={getList} />
    </div>
  );
}
