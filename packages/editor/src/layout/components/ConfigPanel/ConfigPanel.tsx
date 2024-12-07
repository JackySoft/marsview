import { Suspense, lazy, memo, useEffect, useState } from 'react';
import { ConfigProvider, Flex, Form, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { useDebounceEffect, useDebounceFn } from 'ahooks';
import { usePageStore } from '@/stores/pageStore';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { message } from '@/utils/AntdGlobal';
import { defaultsDeep } from 'lodash-es';
import copy from 'copy-to-clipboard';
import SpinLoading from '@/components/SpinLoading';
import { getComponent } from '@/packages/index';
import styles from './index.module.less';

// 属性设置器
const SetterRender = lazy(() => import('@/components/SetterRender/SetterRender'));
// 样式配置
const StyleConfig = lazy(() => import('@/components/StyleConfig/StyleConfig'));
// 事件配置
const EventConfig = lazy(() => import('@/components/EventConfig/EventConfig'));
// 接口配置
const ApiConfig = lazy(() => import('@/components/ApiConfig/ApiConfig'));
/**
 * 生成左侧组件列表
 */
const ConfigPanel = memo(() => {
  const { pageName, pageProps, selectedElement, savePageInfo, elementsMap, editElement } = usePageStore((state) => {
    return {
      pageName: state.page.name,
      pageProps: state.page.pageData.config.props,
      selectedElement: state.selectedElement,
      savePageInfo: state.savePageInfo,
      elementsMap: state.page.pageData.elementsMap,
      editElement: state.editElement,
    };
  });
  const [form] = Form.useForm();
  const [isCopy, setCopy] = useState<boolean>(false);
  const [clientSize, setClientSize] = useState({
    width: 0,
    height: 0,
  });
  const [ComponentConfig, setComponentConfig] = useState<any>(null);

  useDebounceEffect;
  /**
   * 表单初始化
   * 当配置中的输入的值发生变化后，需要再次渲染
   */
  useDebounceEffect(
    () => {
      form.resetFields();
      // 只有选中一个组件，才可以展示属性配置
      if (selectedElement) {
        const remoteConfigUrl = elementsMap[selectedElement.id]?.remoteConfigUrl || '';
        if (remoteConfigUrl) {
          /* @vite-ignore */
          import(remoteConfigUrl).then((res = {}) => {
            setComponentConfig(res.default);
            form.setFieldsValue(elementsMap[selectedElement.id]?.config.props || {});
          });
        } else {
          // 生成组件
          getComponent(selectedElement.type + 'Config').then((res: any) => {
            const item = res.default;
            setComponentConfig(item);
            // defaults是为了继承页面中新增的配置项
            form.setFieldsValue(elementsMap[selectedElement.id]?.config.props);
          });
        }
        form.setFieldValue('id', selectedElement.id);
        // 获取组件尺寸
        const target = document.querySelector(`[data-id=${selectedElement?.id}]`);
        if (target) {
          const size = target.getBoundingClientRect();
          setClientSize(size);
        }
      } else {
        // 获取页面配置
        getComponent('PageConfig').then((res: any) => {
          const item = res.default;
          setComponentConfig(item);
          // defaults是为了继承页面中新增的配置项
          form.setFieldsValue({ pageName, ...defaultsDeep({ ...pageProps }, item.config.props) });
        });
      }
      return () => {
        setComponentConfig(null);
        form.resetFields();
      };
    },
    [selectedElement?.id, pageName],
    {
      wait: 300,
    },
  );

  const { run } = useDebounceFn(
    () => {
      handleValueChange(form.getFieldsValue());
    },
    { wait: 300 },
  );

  // 接收表单值
  const handleValueChange = (values: any) => {
    if (selectedElement?.id) {
      editElement({
        id: selectedElement.id,
        type: 'props',
        props: values,
      });
    } else {
      savePageInfo({
        type: 'props',
        props: values,
      });
    }
  };

  // 复制组件ID
  const handleCopy = () => {
    copy(selectedElement?.id || pageName);
    message.info('复制成功');
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 3000);
  };

  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 15 },
  };

  const items: TabsProps['items'] = [
    {
      key: 'props',
      label: `属性`,
      children: (
        <Form form={form} style={{ paddingBottom: 20 }} {...formLayout} layout="horizontal" labelAlign="right" onValuesChange={run}>
          <div className={styles.widget}>
            {selectedElement?.id ? <span className={styles.text}>组件ID：{selectedElement?.id}</span> : null}
            {selectedElement?.id && isCopy ? (
              <CheckOutlined className={styles.ml5} />
            ) : (
              selectedElement?.id && <CopyOutlined onClick={handleCopy} className={styles.ml5} />
            )}
          </div>
          <Flex justify="space-between" gap={20} className={styles.widget}>
            <span>宽度: {clientSize.width.toFixed(0)} </span>
            <span>高度: {clientSize.height.toFixed(0)}</span>
          </Flex>
          <Suspense fallback={<SpinLoading />}>
            <SetterRender attrs={ComponentConfig?.attrs || []} form={form} />
          </Suspense>
        </Form>
      ),
    },
    {
      key: 'style',
      label: `样式`,
      children: (
        <Suspense fallback={<SpinLoading />}>
          <StyleConfig />
        </Suspense>
      ),
    },
    {
      key: 'event',
      label: `事件`,
      children: (
        <Suspense fallback={<SpinLoading />}>
          <EventConfig />
        </Suspense>
      ),
    },
    {
      key: 'api',
      label: `数据`,
      children: (
        <Suspense fallback={<SpinLoading />}>
          <ApiConfig />
        </Suspense>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 12,
        },
        components: {
          Tabs: {
            titleFontSize: 14,
          },
          Form: {
            itemMarginBottom: 15,
          },
          InputNumber: {
            paddingInline: 8,
          },
        },
      }}
    >
      <Tabs className={styles.attrBox} centered defaultActiveKey="props" items={items} />
    </ConfigProvider>
  );
});

export default ConfigPanel;
