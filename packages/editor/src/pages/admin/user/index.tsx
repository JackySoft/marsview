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
import BaseTable from '../components/BaseTable';

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
  const projectId = useParams().id as string;

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
        projectId: parseInt(projectId),
        userName: name,
      });
      setLoading(false);
      setTotal(res?.total || 0);
      setList(res?.list || []);
    } catch (error) {
      setLoading(false);
    }
  };

  const getRoles = async () => {
    const roleList = await getRoleListAll(parseInt(projectId));
    setRoleList(roleList || []);
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
      content: `确认删除 ${record.userName} 吗？`,
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
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '系统角色',
      dataIndex: 'systemRole',
      render(type) {
        return type === 1 ? '管理员' : '普通用户';
      },
    },
    {
      title: '角色列表',
      dataIndex: 'roleId',
      render(roleId) {
        return roleList?.find((item) => item.id === roleId)?.name;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
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
      <BaseTable
        title={
          <Space>
            <span>用户列表</span>
            <Tooltip title="添加项目对应的用户，管理员默认具备该项目所有权限，普通用户可分配角色来精细化控制菜单和按钮。">
              <QuestionCircleOutlined />
            </Tooltip>
          </Space>
        }
        action={
          <Button type="primary" onClick={handleCreate}>
            添加
          </Button>
        }
      >
        <Table bordered rowKey="id" loading={loading} columns={columns} dataSource={list} pagination={pagination} />
      </BaseTable>
      <CreateUser mRef={userRef} update={getList} />
    </div>
  );
}
