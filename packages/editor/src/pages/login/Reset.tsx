import { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAccountByToken, resetSubmit } from '@/api/user';
import { LockOutlined } from '@ant-design/icons';
import style from './index.module.less';
import { message } from '@/utils/AntdGlobal';
type FieldType = {
  userPwd: string;
  confirmPwd: string;
};
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState('');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('resetToken');
    if (!token) {
      setAccount('-');
      return;
    }
    getAccountByToken(token).then((res) => {
      setAccount(res);
    });
  }, []);

  // 登录或注册
  const onFinish: FormProps<FieldType>['onFinish'] = async (values: FieldType) => {
    try {
      const resetToken = searchParams.get('resetToken');
      if (!resetToken) {
        message.error('token不能为空');
        return;
      }
      if (values.confirmPwd != values.userPwd) {
        message.error('两次密码不一致，请重新输入');
        return;
      }
      setLoading(true);
      await resetSubmit({ resetToken, ...values });
      message.success('密码重置成功');
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 300);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className={style.resetContainer}>
      <div className={style.header} onClick={() => navigate('/login')}>
        <img src="/imgs/mars-logo.png" width={45} />
        <span>Marsview</span>
      </div>
      <div className={style.content}>
        <div className={style.title}>重置密码</div>
        <div className={style.account}>账户：{account}</div>
        <Form name="basic" layout="vertical" className={style.form} onFinish={onFinish} size="large" form={form}>
          <Form.Item<FieldType> name="userPwd" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined />} autoComplete="off" allowClear placeholder="请输入密码" />
          </Form.Item>

          <Form.Item<FieldType> style={{ marginTop: 32 }} name="confirmPwd" rules={[{ required: true, message: '请输入确认密码' }]}>
            <Input.Password prefix={<LockOutlined />} autoComplete="off" allowClear placeholder="确认密码" />
          </Form.Item>

          <Form.Item style={{ marginTop: 40 }}>
            <Button type="primary" block htmlType="submit" loading={loading}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
