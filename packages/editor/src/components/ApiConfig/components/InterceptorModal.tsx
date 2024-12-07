import { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Modal } from 'antd';
import HttpSetting from './HttpSetting';
import { usePageStore } from '@/stores/pageStore';

export type SettingModalProp = {
  update?: (id: string) => void;
};

const InterceptorModal = ({ update }: SettingModalProp, ref: any) => {
  const { interceptor, setInterceptor } = usePageStore((state) => {
    return {
      interceptor: state.page.pageData.interceptor,
      setInterceptor: state.setInterceptor,
    };
  });
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  // 初始化接口配置数据
  const initValue = {
    headers: [{ key: '', value: '' }],
    timeout: 8,
    timeoutErrorMessage: '请求超时，请稍后重试',
    requestInterceptor: `/**
 * config: 请求完整配置，请严格按照以下格式使用和返回
 * config.url: 请求地址,eg: config.url = 'https://xxx.marsview.cc/api/xxx'
 * config.params: Get请求对应参数,eg: config.params = {name:'xxx'}
 * config.data: Post请求对应数据,eg: config.data = {name:'xxx'}
 * config.timeout: 超时时间（秒）,eg: config.timeout = 5
 * config.headers: 请求头,eg: config.headers.token = 'xxx'
 */
function request(config){
    return config;
}`,
    responseInterceptor: `/**
* response: 返回值完整结构
* response.config: 请求完整配置。
* response.data: 请求返回数据
* response.headers: 请求头
* response.status: 请求状态码
*/
function response(response){
    return response;
}`,
  };
  useImperativeHandle(ref, () => ({
    showModal: () => {
      form.setFieldsValue({ ...initValue, ...interceptor });
      setOpen(true);
    },
  }));

  // 保存
  async function handleOk() {
    const valid = await form.validateFields();
    if (!valid) return;
    setInterceptor(form.getFieldsValue());
    handleCancel();
  }

  // 关闭弹框
  function handleCancel() {
    setOpen(false);
    form.resetFields();
  }
  return (
    <Modal width={'800px'} okText="确认" cancelText="取消" title="高级设置" open={open} onOk={handleOk} onCancel={handleCancel}>
      <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 19 }} style={{ maxWidth: 800 }} autoComplete="off">
        <HttpSetting />
      </Form>
    </Modal>
  );
};

export default forwardRef(InterceptorModal);
