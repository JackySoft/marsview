import { Menu, Role } from '@/api/types';
import { IModalPropData } from '@/pages/types';
import { Modal, Form, Tree } from 'antd';
import { useEffect, useImperativeHandle, useState } from 'react';
import { message } from '@/utils/AntdGlobal';
import { useParams } from 'react-router-dom';
import { getMenuList, updateRoleLimits } from '@/api';
import { arrayToTree } from '@/utils/util';

export default function SetPermission(props: IModalPropData<Role.RoleItem>) {
  const [visible, setVisible] = useState(false);
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const [roleInfo, setRoleInfo] = useState<Role.RoleItem>();
  const [permission, setPermission] = useState<Role.Permission>();
  const projectId = useParams().id as string;

  useEffect(() => {
    getTreeMenu();
  }, []);

  const getTreeMenu = async () => {
    if (!projectId) return;
    const res = await getMenuList({
      projectId: parseInt(projectId),
    });
    const menuData = arrayToTree(res.list);
    setMenuList(menuData || []);
  };

  // 暴露组件方法
  useImperativeHandle(props.mRef, () => {
    return {
      open,
    };
  });

  const open = (data: Role.RoleItem) => {
    setVisible(true);
    setRoleInfo(data);
    setPermission({
      id: roleInfo?.id || 0,
      projectId: parseInt(projectId),
      checked: data.checked,
      halfChecked: data.halfChecked,
    });
    setCheckedKeys(data.checked?.split(',').map((key: string) => parseInt(key)) || []);
  };

  // 节点选中
  const onCheck = (checkedKeysValue: any, item: any) => {
    setCheckedKeys(checkedKeysValue);
    const checkedKeys: number[] = [];
    const parentKeys: number[] = [];
    item.checkedNodes.map((node: Menu.MenuItem) => {
      // 只保留按钮ID，当做选中的ID，父节点一律作为半全选节点，目的是防止后来新增的按钮也被选中
      if (node.type === 2 || (node.type === 1 && !node.children)) {
        checkedKeys.push(node.id);
      } else {
        parentKeys.push(node.id);
      }
    });
    setPermission({
      id: roleInfo?.id || 0,
      projectId: parseInt(projectId),
      checked: checkedKeys.join(','),
      halfChecked: parentKeys.concat(item.halfCheckedKeys).join(','),
    });
  };

  const handleOk = async () => {
    if (permission) {
      await updateRoleLimits(permission);
      message.success('权限设置成功');
      handleCancel();
      props.update();
    }
  };

  // 取消
  const handleCancel = () => {
    setVisible(false);
    setPermission(undefined);
  };

  return (
    <Modal title="设置权限" width={600} open={visible} okText="确定" cancelText="取消" onOk={handleOk} onCancel={handleCancel}>
      <Form labelAlign="right" labelCol={{ span: 4 }}>
        <Form.Item label="角色名称">{roleInfo?.name}</Form.Item>
        <Form.Item label="权限">
          <Tree
            checkable
            defaultExpandAll
            fieldNames={{
              title: 'name',
              key: 'id',
              children: 'children',
            }}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={menuList}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
