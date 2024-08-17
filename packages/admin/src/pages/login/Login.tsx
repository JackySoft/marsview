import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api';
import storage from '@/utils/storage';
import { usePageStore } from '@/stores/pageStore';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.module.less';
type FieldType = {
  userName: string;
  userPwd: string;
};
export default function Login() {
  const navigate = useNavigate();
  const saveUserInfo = usePageStore((state) => state.saveUserInfo);
  const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
    const res = await login<FieldType>(values);
    if (res.token) {
      storage.set('token', res.token);
      saveUserInfo(res);
      if (location.search) {
        const params = new URLSearchParams(location.search);
        setTimeout(() => {
          const url = new URL(params.get('callback') as string);
          navigate(url.pathname || '/welcome');
        });
      } else {
        navigate('/');
      }
    }
  };
  return (
    <div className={style.container}>
      <div className={style.login}>
        <div className={style.left}>
          <img src="/imgs/login-bg.png" />
        </div>
        <div className={style.form}>
          <div className={style.title}>
            <img src="/imgs/mars-logo.png" width={45} />
            <span>Marsview</span>
          </div>
          <Form
            name="basic"
            layout="vertical"
            className={style.form}
            onFinish={onFinish}
            initialValues={{ userName: 'demo@marsview.cc', userPwd: 'marsview' }}
            autoComplete="off"
            size="large"
          >
            <Form.Item<FieldType> name="userName" rules={[{ required: true, message: '请输入邮箱' }]}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>

            <Form.Item<FieldType> style={{ marginTop: 32 }} name="userPwd" rules={[{ required: true, message: '请输入密码' }]}>
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
