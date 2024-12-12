/**
 * 公共Context对象，用于跨组件通信
 * 主要用在Form、SearchForm中
 * 子表单中进行消费
 */

import { message } from '@/utils/AntdGlobal';
import { FormInstance } from 'antd';
import { createContext, useContext } from 'react';

export const FormContext = createContext<{
  form?: FormInstance;
  initValues: (type: string, name: string, value: any) => void;
} | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    console.warn('表单组件必须放在Form组件、SearchForm组件或者GridForm组件内');
    message.warning('表单项必须放在Form组件、SearchForm组件或者GridForm组件内');
    return {
      form: null,
      initValues() {},
    };
  }
  return context;
};
