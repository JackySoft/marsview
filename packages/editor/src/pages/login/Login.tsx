import { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api/user';
import storage from '@/utils/storage';
import { usePageStore } from '@/stores/pageStore';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.module.less';

type FieldType = {
  userName: string;
  userPwd: string;
};
export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const saveUserInfo = usePageStore((state) => state.saveUserInfo);

  // 登录
  const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
    setLoading(true);
    try {
      const res = await login(values);
      setLoading(false);
      if (res.token) {
        storage.set('token', res.token);
        saveUserInfo(res);
        if (location.search) {
          const params = new URLSearchParams(location.search);
          setTimeout(() => {
            const url = new URL(params.get('callback') as string);
            navigate(url.pathname || '/projects');
          });
        } else {
          navigate('/projects');
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
          <div className={style.title}>
            <img src="/imgs/mars-logo.png" width={45} />
            <span>Marsview</span>
          </div>
          <Form name="basic" layout="vertical" className={style.form} onFinish={onFinish} size="large" form={form}>
            <Form.Item<FieldType>
              name="userName"
              rules={[
                { required: true, message: '请输入邮箱' },
                { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入正确的邮箱' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入个人邮箱" autoComplete="off" allowClear />
            </Form.Item>

            <Form.Item<FieldType> style={{ marginTop: 32 }} name="userPwd" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined />} autoComplete="off" allowClear placeholder="请输入密码" />
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
