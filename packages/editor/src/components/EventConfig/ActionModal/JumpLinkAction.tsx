import { useEffect } from 'react';
import { Form, Divider, Input, Switch, Radio, FormInstance } from 'antd';
import styles from './index.module.less';
const OpenModalAction = ({ form }: { form: FormInstance }) => {
  useEffect(() => {
    form.setFieldsValue({
      jumpType: 'route',
    });
  }, []);
  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>
          跳转到指定页面。1. 系统内跳转会通过自身路由实现；2. 跨服务跳转主要是基于microApp的父子应用通信方式，主应用需要监听数据，并添加跳转代码；3.
          超链接跳转通过window.open或location方式实现；
        </p>
        <Divider />
      </div>
      <Form.Item label="跳转方式" name={'jumpType'}>
        <Radio.Group buttonStyle="solid">
          <Radio.Button value="route">系统内跳转</Radio.Button>
          <Radio.Button value="micro">跨服务跳转</Radio.Button>
          <Radio.Button value="link">超链接跳转</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="页面地址" name={'url'} rules={[{ required: true, message: '请输入跳转地址' }]}>
        <Input.TextArea placeholder="请输入页面地址" rows={4} />
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {() => {
          return form.getFieldValue('jumpType') === 'link' ? (
            <Form.Item label="新窗口" name={'isNewWindow'}>
              <Switch />
            </Form.Item>
          ) : null;
        }}
      </Form.Item>
    </>
  );
};
export default OpenModalAction;
