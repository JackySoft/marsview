import { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Modal, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import BaseSetting from './BaseSetting';
import ReturnStructure from './ReturnStructure';
import ReturnTips from './ReturnTips';
import { usePageStore } from '@/stores/pageStore';
import { generateUUID } from '@/utils/util';

export type SettingModalProp = {
  update?: (id: string) => void;
};

const SettingModal = ({ update }: SettingModalProp, ref: any) => {
  const { apis, addApi, updateApi } = usePageStore((state) => ({
    apis: state.page.pageData.apis,
    addApi: state.addApi,
    updateApi: state.updateApi,
  }));
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  // 初始化接口配置数据
  const initValue = {
    method: 'GET',
    url: '',
    sourceType: 'json',
    params: [{ key: '', value: '' }],
    contentType: 'application/json',
    replaceData: 'merge',
    isCors: true,
    result: {
      code: 'code',
      data: 'data',
      msg: 'msg',
      codeValue: 0,
    },
    tips: {
      success: '请求成功',
      fail: '请求失败',
      isSuccess: true,
      isError: true,
    },
  };
  useImperativeHandle(ref, () => ({
    showModal: (id?: string) => {
      // 初始化接口配置数据
      const apiConfig = id ? apis[id] : {};
      if (id) {
        form.setFieldsValue({ ...apiConfig });
      } else {
        // 如果API不存在，则使用默认值初始化
        form.setFieldsValue({ ...initValue, ...apiConfig });
      }

      setOpen(true);
    },
  }));

  const items: TabsProps['items'] = [
    {
      key: 'base-set',
      label: `接口设置`,
      forceRender: true,
      children: <BaseSetting />,
    },
    {
      key: 'structure',
      label: '返回结构设置',
      forceRender: true,
      children: <ReturnStructure />,
    },
    {
      key: 'tips',
      label: '消息提示设置',
      forceRender: true,
      children: <ReturnTips />,
    },
  ];
  // 保存
  async function handleOk() {
    const valid = await form.validateFields();
    if (!valid) return;
    const values = form.getFieldsValue();
    // 如果有ID，只需要获取表单值进行合并即可，一定不能用values合并，因为里面包含初始化代码
    if (values.id) {
      updateApi(form.getFieldsValue());
    } else {
      const id = generateUUID();
      addApi({ ...initValue, ...form.getFieldsValue(), id: id });
    }
    // 确认后，把值回传给父组件
    update?.(values.id);

    handleCancel();
  }

  // 关闭弹框
  function handleCancel() {
    setOpen(false);
    form.resetFields();
  }
  return (
    <Modal width={'800px'} okText="确认" cancelText="取消" title="接口配置" open={open} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 19 }} style={{ maxWidth: 800 }} autoComplete="off">
        <Tabs defaultActiveKey="1" items={items} />
      </Form>
    </Modal>
  );
};

export default forwardRef(SettingModal);
