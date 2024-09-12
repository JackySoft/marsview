import { Form } from 'antd';
import VsEditor from '@/components/VsEditor';

/**
 * 自定义渲染
 */
export default function TextSetting(props: any) {
  return (
    <>
      <Form.Item label="自定义" tooltip="通过编程的方式，实现自定义渲染。"></Form.Item>
      <Form.Item name={['script']} noStyle>
        <VsEditor />
      </Form.Item>
    </>
  );
}
