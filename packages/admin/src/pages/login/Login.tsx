import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import style from './index.module.less';
import { login } from '@/api';
import storage from '@/utils/storage';
import { usePageStore } from '@/stores/pageStore';
type FieldType = {
  userName: string;
  userPwd: string;
};
export default function Login() {
  const saveUserInfo = usePageStore((state) => state.saveUserInfo);
  const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
    const res = await login<FieldType>(values);
    if (res.token) {
      storage.set('token', res.token);
      saveUserInfo(res);
      const params = new URLSearchParams(location.search);
      setTimeout(() => {
        location.href = params.get('callback') || '/welcome';
      });
    }
  };
  return (
    <div className={style.container}>
      <div className={style.login}>
        <div className={style.title}>Mars低代码</div>
        <Form
          name="basic"
          layout="vertical"
          className={style.form}
          onFinish={onFinish}
          initialValues={{ userName: 'admin@marsview.cc', userPwd: '123456' }}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="用户名" name="userName" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label="密码" name="userPwd" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
