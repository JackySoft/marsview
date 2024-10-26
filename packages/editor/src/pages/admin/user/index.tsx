import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Table, Space, Tooltip } from 'antd';
import { UserItem } from '@/api/types';
import { IAction } from '@/pages/types';
import { ColumnsType } from 'antd/es/table';
import { Modal, message } from '@/utils/AntdGlobal';
import CreateUser from './CreateUser';
import SearchForm from '../components/SearchForm';
import { getUserList, getRoleListAll, delUser } from '@/api';
import { QuestionCircleOutlined } from '@ant-design/icons';

/**
 * 用户配置
 * @returns
 */
export default function MenuList() {
  const [list, setList] = useState<UserItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(1);
  const [roleList, setRoleList] = useState<Array<{ id: number; name: string }>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const project_id = useParams().id as string;

  const userRef = useRef<{
    open: (type: IAction, data?: UserItem) => void;
  }>();

  useEffect(() => {
    getRoles();
    getList();
  }, []);

  // 获取用户列表
  const getList = async (pageNum: number = current) => {
    try {
      setLoading(true);
      const { name } = form.getFieldsValue();
      const res = await getUserList({
        pageNum,
        pageSize: 10,
        project_id: parseInt(project_id),
        user_name: name,
      });
      setLoading(false);
      setTotal(res?.total || 0);
      setList(res?.list || []);
    } catch (error) {
      setLoading(false);
    }
  };

  const getRoles = async () => {
    const roleList = await getRoleListAll(parseInt(project_id));
    setRoleList(roleList);
  };

  // 分页事件
  const handleChange = (page: number) => {
    setCurrent(page);
    getList(page);
  };

  // 创建用户
  const handleCreate = () => {
    userRef.current?.open('create');
  };

  // 编辑用户
  const handleEdit = (record: UserItem) => {
    userRef.current?.open('edit', record);
  };

  // 删除用户
  const handleDelete = (record: UserItem) => {
    Modal.confirm({
      title: '确认',
      content: `确认删除 ${record.user_name} 吗？`,
      onOk() {
        delUser({
          id: record.id,
        }).then(() => {
          message.success('删除成功');
          getList();
        });
      },
    });
  };

  const columns: ColumnsType<UserItem> = [
    {
      title: '用户名称',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: '系统角色',
      dataIndex: 'system_role',
      render(type) {
        return type === 1 ? '管理员' : '普通用户';
      },
    },
    {
      title: '角色列表',
      dataIndex: 'role_id',
      render(role_id) {
        return roleList.find((item) => item.id === role_id)?.name;
      },
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
            <Button type="text" danger onClick={() => handleDelete(record)}>
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
    <div>
      <SearchForm form={form} submit={getList} reset={getList}>
        <Form.Item label="用户名称" name="name">
          <Input placeholder="用户名称" />
        </Form.Item>
      </SearchForm>
      <div className="base-table">
        <div className="header-wrapper">
          <Space>
            <span>用户列表</span>
            <Tooltip title="添加项目对应的用户，管理员默认具备该项目所有权限，普通用户可分配角色来精细化控制菜单和按钮。">
              <QuestionCircleOutlined />
            </Tooltip>
          </Space>
          <div className="action">
            <Button type="primary" onClick={handleCreate}>
              新增
            </Button>
          </div>
        </div>
        <Table bordered rowKey="id" loading={loading} columns={columns} dataSource={list} pagination={pagination} />
      </div>
      <CreateUser mRef={userRef} update={getList} />
    </div>
  );
}
