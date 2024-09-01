import { useEffect, useState } from 'react';
import { Flex, Form, Input, Radio, FormInstance } from 'antd';
import { BorderOuterOutlined, BorderRightOutlined } from '@ant-design/icons';
import InputPx from './InputPx';

const MarginInput = ({ form }: { form: FormInstance }) => {
  const [type, setType] = useState('all');
  useEffect(() => {
    const margin = form.getFieldValue(['scopeStyle', 'margin']);
    if (margin) {
      setType('all');
    } else {
      setType('single');
    }
  }, [form.getFieldValue(['scopeStyle', 'margin'])]);
  const handleChange = (value: string) => {
    setType(value);
  };
  const basicLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  return (
    <>
      <Form.Item label="边距" layout="horizontal" {...basicLayout}>
        <Radio.Group optionType="button" value={type} buttonStyle="solid" onChange={(e) => handleChange(e.target.value)}>
          <Radio.Button value="all">
            <BorderOuterOutlined />
          </Radio.Button>
          <Radio.Button value="single">
            <BorderRightOutlined />
          </Radio.Button>
        </Radio.Group>
        {type === 'all' && (
          <Form.Item name={['scopeStyle', 'margin']} noStyle>
            <Input style={{ marginTop: 10 }} placeholder="边距: 10px" />
          </Form.Item>
        )}
        {type === 'single' && (
          <>
            <Flex gap={3} style={{ marginTop: 10 }}>
              <Form.Item name={['scopeStyle', 'margin']} hidden>
                <InputPx />
              </Form.Item>
              <Form.Item name={['scopeStyle', 'marginTop']} noStyle>
                <InputPx placeholder="T: 10" />
              </Form.Item>
              <Form.Item name={['scopeStyle', 'marginRight']} noStyle>
                <InputPx placeholder="R: 10" />
              </Form.Item>
            </Flex>
            <Flex gap={3} style={{ marginTop: 10 }}>
              <Form.Item name={['scopeStyle', 'marginBottom']} noStyle>
                <InputPx placeholder="B: 10" />
              </Form.Item>
              <Form.Item name={['scopeStyle', 'marginLeft']} noStyle>
                <InputPx placeholder="L: 10" />
              </Form.Item>
            </Flex>
          </>
        )}
      </Form.Item>
    </>
  );
};

export default MarginInput;
