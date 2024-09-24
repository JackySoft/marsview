import SetterRender from '@/components/SetterRender/SetterRender';
import { StyleConfig } from '@/components/StyleConfig/StyleConfig';
import * as Components from '@/packages/index';
import type { TabsProps } from 'antd';
import { ConfigProvider, Form, Tabs } from 'antd';
import ApiConfig from '@/components/ApiConfig/ApiConfig';
import { memo, useEffect, useState } from 'react';
import EventConfig from '@/components/EventConfig/EventConfig';
import { useDebounceFn } from 'ahooks';
import { usePageStore } from '@/stores/pageStore';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { message } from '@/utils/AntdGlobal';
import { defaultsDeep } from 'lodash-es';
import copy from 'copy-to-clipboard';
import styles from './index.module.less';

/**
 * 生成左侧组件列表
 */

const ConfigPanel = memo(() => {
  const { pageName, pageProps, selectedElement, savePageInfo, elementsMap, editElement } = usePageStore((state) => {
    return {
      pageName: state.page.pageName,
      pageProps: state.page.config.props,
      selectedElement: state.selectedElement,
      savePageInfo: state.savePageInfo,
      elementsMap: state.page.elementsMap,
      editElement: state.editElement,
    };
  });
  const [form] = Form.useForm();
  const [isCopy, setCopy] = useState<boolean>(false);
  const [ComponentConfig, setComponentConfig] = useState<any>(null);

  /**
   * 表单初始化
   * 当配置中的输入的值发生变化后，需要再次渲染
   */
  useEffect(() => {
    form.resetFields();
    // 只有选中一个组件，才可以展示属性配置
    if (selectedElement) {
      const remoteConfigUrl = elementsMap[selectedElement.id]?.remoteConfigUrl || '';
      if (remoteConfigUrl) {
        /* @vite-ignore */
        import(remoteConfigUrl).then((res = {}) => {
          setComponentConfig(res.default);
          form.setFieldsValue(res.default?.config.props || {});
        });
      } else {
        // 生成组件
        const item: any = Components[(selectedElement.type + 'Config') as keyof typeof Components];
        setComponentConfig(item);
        // defaults是为了继承页面中新增的配置项
        form.setFieldsValue(elementsMap[selectedElement.id]?.config.props);
      }
      form.setFieldValue('id', selectedElement.id);
    } else {
      // 获取页面配置
      const item: any = Components['PageConfig' as keyof typeof Components];
      setComponentConfig(item);
      // defaults是为了继承页面中新增的配置项
      form.setFieldsValue({ pageName, ...defaultsDeep({ ...pageProps }, item.config.props) });
    }
    return () => {
      setComponentConfig(null);
      form.resetFields();
    };
  }, [selectedElement?.id, pageName]);

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
    wrapperCol: { span: 14 },
  };

  const items: TabsProps['items'] = [
    {
      key: 'props',
      label: `属性`,
      children: (
        <Form form={form} style={{ paddingBottom: 20 }} {...formLayout} layout="horizontal" labelAlign="right" onValuesChange={run}>
          <div className={styles.widget}>
            {selectedElement?.id ? (
              <span className={styles.text}>组件ID：{selectedElement?.id}</span>
            ) : (
              <span className={styles.text}>页面：{pageName}</span>
            )}
            {isCopy ? <CheckOutlined className={styles.ml5} /> : <CopyOutlined onClick={handleCopy} className={styles.ml5} />}
          </div>
          <SetterRender attrs={ComponentConfig?.attrs || []} form={form} />
        </Form>
      ),
    },
    {
      key: 'style',
      label: `样式`,
      children: <StyleConfig />,
    },
    {
      key: 'event',
      label: `事件`,
      children: <EventConfig />,
    },
    {
      key: 'api',
      label: `数据`,
      children: <ApiConfig />,
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 12,
        },
      }}
    >
      <Tabs className={styles.attrBox} centered defaultActiveKey="props" items={items} />
    </ConfigProvider>
  );
});

export default ConfigPanel;
