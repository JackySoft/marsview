import { Form, FormInstance } from 'antd';
import { memo } from 'react';
import DragImages from './DragImages';

const ImagesSetting = memo(({ form }: { form: FormInstance }) => {
  return (
    <div style={{ padding: '5px 20px' }}>
      <Form.List name={['imageUrls']}>
        {(fields, { add, remove, move }) => (
          <>
            {fields.map(({ key, name }) => (
              <DragImages key={key} index={name} add={add} remove={remove} move={move} form={form} />
            ))}
          </>
        )}
      </Form.List>
    </div>
  );
});

export default ImagesSetting;
