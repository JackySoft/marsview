import { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import { Avatar, Input, Upload, Button, Form, Alert, Spin, Modal } from 'antd';
import { CameraOutlined, EditOutlined, LockOutlined, PhoneOutlined, SaveOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons';
import { getUserProfile, updatePassword, updateUserProfile } from '@/api/user';
import { UserInfo } from '@/pages/types';
import { message } from '@/utils/AntdGlobal';
import { uploadImg } from '@/api';
import { useNavigate } from 'react-router-dom';
import { UserInfoStore, usePageStore } from '@/stores/pageStore';

const UserCenter = () => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editModalTitle, setEditModalTitle] = useState('');
  const [userNameEdit, setUserNameEdit] = useState(false);
  const [editType, setEditType] = useState(1);
  const [editorForm] = Form.useForm();
  const [editNickName, setEditNickName] = useState('');
  const editNickNameRef = useRef(editNickName);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: 0,
    nickName: '',
    userName: '',
    avatar: '',
    createdAt: '',
  });
  const saveUserInfo = usePageStore((state) => state.saveUserInfo);
  const [uploadLoading, setUploadLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const res = await getUserProfile();
    console.log(res);
    if (res) {
      setEditNickName(res.nickName);
      setUserInfo(res);
    }
  };

  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleUploadAvatar = async (file: any) => {
    setUploadLoading(true);
    uploadImg({ file })
      .then(async (res) => {
        setUploadLoading(false);
        const { url = '' } = res;
        if (url) {
          await updateUserInfo(2, url);
        }
      })
      .catch((error) => {
        message.error(error);
        setUploadLoading(false);
      });
  };

  const updateUserInfo = async (type: number, url = '') => {
    if (type === 1) {
      await updateUserProfile({ nickName: editNickNameRef.current || editNickName });
      saveUserInfo({ userId: userInfo.id, userName: editNickNameRef.current || editNickName });
      setUserNameEdit(false);
    } else if (type === 2) {
      await updateUserProfile({ avatar: url });
    }
    await getUserInfo();
  };

  const handleUserNameEdit = () => {
    updateUserInfo(1);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setUserNameEdit(false);
    }, 100);
  };

  const handleNicknameInputChange = (e: any) => {
    let value = e.target.value;
    if (value.length > 15) {
      value = value.slice(0, 15);
    }
    setEditNickName(value);
    editNickNameRef.current = value;
  };

  const handlePasswordSubmit = async (values: { oldPwd: string; userPwd: string; confirmPwd: string }) => {
    if (values.oldPwd === values.userPwd) {
      message.info('新密码不能和旧密码一致');
      return;
    }
    const res = await updatePassword(values);
    if (res) {
      message.success(res);
    }
    setEditModalVisible(false);
    localStorage.clear();
    navigate(`/login?callback=https://www.marsview.com.cn/projects`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerBanner} />
      <div className={styles.profileContent}>
        <div className={styles.profileInfo}>
          <div className={styles.avatarWrapper}>
            <Avatar
              src={userInfo.avatar || 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}
              size={128}
              className={styles.avatar}
            ></Avatar>
            <Upload
              showUploadList={false}
              beforeUpload={beforeUpload}
              customRequest={({ file }) => handleUploadAvatar(file)}
              className={styles.uploadOverlay}
            >
              {uploadLoading ? <Spin /> : <CameraOutlined className={styles.icon} />}
            </Upload>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>
              {userNameEdit ? (
                <>
                  <Input type="text" value={editNickName} onChange={(e) => handleNicknameInputChange(e)} onBlur={handleBlur} />
                  <div className={styles.nameAction} onClick={handleUserNameEdit}>
                    <SaveOutlined />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.nameInfo}>{userInfo.nickName}</div>
                  <div className={styles.nameAction} onClick={() => setUserNameEdit(true)}>
                    <EditOutlined />
                  </div>
                </>
              )}
            </div>
            <div className={styles.userEmail}>{userInfo.userName}</div>
          </div>
        </div>
        <div className={styles.baseSection}>
          <h2>基本信息</h2>
          <div className={styles.baseInfo}>
            <div className={styles.baseItem}>
              <span>User ID</span>
              <span>{userInfo.id}</span>
            </div>
            <div className={styles.baseItem}>
              <span>注册日期</span>
              <span>{userInfo.createdAt}</span>
            </div>
          </div>
        </div>
        <div className={styles.splitLine} />
        <div className={styles.settingsSection}>
          <h2>账号绑定</h2>
          <div className={styles.settingsInfo}>
            <div className={styles.settingsItem}>
              <div className={styles.settingsLeft}>
                <UserOutlined className={styles.settingsIcon} />
                <div className={styles.settingsContent}>
                  <span className={styles.settingsTitle}>域名绑定</span>
                  <span className={styles.settingsDesc}>敬请期待</span>
                </div>
              </div>
              <Button
                disabled
                onClick={() => {
                  setEditType(1);
                  setEditModalTitle('域名绑定');
                  setEditModalVisible(true);
                }}
              >
                绑定
              </Button>
            </div>
          </div>
          <div className={styles.settingsInfo}>
            <div className={styles.settingsItem}>
              <div className={styles.settingsLeft}>
                <PhoneOutlined className={styles.settingsIcon} />
                <div className={styles.settingsContent}>
                  <span className={styles.settingsTitle}>手机绑定</span>
                  <span className={styles.settingsDesc}>敬请期待</span>
                </div>
              </div>
              <Button disabled>绑定</Button>
            </div>
          </div>

          <div className={styles.settingsInfo}>
            <div className={styles.settingsItem}>
              <div className={styles.settingsLeft}>
                <WechatOutlined className={styles.settingsIcon} />
                <div className={styles.settingsContent}>
                  <span className={styles.settingsTitle}>微信绑定</span>
                  <span className={styles.settingsDesc}>敬请期待</span>
                </div>
              </div>
              <Button disabled>绑定</Button>
            </div>
          </div>
        </div>
        <div className={styles.splitLine} />
        <div className={styles.settingsSection}>
          <h2>账号安全</h2>
          <div className={styles.settingsInfo}>
            <div className={styles.settingsItem}>
              <div className={styles.settingsLeft}>
                <LockOutlined className={styles.settingsIcon} />
                <div className={styles.settingsContent}>
                  <span className={styles.settingsTitle}>密码修改</span>
                  <span className={styles.settingsDesc}>*********</span>
                </div>
              </div>
              <Button
                onClick={() => {
                  setEditType(2);
                  setEditModalTitle('密码修改');
                  setEditModalVisible(true);
                }}
              >
                修改
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Modal title={editModalTitle} open={editModalVisible} onCancel={() => setEditModalVisible(false)} footer={null}>
        {editType === 1 && (
          <Form form={editorForm} layout="vertical">
            <Form.Item label={null}>
              <Alert description="域名Account一经绑定则无法再次修改" showIcon type="info" />
            </Form.Item>
            <Form.Item label="Account" name="userAccount">
              <Input addonBefore="https://marsview.cc/" />
            </Form.Item>
            <Form.Item label={null}>
              <Button block type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        )}
        {editType === 2 && (
          <>
            <Form form={editorForm} layout="vertical" onFinish={handlePasswordSubmit} autoComplete="off">
              <Form.Item label="旧密码" name="oldPwd" rules={[{ required: true, message: '请输入旧密码' }]}>
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="新密码"
                name="userPwd"
                rules={[
                  { required: true, message: '请输入新密码' },
                  { min: 6, message: '密码长度不能少于6位' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="确认密码"
                name="confirmPwd"
                dependencies={['userPwd']}
                rules={[
                  { required: true, message: '请确认新密码' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('userPwd') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次输入的密码不一致'));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button block type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Modal>
    </div>
  );
};

export default UserCenter;
