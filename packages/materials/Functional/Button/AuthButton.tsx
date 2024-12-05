import { useEffect, useState } from 'react';
import { Button } from 'antd';
import storage from '@materials/utils/storage';
import { useLocation, useParams } from 'react-router-dom';
import { renderFormula, getPageId } from '@materials/utils/util';

const renderBtn = (props: any) => (<Button {...props} onClick={props.onClick}>
  {props.children}
</Button>);
/**
 * 按钮权限控制
 */
export default function AuthButton({ authCode, authScript, ...props }: any) {
  const [newAuthCode, setNewAuthCode] = useState('');
  const [buttons, setButtons] = useState([]);
  const { projectId, id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!projectId || !authCode) return;
    const btns = storage.get('buttons') || [];
    const pageMap = storage.get('pageMap');
    setButtons(btns);
    const pageId = pathname.split(projectId)[1].slice(1);
    // 获取页面ID
    const id = getPageId(pageId, pageMap);
    const code = projectId + '_' + id + '_' + authCode;
    setNewAuthCode(code);
  }, [pathname, authCode]);

  // 渲染按钮
  const renderBtn = (props: any) => (
    <Button {...props} onClick={props.onClick}>
      {props.children}
    </Button>
  );
  /**
   * 1. 如果没有配置权限，则直接显示按钮
   * 2. 如果是页面打开，并且不是微服务环境，则直接显示按钮
   * 3. 如果是项目打开，则判断是否配置了权限，根据权限进行查找，命中则显示按钮，否则不显示
   */
  if (!authCode || (id && !window.microApp) || (projectId && authCode && buttons.find((b: any) => b.code === newAuthCode))) {
    return renderBtn(props);
  }
  /**
   * 如果页面打开，并且authScript有值，说明是跨服务权限判断
   */
  if (authScript && id) {
    const isTrue = renderFormula(authScript.value, { authCode });
    return isTrue ? renderBtn(props) : null;
  }
  return null;
}
/**
 * 生成按钮，当权限不符合时，不需要占位符
 * @param param0 
 * @returns 
 */
export const genAuthButton = ({ authCode, authScript, ...props }: any) => {
  const { projectId, pageId, id } = useParams();
  const buttons = storage.get('buttons') || [];
  const pageMap = storage.get('pageMap');
  const newAuthCode = projectId + '_' + pageMap[Number(pageId)]?.id + '_' + authCode;
  /**
   * 1. 如果没有配置权限，则直接显示按钮
   * 2. 如果是页面打开，并且不是微服务环境，则直接显示按钮
   * 3. 如果是项目打开，则判断是否配置了权限，根据权限进行查找，命中则显示按钮，否则不显示
   */
  if (!authCode || (id && !window.microApp) || (projectId && authCode && buttons.find((b: any) => b.code === newAuthCode))) {
    return renderBtn(props);
  }
  /**
   * 如果页面打开，并且authScript有值，说明是跨服务权限判断
   */
  if (authScript && id) {
    const isTrue = renderFormula(authScript.value, { authCode });
    return isTrue ? renderBtn(props) : null;
  }
  return null;
};