import { Divider, Form, Input, Radio, Select } from 'antd';
import { useEffect, useState } from 'react';
import { getChatGroups } from '@/api/robot';
import styles from './index.module.less';

const SendMessageAction = () => {
  const [groups, setGroups] = useState([]);
  useEffect(() => {
    getChatGroups().then((res: any) => {
      setGroups(res.items);
    });
  }, []);
  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>触发事件后，可以通过此功能发送飞书消息。</p>
        <Divider />
      </div>
      <Form.Item label="消息类型" name="msgType" rules={[{ required: true, message: '请选择消息类型' }]}>
        <Radio.Group buttonStyle="solid" optionType="button">
          <Radio.Button value="text">文本消息</Radio.Button>
          <Radio.Button value="interactive">卡片消息</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {(form: any) => {
          const msgType = form.getFieldValue('msgType');
          return msgType === 'text' ? (
            <Form.Item label="消息内容" name="content" rules={[{ required: true, message: '请输入消息内容' }]}>
              <Input placeholder="请输入消息内容" />
            </Form.Item>
          ) : (
            <Form.Item
              label="卡片模板"
              name={'templateId'}
              tooltip="去飞书创建卡片模板后，复制ID到此处"
              rules={[{ required: true, message: '请输入卡片模板ID' }]}
            >
              <Input placeholder="请输入卡片模板ID" />
            </Form.Item>
          );
        }}
      </Form.Item>
      <Form.Item
        label="接收群组"
        name="receiveId"
        tooltip="如果没有对应群组，需要先添加机器人到对应群组。当前暂不支持发送到某个用户。"
        rules={[{ required: true, message: '请选择消息发送的群组' }]}
      >
        <Select placeholder="请选择">
          {groups.map((item: any) => {
            return (
              <Select.Option key={item.chat_id} value={item.chat_id}>
                {item.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </>
  );
};
export default SendMessageAction;
