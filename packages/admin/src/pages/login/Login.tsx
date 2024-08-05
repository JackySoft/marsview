import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import style from './index.module.less';
import { login } from '@/api';
import storage from '@/utils/storage';
import { usePageStore } from '@/stores/pageStore';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
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
        <div className={style.left}>
          <img src="/imgs/login-bg.png" />
        </div>
        <div className={style.form}>
          <div className={style.title}>Marsview</div>
          <Form
            name="basic"
            layout="vertical"
            className={style.form}
            onFinish={onFinish}
            initialValues={{ userName: 'admin@marsview.cc', userPwd: '123456' }}
            autoComplete="off"
            size="large"
          >
            <Form.Item<FieldType> name="userName" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item<FieldType> style={{ marginTop: 32 }} name="userPwd" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password prefix={<LockOutlined />} />
            </Form.Item>

            <Form.Item style={{ marginTop: 40 }}>
              <Button type="primary" block htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
