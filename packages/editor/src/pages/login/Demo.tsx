import { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Flex, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login, sendEmail } from '@/api/user';
import storage from '@/utils/storage';
import { usePageStore } from '@/stores/pageStore';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import style from './index.module.less';
type FieldType = {
  userName: string;
  code?: number;
  userPwd: string;
};
export default function Login() {
  const [type, setType] = useState('login');
  const [count, setCount] = useState(0);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const saveUserInfo = usePageStore((state) => state.saveUserInfo);

  // 生成验证码
  const handleCreateCode = () => {
    form.validateFields(['userName']).then(async ({ userName }) => {
      setLoading1(true);
      try {
        await sendEmail({ email: userName });
        setCount(60);
        setLoading1(false);
      } catch (error) {
        setLoading1(false);
      }
    });
  };

  // 登录或注册
  const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
    setLoading2(true);
    try {
      const res = await login<FieldType>(values);
      setLoading2(false);
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
      setLoading2(false);
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
            <span>Demo体验</span>
          </div>
          <Form
            name="basic"
            layout="vertical"
            className={style.form}
            initialValues={{
              userName: 'demo@marsview.cc',
              userPwd: 'marsview',
            }}
            onFinish={onFinish}
            size="large"
            form={form}
          >
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
              <Input.Password prefix={<LockOutlined />} autoComplete="off" allowClear />
            </Form.Item>

            <Form.Item style={{ marginTop: 40 }}>
              <Button type="primary" block htmlType="submit" loading={loading2}>
                体验号登录
              </Button>
            </Form.Item>
            <Form.Item style={{ marginTop: 40 }}>
              <Flex justify="center" gap={20}>
                <a
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  返回注册
                </a>
              </Flex>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
