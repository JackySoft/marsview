import { useEffect, useState } from 'react';
import { Flex, Form, Input, Radio, FormInstance } from 'antd';
import { BorderOuterOutlined, BorderRightOutlined } from '@ant-design/icons';
import InputPx from './InputPx';

const PaddingInput = ({ form }: { form: FormInstance }) => {
  const [type, setType] = useState('all');
  useEffect(() => {
    const margin = form.getFieldValue(['scopeStyle', 'padding']);
    if (margin) {
      setType('all');
    } else {
      setType('single');
    }
  }, [form.getFieldValue(['scopeStyle', 'padding'])]);
  const handleChange = (value: string) => {
    setType(value);
  };

  return (
    <>
      <Form.Item label="填充">
        <Radio.Group optionType="button" value={type} buttonStyle="solid" onChange={(e) => handleChange(e.target.value)} style={{ marginBottom: 10 }}>
          <Radio.Button value="all">
            <BorderOuterOutlined />
          </Radio.Button>
          <Radio.Button value="single">
            <BorderRightOutlined />
          </Radio.Button>
        </Radio.Group>
        {type === 'all' && (
          <Form.Item name={['scopeStyle', 'padding']} noStyle>
            <InputPx style={{ marginTop: 10 }} placeholder="填充: 10px" />
          </Form.Item>
        )}
        {type === 'single' && (
          <>
            <Flex gap={3}>
              <Form.Item name={['scopeStyle', 'padding']} hidden>
                <InputPx placeholder="M" />
              </Form.Item>
              <Form.Item name={['scopeStyle', 'paddingTop']} noStyle>
                <InputPx placeholder="T: 10" />
              </Form.Item>
              <Form.Item name={['scopeStyle', 'paddingRight']} noStyle>
                <InputPx placeholder="R: 10" />
              </Form.Item>
            </Flex>
            <Flex gap={3} style={{ marginTop: 10 }}>
              <Form.Item name={['scopeStyle', 'paddingBottom']} noStyle>
                <InputPx placeholder="B: 10" />
              </Form.Item>
              <Form.Item name={['scopeStyle', 'paddingLeft']} noStyle>
                <InputPx placeholder="L: 10" />
              </Form.Item>
            </Flex>
          </>
        )}
      </Form.Item>
    </>
  );
};

export default PaddingInput;
