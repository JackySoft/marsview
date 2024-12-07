import { useEffect, useRef, useState } from 'react';
import { useDebounceFn } from 'ahooks';
import { Button, Form, FormInstance, Input, Select, Tooltip } from 'antd';
import { EditOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import SettingModal from './components/SettingModal';
import styles from './index.module.less';
import { usePageStore } from '@/stores/pageStore';
import VsEditor from '../VsEditor';
import VariableBind from '../VariableBind/VariableBind';

const ApiConfigComponent = () => {
  const state = usePageStore();
  const [form] = Form.useForm();
  const [sourceType, setSourceType] = useState('json');
  const modalRef = useRef<{ showModal: (id?: string) => void }>();

  useEffect(() => {
    form.resetFields();
    let values: any = undefined;
    // 如果未选中，则填充页面接口配置
    if (!state.selectedElement) {
      values = state.page.pageData.config.api || {};
    } else {
      // 如果选中，填充组件接口配置
      values = state.page.pageData.elementsMap[state.selectedElement.id]?.config.api || {};
    }
    setSourceType(values?.sourceType || 'json');
    const source = JSON.stringify(values?.source || '', null, 2);
    form.setFieldsValue({ sourceType: 'json', id: '', sourceField: '', ...values, source });
  }, [state.selectedElement]);

  // 设置数据源类型
  const handleChange = (val: string) => {
    setSourceType(val);
  };

  // 接口设置
  function showModal() {
    modalRef.current?.showModal(form.getFieldValue('id'));
  }

  // 采用防抖，防止表单频繁更新
  const { run } = useDebounceFn(
    () => {
      handleUpdate(form.getFieldValue('id'));
    },
    { wait: 800 },
  );

  // 更新接口配置
  const handleUpdate = (id: string) => {
    const apiConfig = form.getFieldsValue();
    let source = [];
    try {
      source = JSON.parse(apiConfig.source);
    } catch (error) {
      console.error(error);
      source = [];
    }
    if (state.selectedElement?.id) {
      const payload = {
        id: state.selectedElement?.id,
        type: 'api',
        api: {
          ...apiConfig,
          id,
          source,
        },
      };
      state.editElement(payload);
    } else {
      const payload = {
        type: 'api',
        api: {
          ...apiConfig,
          id,
          source,
        },
      };
      state.savePageInfo(payload);
    }
    if (id) {
      form.setFieldValue('id', id);
    }
  };

  return (
    <Form form={form} labelCol={{ span: 8 }} wrapperCol={{ span: 15 }} labelAlign="right" onValuesChange={run} autoComplete="off">
      <h2 className={styles.title}>
        <span>数据源配置</span>
        <Tooltip title="支持mock数据、接口请求和变量绑定">
          <QuestionCircleOutlined style={{ marginLeft: 5 }} />
        </Tooltip>
      </h2>
      <Form.Item label="数据来源" name="sourceType">
        <Select onChange={(val: string) => handleChange(val)}>
          <Select.Option value="json">静态数据</Select.Option>
          <Select.Option value="api">接口请求</Select.Option>
          <Select.Option value="variable">动态变量</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {(form: FormInstance) => {
          const sourceType = form.getFieldValue('sourceType');
          if (sourceType === 'json') {
            return (
              <>
                <Form.Item name="source" noStyle>
                  <VsEditor height="300px" language="json" />
                </Form.Item>
                <Form.Item
                  label="数据处理"
                  name="sourceField"
                  tooltip="示例：{ code:0 ,data:{ list: [], total: 10 } } ，字段对应是list，默认可不填。"
                >
                  <VariableBind placeholder="返回值字段映射,eg: data.list" />
                </Form.Item>
              </>
            );
          }
          if (sourceType === 'api') {
            return (
              <>
                <Form.Item label="请求地址" name="id">
                  <ApiInput showModal={showModal} />
                </Form.Item>
                <Form.Item label="数据处理" name="sourceField" tooltip="示例：{ code:0 ,data:{ list: [], total: 10 } } ，字段对应是data.list.">
                  <VariableBind placeholder="字段映射,eg: data.list" />
                </Form.Item>
                <Form.Item name="source" hidden>
                  <VsEditor height="350px" language="json" />
                </Form.Item>
              </>
            );
          }
          if (sourceType === 'variable') {
            return (
              <>
                <Form.Item label="绑定变量" name="name">
                  <VariableBind readOnly placeholder="数据源所对应的接口字段" />
                </Form.Item>
                <Form.Item name="source" hidden>
                  <VsEditor height="350px" language="json" />
                </Form.Item>
              </>
            );
          }
        }}
      </Form.Item>
      {/* 接口设置弹框 */}
      <SettingModal update={handleUpdate} ref={modalRef}></SettingModal>
    </Form>
  );
};

/**
 * 接口输入框
 */
function ApiInput({ value, onChange, showModal }: any) {
  const state = usePageStore();
  return (
    <>
      <Select placeholder="请选择接口" showSearch allowClear style={{ width: '82%' }} value={value} onChange={(val: string) => onChange(val)}>
        {Object.values(state.page.pageData.apis).map((item) => {
          return (
            <Select.Option value={item.id} key={item.id}>
              {item.name}
            </Select.Option>
          );
        })}
      </Select>
      <Button type="link" onClick={showModal} icon={<EditOutlined />}></Button>
    </>
  );
}

export default ApiConfigComponent;
