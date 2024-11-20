import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api';
import storage from '@/utils/storage';
import { usePageStore } from '@marsview/materials/stores/pageStore';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.module.less';
import { useState } from 'react';
type FieldType = {
  userName: string;
  userPwd: string;
};
export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const saveUserInfo = usePageStore((state) => state.saveUserInfo);
  const [form] = Form.useForm();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
    setLoading(true);
    try {
      const res = await login<FieldType>(values);
      if (res.token) {
        storage.set('token', res.token);
        saveUserInfo(res);
        setLoading(false);
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
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className={style.container}>
      <div className={style.login}>
        <div className={style.left}>
          <img src="/imgs/login-bg.png" />
        </div>
        <div className={style.form}>
          <div className={style.title}>用户登录</div>
          <Form name="basic" layout="vertical" className={style.form} onFinish={onFinish} autoComplete="off" size="large" form={form}>
            <Form.Item<FieldType> name="userName" rules={[{ required: true, message: '请输入邮箱' }]}>
              <Input prefix={<UserOutlined />} allowClear placeholder="输入个人邮箱" />
            </Form.Item>

            <Form.Item<FieldType> style={{ marginTop: 32 }} name="userPwd" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="输入密码" allowClear />
            </Form.Item>

            <Form.Item style={{ marginTop: 40 }}>
              <Button type="primary" block htmlType="submit" loading={loading}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
