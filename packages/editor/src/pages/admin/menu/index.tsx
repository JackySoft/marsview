import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Form, Input, Button, Table, Select, Badge } from 'antd';
import { Menu } from '@/api/types';
import { IAction } from '@/pages/types';
import { ColumnsType } from 'antd/es/table';
import { Modal, message } from '@/utils/AntdGlobal';
import CreateMenu from './CreateMenu';
import SearchForm from '../components/SearchForm';
import { getMenuList, delMenu, copyMenu } from '@/api';
import { arrayToTree } from '@/utils/util';
import * as icons from '@ant-design/icons';
import BaseTable from '../components/BaseTable';

/**
 * 菜单配置
 * @returns
 */
export default function MenuList() {
  const [form] = Form.useForm();
  const [data, setData] = useState<Menu.MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const projectId = useParams().id as string;

  const menuRef = useRef<{
    open: (type: IAction, data: Menu.EditParams | { parentId?: number; sortNum?: number }, list?: Menu.MenuItem[]) => void;
  }>();

  useEffect(() => {
    getMenus();
  }, []);

  // 获取菜单列表
  const getMenus = async () => {
    const { name, status } = form.getFieldsValue();
    if (!projectId) return;
    setLoading(true);
    const res = await getMenuList({
      projectId: parseInt(projectId),
      name,
      status,
    });
    setLoading(false);
    if (name || status > 0) {
      // 如果带条件搜索，直接返回，不需要生成树结构
      setData(res.list || []);
    } else {
      const menuData = arrayToTree(res.list);
      setData(menuData || []);
    }
  };

  // 创建菜单
  const handleCreate = () => {
    menuRef.current?.open('create', {
      sortNum: data.length,
    });
  };

  // 复制菜单
  const handleCopy = async (record: Menu.MenuItem) => {
    setLoading(true);
    await copyMenu({
      id: record.id,
    });
    message.success('复制成功');
    getMenus();
  };

  // 创建子菜单
  const handleSubCreate = (record: Menu.MenuItem) => {
    menuRef.current?.open('create', { parentId: record.id, sortNum: (record.children?.length || 0) + 1 });
  };

  // 编辑菜单
  const handleEdit = (record: Menu.MenuItem) => {
    menuRef.current?.open('edit', record, data);
  };

  // 删除菜单
  const handleDelete = (record: Menu.MenuItem) => {
    let text = '';
    if (record.type == 1) text = '菜单';
    if (record.type == 2) text = '按钮';
    if (record.type == 3) text = '页面';
    Modal.confirm({
      title: '确认',
      content: `${text}删除后不可恢复，确认删除吗？`,
      onOk() {
        handleDelSubmit(record.id);
      },
    });
  };

  // 删除提交
  const handleDelSubmit = async (id: number) => {
    setLoading(true);
    await delMenu({ id });
    message.success('删除成功');
    getMenus();
  };

  const columns: ColumnsType<Menu.MenuItem> = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      width: 220,
      align: 'center',
      fixed: 'left',
    },
    {
      title: '菜单图标',
      dataIndex: 'icon',
      key: 'icon',
      align: 'center',
      width: 120,
      render(icon: string) {
        if (!icon) return '-';
        const iconsList: { [key: string]: any } = icons;
        return React.createElement(iconsList[icon], {
          style: {
            fontSize: '25px',
          },
        });
      },
    },
    {
      title: '菜单类型',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      width: 120,
      render(type: number) {
        return {
          1: '菜单',
          2: '按钮',
          3: '页面',
        }[type];
      },
    },
    {
      title: '权限标识',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      width: 120,
      render(code: string) {
        if (!code) return '-';
        return code;
      },
    },
    {
      title: '绑定页面',
      dataIndex: 'pageId',
      key: 'pageId',
      align: 'center',
      width: 120,
      render(pageId: string) {
        return pageId;
      },
    },
    {
      title: '排序值',
      dataIndex: 'sortNum',
      key: 'sortNum',
      align: 'center',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 120,
      render(status: number) {
        if (status === 1) return <Badge status="success" text="正常" />;
        if (status === 2) return <Badge status="error" text="停用" />;
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      align: 'center',
      width: 180,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 180,
    },
    {
      title: '创建人',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
      width: 200,
    },
    {
      title: '操作',
      key: 'action',
      width: 320,
      fixed: 'right',
      render(_, record) {
        return (
          <>
            <Button type="link" onClick={() => handleCopy(record)}>
              复制
            </Button>
            <Button type="link" onClick={() => handleSubCreate(record)}>
              新增
            </Button>
            <Button type="link" onClick={() => handleEdit(record)}>
              编辑
            </Button>
            <Button type="link" danger onClick={() => handleDelete(record)}>
              删除
            </Button>
            {record.pageId > 0 && <Link to={`/editor/${record.pageId}/edit`}>去设计</Link>}
          </>
        );
      },
    },
  ];
  return (
    <div>
      <SearchForm form={form} initialValues={{ status: -1 }} submit={getMenus} reset={getMenus}>
        <Form.Item label="菜单名称" name="name">
          <Input placeholder="菜单名称" />
        </Form.Item>
        <Form.Item label="菜单状态" name="status">
          <Select style={{ width: 100 }}>
            <Select.Option value={-1}>所有</Select.Option>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </Form.Item>
      </SearchForm>
      <BaseTable
        title="菜单列表"
        action={
          <Button type="primary" onClick={handleCreate}>
            新增
          </Button>
        }
      >
        <Table bordered rowKey="id" loading={loading} columns={columns} dataSource={data} pagination={false} scroll={{ x: 1100 }} />
      </BaseTable>
      {/* 新增菜单 */}
      <CreateMenu mRef={menuRef} update={getMenus} />
    </div>
  );
}
