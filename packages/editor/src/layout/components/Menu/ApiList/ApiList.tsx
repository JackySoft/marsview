import { useRef } from 'react';
import { Button, Flex, List } from 'antd';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import SettingModal from '@/components/ApiConfig/components/SettingModal';
import { ApiType } from '@/packages/types';
import { usePageStore } from '@/stores/pageStore';
import InterceptorModal from '@/components/ApiConfig/components/InterceptorModal';
export default () => {
  const modalRef = useRef<{ showModal: (data?: any) => void }>();
  const interceptorRef = useRef<{ showModal: (data?: any) => void }>();
  // 页面组件
  const { apis, removeApi } = usePageStore((state) => ({
    apis: state.page.pageData.apis,
    removeApi: state.removeApi,
  }));

  // 新增接口
  const handleAdd = () => {
    modalRef.current?.showModal();
  };

  // 修改接口
  const handleEdit = (event: React.MouseEvent, item: ApiType) => {
    event.preventDefault();
    modalRef.current?.showModal(item.id);
  };

  // 删除删除
  const handleRemove = (event: React.MouseEvent, id: string) => {
    event.preventDefault();
    removeApi(id);
  };

  // 新增全局拦截器
  const handleInterceptors = () => {
    interceptorRef.current?.showModal();
  };

  return (
    <>
      <Flex justify="space-between" align="center" style={{ borderBottom: '1px solid var(--mars-theme-card-border-color)' }}>
        <Button type="link" icon={<PlusOutlined />} onClick={() => handleAdd()}>
          新增
        </Button>
        <Button type="link" icon={<SettingOutlined />} onClick={() => handleInterceptors()}>
          全局拦截器
        </Button>
      </Flex>
      <List
        style={{ height: 'calc(100vh - 150px)', overflowY: 'auto' }}
        itemLayout="horizontal"
        dataSource={Object.values(apis)}
        renderItem={(item) => {
          return (
            <List.Item
              actions={[<a onClick={(event) => handleEdit(event, item)}>修改</a>, <a onClick={(event) => handleRemove(event, item.id)}>删除</a>]}
            >
              <List.Item.Meta title={`${item.method} ${item.name}`} description={item.url} />
            </List.Item>
          );
        }}
      />
      {/* 接口设置 */}
      <SettingModal ref={modalRef}></SettingModal>
      {/* 拦截器设置 */}
      <InterceptorModal ref={interceptorRef}></InterceptorModal>
    </>
  );
};
