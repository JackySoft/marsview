/**
 * 公共Context对象，用于跨组件通信
 * 主要用在Form、SearchForm中
 * 子表单中进行消费
 */

import { FormInstance } from 'antd';
import React, { createContext } from 'react';

export const FormContext = createContext<{ form: FormInstance<any>; formId: string; setFormData: (payload: any) => void } | null>(null);

export const useFormContext = () => {
  return React.useContext(FormContext) || { form: null, setFormData: () => {}, formId: '' };
};
