import { memo, useEffect, useState } from 'react';
import { Select, Form, Input, Slider, Radio, Tooltip, Flex, InputNumber } from 'antd';
import { useDebounceFn } from 'ahooks';
import { CaretDownOutlined, AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined } from '@ant-design/icons';
import { parseStyle } from '@/utils/util';
import MColorPicker from '../ColorPicker';
import { usePageStore } from '@/stores/pageStore';
import BackgroundImage from './BackgroundImage';
import BackgroundSize from './BackgroundSize';
import MarginInput from './MarginInput';
import PaddingInput from './PaddingInput';
import FlexStyle from './FlexStyle';
import TitleStyle from './TitleStyle';
import Shadow from './Shadow';
import VsEditor from '../VsEditor';
import InputPx from './InputPx';
import styles from './index.module.less';
import { styled } from 'styled-components';
// 修复contextmenu被裁剪显示不完整问题
const StyleCodeEditor = styled.div`
  .suggest-widget {
    width: 100% !important;
    left: 0 !important;
    max-width: 500px !important;
  }
`;
/**
 * 通用样式-配置组件
 */
const StyleConfig = () => {
  const [isRender, setRender] = useState(false);
  const state = usePageStore();
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    // 填充页面样式
    if (!state.selectedElement) {
      form.setFieldValue('scopeCss', state.page.pageData.config.scopeCss || '/* 请在此处添加样式*/\n.marsview{\n\n}');
      form.setFieldValue('scopeStyle', state.page.pageData.config.scopeStyle);
    } else {
      // 填充组件样式
      const config = state.page.pageData.elementsMap[state.selectedElement.id]?.config || {};
      form.setFieldValue('scopeCss', config.scopeCss || '/* 请在此处添加样式*/\n.marsview{\n\n}');
      form.setFieldValue('scopeStyle', config.scopeStyle || config.style);
      // 无实际作用，主要用于触发组件更新
      setRender(!isRender);
    }
  }, [state.selectedElement]);

  // 采用防抖，防止表单频繁更新
  const { run } = useDebounceFn(
    () => {
      handleValueChange(form.getFieldsValue());
    },
    { wait: 500 },
  );

  // 接受UI表单值
  const handleValueChange = (values: any) => {
    // 解析样式
    const cssObject = parseStyle(values.scopeCss);
    // 更新页面信息
    if (!state.selectedElement) {
      state.savePageInfo({
        type: 'style',
        scopeCss: values.scopeCss,
        scopeStyle: values.scopeStyle,
        // 合并后样式
        style: {
          ...values.scopeStyle,
          ...cssObject,
        },
      });
    } else {
      state.editElement({
        id: state.selectedElement.id,
        type: 'style',
        scopeCss: values.scopeCss,
        scopeStyle: values.scopeStyle,
        // 合并后样式
        style: {
          ...values.scopeStyle,
          ...cssObject,
        },
      });
    }
  };
  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 17 },
  };
  return (
    <Form className={styles.ui} {...formLayout} form={form} layout="horizontal" labelAlign="right" onValuesChange={run}>
      <TitleStyle>自定义样式</TitleStyle>
      <StyleCodeEditor>
        <Form.Item name="scopeCss" noStyle>
          <VsEditor language="css" />
        </Form.Item>
      </StyleCodeEditor>
      <TitleStyle>基础</TitleStyle>
      <Form.Item name={['scopeStyle', 'width']} label={'宽度'}>
        <InputPx />
      </Form.Item>
      <Form.Item name={['scopeStyle', 'height']} label={'高度'}>
        <InputPx />
      </Form.Item>
      <Form.Item name={['scopeStyle', 'margin']} label={'边距'}>
        <Input placeholder="边距: 10px" />
      </Form.Item>
      <Form.Item name={['scopeStyle', 'padding']} label={'填充'}>
        <Input placeholder="填充: 10px" />
      </Form.Item>
      {/* <MarginInput form={form} /> */}
      {/* <PaddingInput form={form} /> */}
      <Form.Item key={'opacity'} name={['scopeStyle', 'opacity']} label={'透明'}>
        <Slider min={0} max={1} step={0.1} />
      </Form.Item>
      <TitleStyle>布局</TitleStyle>
      <FlexStyle form={form} />
      <TitleStyle>文字</TitleStyle>
      <Form.Item name={['scopeStyle', 'fontSize']} label={'字号'}>
        <InputPx placeholder="eg: 14" />
      </Form.Item>
      <Form.Item name={['scopeStyle', 'lineHeight']} label={'行高'}>
        <InputPx placeholder="eg: 30" />
      </Form.Item>
      <Form.Item name={['scopeStyle', 'fontWeight']} label={'字重'}>
        <Select
          key="fontWeight"
          placeholder="eg: 400"
          options={[
            {
              value: 100,
              label: '100 Thin',
            },
            {
              value: 200,
              label: '200 Extra Light',
            },
            {
              value: 300,
              label: '300 Light',
            },

            {
              value: 400,
              label: '400 Normal',
            },
            {
              value: 500,
              label: '500 Medium',
            },
            {
              value: 600,
              label: '600 Semi Bold',
            },
            {
              value: 700,
              label: '700 Bold',
            },
            {
              value: 800,
              label: '800 Extra Bold',
            },
            {
              value: 900,
              label: '900 Black Bold',
            },
          ]}
          suffixIcon={<CaretDownOutlined />}
        />
      </Form.Item>
      <Form.Item name={['scopeStyle', 'color']} label={'颜色'}>
        <MColorPicker showText allowClear />
      </Form.Item>
      <Form.Item name={['scopeStyle', 'textAlign']} label={'对齐'}>
        <Radio.Group buttonStyle="solid" optionType="button">
          <Tooltip title="左对齐">
            <Radio value="left">
              <AlignLeftOutlined />
            </Radio>
          </Tooltip>
          <Tooltip title="居中对齐">
            <Radio value="center">
              <AlignCenterOutlined />
            </Radio>
          </Tooltip>
          <Tooltip title="右对齐">
            <Radio value="right">
              <AlignRightOutlined />
            </Radio>
          </Tooltip>
        </Radio.Group>
      </Form.Item>
      <TitleStyle>背景</TitleStyle>
      <Form.Item name={['scopeStyle', 'backgroundColor']} label={'颜色'}>
        <MColorPicker />
      </Form.Item>
      <Form.Item name={['scopeStyle', 'backgroundImage']} label={'图片'} tooltip="支持渐变色。图片使用时，直接输入远程地址：http(s)://xxx.png">
        <BackgroundImage />
      </Form.Item>
      <Form.Item name={['scopeStyle', 'backgroundSize']} label={'尺寸'} tooltip="默认的时候，可以手动输入尺寸">
        <BackgroundSize />
      </Form.Item>
      <Form.Item name={['scopeStyle', 'backgroundRepeat']} label={'平铺'}>
        <Select
          options={[
            {
              label: '不平铺',
              value: 'no-repeat',
            },
            {
              label: '平铺',
              value: 'repeat',
            },
            {
              label: '水平平铺',
              value: 'repeat-x',
            },
            {
              label: '垂直平铺',
              value: 'repeat-y',
            },
          ]}
          suffixIcon={<CaretDownOutlined />}
        ></Select>
      </Form.Item>
      <Form.Item name={['scopeStyle', 'backgroundPosition']} label={'位置'}>
        <Select
          options={[
            {
              label: 'top',
              value: 'top',
            },
            {
              label: 'bottom',
              value: 'bottom',
            },
            {
              label: 'left',
              value: 'left',
            },
            {
              label: 'right',
              value: 'right',
            },
            {
              label: 'center',
              value: 'center',
            },
          ]}
          suffixIcon={<CaretDownOutlined />}
        ></Select>
      </Form.Item>
      <TitleStyle>定位</TitleStyle>
      <Form.Item key={'position'} name={['scopeStyle', 'position']} label={'定位'}>
        <Select
          placeholder={'请选择'}
          options={[
            {
              label: 'static',
              value: 'static',
            },
            {
              label: 'relative',
              value: 'relative',
            },
            {
              label: 'absolute',
              value: 'absolute',
            },
            {
              label: 'fixed',
              value: 'fixed',
            },
            {
              label: 'sticky',
              value: 'sticky',
            },
          ]}
          suffixIcon={<CaretDownOutlined />}
        />
      </Form.Item>
      <Form.Item key={'zIndex'} name={['scopeStyle', 'zIndex']} label={'zIndex'}>
        <InputNumber placeholder="层级" />
      </Form.Item>
      {!['', undefined, 'static'].includes(form.getFieldValue(['scopeStyle', 'position'])) && (
        <Form.Item label="位置">
          <Flex gap={3}>
            <Form.Item name={['scopeStyle', 'top']} noStyle>
              <InputPx placeholder="T: 10" />
            </Form.Item>
            <Form.Item name={['scopeStyle', 'right']} noStyle>
              <InputPx placeholder="R: 10" />
            </Form.Item>
          </Flex>
          <Flex gap={3} style={{ marginTop: 10 }}>
            <Form.Item name={['scopeStyle', 'bottom']} noStyle>
              <InputPx placeholder="B: 10" />
            </Form.Item>
            <Form.Item name={['scopeStyle', 'left']} noStyle>
              <InputPx placeholder="L: 10" />
            </Form.Item>
          </Flex>
        </Form.Item>
      )}
      <Form.Item key={'overflow'} name={['scopeStyle', 'overflow']} label="溢出">
        <Select
          placeholder={'请选择'}
          options={[
            {
              label: '默认',
              value: 'auto',
            },
            {
              label: '可见',
              value: 'visible',
            },
            {
              label: '超出隐藏',
              value: 'hidden',
            },
            {
              label: '超出滚动',
              value: 'scroll',
            },
          ]}
          suffixIcon={<CaretDownOutlined />}
        />
      </Form.Item>
      <TitleStyle>边框</TitleStyle>
      <Form.Item name={['scopeStyle', 'borderRadius']} label={'圆角'}>
        <InputPx placeholder="eg：5" />
      </Form.Item>
      <Form.Item name={['scopeStyle', 'border']} label={'边框'}>
        <Input placeholder="eg：1px solid #fff" />
      </Form.Item>
      <Form.Item label="阴影" name={['scopeStyle', 'boxShadow']}>
        <Shadow />
      </Form.Item>
    </Form>
  );
};

export default memo(StyleConfig);
