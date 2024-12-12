import { Form } from 'antd';
import VsEditor from '@/components/VsEditor';

/**
 * 自定义渲染
 */
export default function TextSetting({ label, name }: { label: string; name: string | string[] }) {
  return (
    <>
      <Form.Item label={label} tooltip="formatter格式化函数"></Form.Item>
      <Form.Item name={name} noStyle>
        <VsEditor />
      </Form.Item>
    </>
  );
}
