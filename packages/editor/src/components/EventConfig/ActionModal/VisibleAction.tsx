import { Form, Divider, Radio, TreeSelect } from 'antd';
import { usePageStore } from '@/stores/pageStore';
import VariableBind from '@/components/VariableBind/VariableBind';
import styles from './index.module.less';
/**
 * 显示确认弹框
 * @returns
 */
const VisibleAction = () => {
  const elements = usePageStore((state) => state.page.pageData.elements);

  return (
    <>
      <div className={styles.desc}>
        <h3 className={styles.descTitle}>说明</h3>
        <p className={styles.descInfo}>触发事件动作后，可以指定目标组件显示和隐藏。</p>
        <Divider />
      </div>
      <Form.Item label="目标组件" name={'target'} rules={[{ required: true, message: '请选择目标组件' }]}>
        <TreeSelect allowClear treeData={elements} fieldNames={{ label: 'name', value: 'id', children: 'elements' }} placeholder="请选择目标组件" />
      </Form.Item>
      <Form.Item label="显示类型" name="showType">
        <Radio.Group>
          <Radio value="static">静态</Radio>
          <Radio value="expression">表达式</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item noStyle shouldUpdate>
        {(form: any) => {
          const showType = form.getFieldValue('showType');
          return showType === 'static' ? (
            <Form.Item label="显示结果" name="showResult">
              <Radio.Group>
                <Radio value="show">显示</Radio>
                <Radio value="hidden">隐藏</Radio>
              </Radio.Group>
            </Form.Item>
          ) : (
            <Form.Item label="表达式" name={'expression'}>
              <VariableBind />
            </Form.Item>
          );
        }}
      </Form.Item>
    </>
  );
};
export default VisibleAction;
