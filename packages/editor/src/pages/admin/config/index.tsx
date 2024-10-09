import { useEffect, useState, memo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Space, Image, Radio, Switch, Tag } from 'antd';
import { message } from '@/utils/AntdGlobal';
import { RollbackOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import UploadImages from '@/components/UploadImages/UploadImages';
import ColorPicker from '@/components/ColorPicker';
import { getProjectDetail, updateProject, addProject } from '@/api';
import MemberSetting from '@/layout/components/Menu/Member/MemberSetting';
import api, { PageMember } from '@/api/pageMember';
import styles from './index.module.less';

/**
 * 项目配置
 */
const Config: React.FC = memo(() => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [type, setType] = useState<'detail' | 'edit' | 'create'>('detail');

  const navigate = useNavigate();
  // 项目加载
  useEffect(() => {
    if (!id) return;
    if (id === '0') {
      setType('create');
      return;
    }
    getProjectDetail(parseInt(id)).then((res) => {
      form.setFieldsValue(res);
    });
  }, []);

  // 项目提交
  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setLoading(true);
      if (type === 'create') {
        await addProject(values);
        message.success('创建成功');
        navigate('/projects');
      } else {
        await updateProject(values);
        message.success('更新成功');
      }
      setLoading(false);
      setType('detail');
    } catch (error) {
      setLoading(false);
    }
  };

  // 属性设置：默认只读，编辑模式下可输入
  const props: {
    disabled: boolean;
    variant: 'outlined' | 'borderless';
  } = {
    disabled: type === 'detail',
    variant: type === 'detail' ? 'borderless' : 'outlined',
  };

  return (
    <>
      <Form
        form={form}
        initialValues={{
          is_public: 1,
          layout: 1,
          menu_mode: 'inline',
          menu_theme_color: 'dark',
          system_theme_color: '#1677ff',
          breadcrumb: true,
          tag: true,
          footer: false,
          logo: 'https://marsview.cdn.bcebos.com/mars-logo.png',
        }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        className={styles.form}
        size="middle"
        onFinish={handleSubmit}
      >
        <Form.Item label="项目ID" name="id" hidden>
          <Input />
        </Form.Item>
        <h3>基础配置</h3>
        <Form.Item label="项目名称" name="name" rules={[{ required: true, message: '请输入项目名称' }]}>
          <Input placeholder={'项目名称: Mars'} {...props} maxLength={15} showCount />
        </Form.Item>
        <Form.Item label="项目描述" name="remark" rules={[{ required: true, message: '请输入项目描述' }]}>
          <Input.TextArea autoSize placeholder={'请输入项目描述'} maxLength={20} showCount={type !== 'detail'} {...props} />
        </Form.Item>
        <Form.Item label="LOGO" name="logo" rules={[{ required: true, message: '请上传项目Logo' }]}>
          {type === 'detail' ? <ImageFC /> : <UploadImages />}
        </Form.Item>
        <h3>系统配置</h3>
        <Form.Item label="系统布局" name="layout">
          <Radio.Group {...props}>
            <Radio value={1}>
              <img style={{ width: 150 }} src="/imgs/layout-1.png" alt="左右布局" />
            </Radio>
            <Radio value={2}>
              <img style={{ width: 150 }} src="/imgs/layout-2.png" alt="上左右下布局" />
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="菜单模式" name="menu_mode">
          <Radio.Group {...props} buttonStyle="solid">
            <Radio.Button value="vertical">垂直</Radio.Button>
            {/* <Radio.Button value="horizontal">水平</Radio.Button> */}
            <Radio.Button value="inline">内嵌</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="菜单主题" name="menu_theme_color">
          <Radio.Group {...props}>
            <Radio value="dark">深色</Radio>
            <Radio value="light">浅色</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="系统主题色" name="system_theme_color">
          <ColorPicker {...props} />
        </Form.Item>
        <Form.Item label="面包屑" name="breadcrumb" valuePropName="checked">
          <Switch {...props} />
        </Form.Item>
        <Form.Item label="多页签" name="tag" valuePropName="checked">
          <Switch {...props} />
        </Form.Item>
        <Form.Item label="页脚" name="footer" valuePropName="checked">
          <Switch {...props} />
        </Form.Item>
        <h3>权限配置</h3>
        <Form.Item
          label="访问权限"
          tooltip="项目访问权限"
          extra="公开项目所有人可访问；私有项目可通过RBAC分配菜单权限。"
          name="is_public"
          rules={[{ required: true, message: '请输入项目描述' }]}
        >
          <Radio.Group {...props}>
            <Radio value={1}>公开</Radio>
            <Radio value={2}>私有</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="开发权限" tooltip="项目配置修改权限" extra="只有开发者才能修改当前项目配置。">
          <Developer />
        </Form.Item>
        <div className={styles.editBtn}>
          {type === 'detail' ? (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setType('edit');
              }}
            >
              编辑
            </Button>
          ) : (
            <Space>
              <Button type="primary" icon={<SaveOutlined />} loading={loading} onClick={handleSubmit}>
                保存
              </Button>
              {id !== '0' && (
                <Button icon={<RollbackOutlined />} onClick={() => setType('detail')}>
                  取消
                </Button>
              )}
            </Space>
          )}
        </div>
      </Form>
    </>
  );
});

// 图片渲染
const ImageFC = ({ value }: any) => {
  return <Image src={value} style={{ width: 100 }} />;
};

// 添加开发者
const Developer = ({ value, onChange }: any) => {
  const projectId = useParams().id as string;
  const memberRef = useRef<{ open: (type: 1 | 2, projectId: number) => void }>();
  const [list, setList] = useState<PageMember[]>([]);
  // 开发者权限
  useEffect(() => {
    if (projectId == '0') return;
    getMemberList();
  }, []);

  // 获取用户列表
  const getMemberList = async () => {
    const res = await api.getMemberList({ page_id: parseInt(projectId) });
    setList(res.list);
  };

  // 新增用户
  const handleAdd = () => {
    memberRef.current?.open(1, parseInt(projectId));
  };

  // 删除用户
  const handleDelete = async (id: number) => {
    await api.deletePageMember({ id });
    setList(list.filter((item) => item.id != id));
  };
  return (
    <>
      {projectId == '0' ? (
        '项目创建以后，才能添加开发者'
      ) : (
        <>
          <Space>
            {list.map((item) => (
              <Tag key={item.id} color="green" closable onClose={() => handleDelete(item.id)}>
                {item.user_name}
              </Tag>
            ))}
          </Space>
          <Button type="link" onClick={handleAdd}>
            添加
          </Button>
        </>
      )}
      <MemberSetting ref={memberRef} update={getMemberList} />
    </>
  );
};

export default Config;
