import { useRef } from 'react';
import { Button, Flex, List } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import VariableSetting from './VariableSetting';
import { PageVariable } from '@/packages/types';
import { usePageStore } from '@/stores/pageStore';
export default () => {
  const variableRef = useRef<{ open: (type: 'add' | 'edit', variable?: PageVariable) => void }>();
  // 页面组件
  const { variables, removeVariable } = usePageStore((state) => ({
    variables: state.page.pageData.variables,
    removeVariable: state.removeVariable,
  }));

  // 新增变量
  const handleAdd = () => {
    variableRef.current?.open('add');
  };

  // 修改变量
  const handleEdit = (event: React.MouseEvent, item: PageVariable) => {
    event.preventDefault();
    variableRef.current?.open('edit', item);
  };

  // 删除变量
  const handleRemove = (event: React.MouseEvent, name: string) => {
    event.preventDefault();
    removeVariable(name);
  };

  return (
    <>
      <Flex justify="space-between" align="center" style={{ borderBottom: '1px solid var(--mars-theme-card-border-color)' }}>
        <Button type="link" icon={<PlusOutlined />} onClick={() => handleAdd()}>
          新增
        </Button>
      </Flex>
      <List
        style={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}
        itemLayout="horizontal"
        dataSource={variables}
        renderItem={(item) => {
          return (
            <List.Item
              actions={[<a onClick={(event) => handleEdit(event, item)}>修改</a>, <a onClick={(event) => handleRemove(event, item.name)}>删除</a>]}
            >
              <List.Item.Meta title={`${item.name}`} description={item.remark} />
            </List.Item>
          );
        }}
      />
      <VariableSetting ref={variableRef} />
    </>
  );
};
