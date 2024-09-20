import { Form, FormInstance, Input, Select, Radio } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

const FlexStyle = ({ form }: { form: FormInstance }) => {
  return (
    <>
      <Form.Item name={['scopeStyle', 'display']} label={'布局模式'}>
        <Select
          options={[
            {
              label: '内联布局 inline',
              value: 'inline',
            },
            {
              label: '块级布局 block',
              value: 'block',
            },
            {
              label: '内联块布局 inline-block',
              value: 'inline-block',
            },
            {
              label: '内联弹性布局 inline-flex',
              value: 'inline-flex',
            },
            {
              label: '块级弹性布局 flex',
              value: 'flex',
            },
            {
              label: '隐藏 none',
              value: 'none',
            },
          ]}
          suffixIcon={<CaretDownOutlined />}
        />
      </Form.Item>
      {['inline-flex', 'flex'].includes(form.getFieldValue(['scopeStyle', 'display'])) && (
        <>
          <Form.Item name={['scopeStyle', 'flexDirection']} label={'主轴方向'}>
            <Select
              options={[
                {
                  label: '水平',
                  value: 'row',
                },
                {
                  label: '垂直',
                  value: 'column',
                },
                {
                  label: '水平反转',
                  value: 'row-reverse',
                },
                {
                  label: '垂直反转',
                  value: 'column-reverse',
                },
              ]}
              suffixIcon={<CaretDownOutlined />}
            />
          </Form.Item>
          <Form.Item name={['scopeStyle', 'justifyContent']} label={'主轴对齐'}>
            <Select
              options={[
                {
                  label: '起点对齐',
                  value: 'flex-start',
                },
                {
                  label: '终点对齐',
                  value: 'flex-end',
                },
                {
                  label: '居中对齐',
                  value: 'center',
                },
                {
                  label: '两端对齐',
                  value: 'space-between',
                },
                {
                  label: '环绕对齐',
                  value: 'space-around',
                },
                {
                  label: '均匀对齐',
                  value: 'space-evenly',
                },
              ]}
              suffixIcon={<CaretDownOutlined />}
            />
          </Form.Item>
          <Form.Item name={['scopeStyle', 'alignItems']} label={'副轴对齐'}>
            <Select
              options={[
                {
                  label: '起点对齐',
                  value: 'flex-start',
                },
                {
                  label: '终点对齐',
                  value: 'flex-end',
                },
                {
                  label: '居中对齐',
                  value: 'center',
                },
                {
                  label: '文字基线对齐',
                  value: 'baseline',
                },
                {
                  label: '拉伸对齐',
                  value: 'stretch',
                },
              ]}
              suffixIcon={<CaretDownOutlined />}
            />
          </Form.Item>
          <Form.Item name={['scopeStyle', 'flexWrap']} label={'换行方式'} wrapperCol={{ span: 18 }}>
            <Radio.Group buttonStyle="solid" optionType="button">
              <Radio value="nowrap">不换</Radio>
              <Radio value="wrap">换行</Radio>
              <Radio value="wrap-reverse">逆换行</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={['scopeStyle', 'gap']} label={'间隙'}>
            <Input placeholder="eg: 10px" />
          </Form.Item>
        </>
      )}
    </>
  );
};

export default FlexStyle;
