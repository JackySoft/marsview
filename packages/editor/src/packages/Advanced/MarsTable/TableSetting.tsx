import { Form, FormInstance } from 'antd';
import { memo, useCallback, useRef } from 'react';
import ColumnSetting from './ColumnSetting';
import DragColumn from './DragColumn';
/**
 * 表格配置
 */
const TableSetting = memo(({ form }: { form: FormInstance }) => {
  const columnRef = useRef<{ open: (index: number) => void }>();

  // 设置
  const handleOpen = useCallback((index: number) => {
    columnRef.current?.open(index);
  }, []);

  // 更新
  const handleUpdate = (vals: any, index: number) => {
    form.setFieldValue(['columns', index], vals);
  };

  return (
    <>
      <Form.List name={['columns']}>
        {(fields, { add, remove, move }) => (
          <>
            {fields.map(({ key, name }) => (
              <DragColumn key={key} index={name} add={add} remove={remove} handleOpen={handleOpen} move={move} />
            ))}
          </>
        )}
      </Form.List>
      <ColumnSetting columnRef={columnRef} update={handleUpdate} />
    </>
  );
});
export default TableSetting;
