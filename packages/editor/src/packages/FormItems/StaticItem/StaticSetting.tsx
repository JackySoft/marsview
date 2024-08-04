import { Form, Select } from 'antd';
import { useState } from 'react';
import VsEditor from '@/components/VsEditor';

const StaticSetting = () => {
  const [showType, setShowType] = useState('text');

  const handleChange = (value: string) => {
    setShowType(value);
  };
  return (
    <>
      <Form.Item label="空值展示" name={['formWrap', 'emptyType']}>
        <Select>
          <Select.Option value="">默认不显示</Select.Option>
          <Select.Option value="-">-</Select.Option>
          <Select.Option value="/">/</Select.Option>
          <Select.Option value="0">0</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="展示类型" name={['formWrap', 'showType']}>
        <Select onChange={handleChange}>
          <Select.Option value="text">文本</Select.Option>
          <Select.Option value="href">链接</Select.Option>
          <Select.Option value="image">图片</Select.Option>
        </Select>
      </Form.Item>
      {showType === 'text' && (
        <>
          <Form.Item label="日期格式" name={['formWrap', 'dateType']}>
            <Select>
              <Select.Option value="">无</Select.Option>
              <Select.Option value="YYYY-MM-DD HH:mm:ss">年-月-日 时:分:秒</Select.Option>
              <Select.Option value="YYYY-MM-DD">年-月-日</Select.Option>
              <Select.Option value="HH:mm:ss">时:分:秒</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="数字格式" name={['formWrap', 'numberType']}>
            <Select>
              <Select.Option value="">无</Select.Option>
              <Select.Option value="currency">金额千分位</Select.Option>
              <Select.Option value="decimal">数字千分位</Select.Option>
              <Select.Option value="percent">百分比</Select.Option>
            </Select>
          </Form.Item>
        </>
      )}

      <Form.Item label="自定义" tooltip="通过编程的方式，实现自定义渲染。"></Form.Item>
      <Form.Item name={['formWrap', 'script']} noStyle>
        <VsEditor />
      </Form.Item>
    </>
  );
};

export default StaticSetting;
