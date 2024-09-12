import { FunctionOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useRef } from 'react';
import VariableSelect from './VariableSelect';

interface Value {
  type: 'static' | 'variable';
  value: any;
}

interface Props {
  value?: Value;
  [key: string]: any;
}

const VariableBind: React.FC<Props> = ({ value, onChange, ...props }: any) => {
  const selectRef = useRef<{ open: (id: string) => void }>();

  function valueChange(e: any) {
    onChange({
      type: 'static',
      value: e?.target?.value,
    });
  }

  function select(record: any) {
    onChange({
      type: 'variable',
      ...record,
    });
  }

  const val = typeof value === 'string' || typeof value === 'number' ? { type: 'static', value } : value;

  return (
    <>
      <Input
        readOnly={val?.type === 'variable' && val.value}
        allowClear
        value={val?.value}
        onChange={valueChange}
        addonAfter={
          <FunctionOutlined
            onClick={() => {
              selectRef.current?.open(val?.value);
            }}
            style={{ color: value?.type === 'variable' ? '#7D33FF' : '' }}
          />
        }
        placeholder="请选择变量"
        {...props}
      />
      {/* 选择变量弹框 */}
      <VariableSelect ref={selectRef} onSelect={select} />
    </>
  );
};

export default VariableBind;
