import { forwardRef, useImperativeHandle, useState } from 'react';
import { Form, Input, Modal } from 'antd';
function NodeConfig(_: any, ref: any) {
  const [visible, setVisible] = useState(false);
  const [fn, setFn] = useState<{ callback: (title: string) => void }>();
  const [form] = Form.useForm();
  useImperativeHandle(ref, () => {
    return {
      open(title: string, callback: (title: string) => void) {
        setVisible(true);
        setFn({ callback });
        form.setFieldsValue({
          title,
        });
      },
    };
  });
  // 关闭抽屉
  const onClose = () => {
    setVisible(false);
  };

  // 提交配置
  const onSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        fn?.callback(values.title);
        setVisible(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Modal title="节点修改" open={visible} onCancel={onClose} onOk={onSubmit}>
        <Form form={form} style={{ width: '80%', margin: '20px auto 0' }}>
          <Form.Item label="名称" name="title" rules={[{ required: true, message: '请输入节点名称' }]}>
            <Input placeholder="请输入节点名称" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default forwardRef(NodeConfig);
