import { Input, Form, Select } from 'antd';
import { useState } from 'react';

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
          <Form.Item label="日期格式化" name={['formWrap', 'dateType']}>
            <Select>
              <Select.Option value="">无</Select.Option>
              <Select.Option value="YYYY-MM-DD HH:mm:ss">YYYY-MM-DD HH:mm:ss</Select.Option>
              <Select.Option value="YYYY-MM-DD">YYYY-MM-DD</Select.Option>
              <Select.Option value="HH:mm:ss">HH:mm:ss</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="数字格式化" name={['formWrap', 'numberType']}>
            <Select>
              <Select.Option value="">无</Select.Option>
              <Select.Option value="currency">金额千分位</Select.Option>
              <Select.Option value="decimal">数字千分位</Select.Option>
              <Select.Option value="percent">百分比千分位</Select.Option>
            </Select>
          </Form.Item>
        </>
      )}

      <Form.Item label="脚本编辑" name="script">
        <Input.TextArea placeholder="支持三元表达式：a == 1?0:1" rows={3} />
      </Form.Item>
    </>
  );
};

export default StaticSetting;
