import {
  ActionNode,
  ApiConfig,
  ConfirmAction,
  CopyAction,
  JumpLinkAction,
  MessageAction,
  MethodsAction,
  NotificationAction,
  VariableAction,
} from '../types';
import { getComponentRef } from './useComponentRefs';
import { handleApi } from './handleApi';
import { usePageStore } from '@/stores/pageStore';
import { copyText, handleArrayVariable, handleParamVariable, isNotEmpty, renderFormula, renderTemplate } from './util';
import { Modal, message, notification } from '@/utils/AntdGlobal';
import request from './request';
import router from './../../router/index';

// 把工作流转换为链表结构，此算法需要进一步优化。
function convertArrayToLinkedList(nodes: any, isSuccessBranch = true) {
  let linkedList = null;
  let currentNode: any = null;

  for (const node of nodes) {
    if (node.type === 'start' || node.type === 'end') {
      continue;
    }

    let newNode: any = { action: { ...node.config } };

    if (node.type === 'condition') {
      const successBranch = convertArrayToLinkedList(node.children.find((child: any) => child.title === '成功')?.children || [], true);
      const failBranch = convertArrayToLinkedList(node.children.find((child: any) => child.title === '失败')?.children || [], false);

      const behindList = nodes.slice(nodes.indexOf(node) + 1).filter((item: any) => item.type !== 'end');

      newNode = {
        success: successBranch,
        fail: failBranch,
      };

      if (!currentNode) {
        linkedList = newNode;
      } else if (isSuccessBranch) {
        if (!currentNode.next) {
          currentNode.next = newNode;
        } else {
          let current = currentNode.next;
          while (current.next) {
            current = current.next;
          }
          current.next = newNode;
        }
      } else {
        if (!currentNode.fail) {
          currentNode.fail = newNode;
        } else {
          let current = currentNode.fail;
          while (current.next) {
            current = current.next;
          }
          current.next = newNode;
        }
      }

      currentNode = newNode;

      /**
       * 如果条件分支后面还有节点，则需要把后面的节点全部当做成功节点追加到条件分支的后面
       * TODO: 此算法及其复杂，需要进一步优化。
       */
      if (behindList.length > 0) {
        let sucNodes1 = convertArrayToLinkedList(behindList, true);
        if (!currentNode.success) {
          currentNode.success = sucNodes1;
        } else {
          let current = currentNode.success;
          while (current.next) {
            current = current.next;
          }
          while (sucNodes1.action) {
            current.next = {
              action: sucNodes1.action,
            };
            current = current.next;
            sucNodes1 = sucNodes1.next || {};
          }
        }
        let sucNodes2 = convertArrayToLinkedList(behindList, true);
        if (!currentNode.fail) {
          currentNode.fail = sucNodes2;
        } else {
          let current = currentNode.fail;
          while (current.next) {
            current = current.next;
          }
          while (sucNodes2.action) {
            current.next = {
              action: sucNodes2.action,
            };
            current = current.next;
            sucNodes2 = sucNodes2.next || {};
          }
        }
      }
    } else {
      if (!currentNode) {
        linkedList = currentNode = newNode;
      } else if (isSuccessBranch) {
        if (!currentNode.next) {
          currentNode.next = newNode;
        } else {
          let current = currentNode.next;
          while (current.next) {
            current = current.next;
          }
          current.next = newNode;
        }
      } else {
        if (!currentNode.next) {
          currentNode.next = newNode;
        } else {
          let current = currentNode.next;
          while (current.next) {
            current = current.next;
          }
          current.next = newNode;
        }
      }
    }
  }

  return linkedList;
}
/**
 * 事件行为是数组结构，为了保证串联执行，需要转换成链表结构
 * 必须保证第一个行为执行完以后，再执行第二个行为
 * @param params 事件触发时，组件传递的参数
 */
export function handleActionFlow(actions: any[] = [], params: any) {
  /**
   * 行为数组转换成链表结构
   */
  const nodes = convertArrayToLinkedList(actions);
  if (nodes?.action) {
    execAction(nodes, params);
  }
}

/**
 * 递归执行事件行为
 * params是按钮触发是，组件传递的参数
 * action中的data为行为配置中手工配置的参数
 */
const execAction = (node: any, params: any = {}) => {
  if (!node || !node?.action) return;
  try {
    const data = mergeParams(node.action.data, params);
    delete node.action.data;
    node.action = handleParamVariable(node.action, params);
    if (node.action.actionType === 'methods') {
      handleMethods(node, data);
    } else if (node.action.actionType === 'showConfirm') {
      handleShowConfirm(node, data);
    } else if (node.action.actionType === 'message') {
      handleMessage(node, data);
    } else if (node.action.actionType === 'notification') {
      handleNotification(node, data);
    } else if (node.action.actionType === 'request' || node.action.actionType === 'download') {
      handleRequest(node, data);
    } else if (node.action.actionType === 'formReset') {
      node.action.method = 'reset';
      handleMethods(node, data);
    } else if (node.action.actionType === 'formSubmit') {
      node.action.method = 'submit';
      handleMethods(node, data);
    } else if (node.action.actionType === 'formValidate') {
      node.action.method = 'validate';
      handleMethods(node, data);
    } else if (node.action.actionType === 'formAssignment') {
      node.action.method = 'init';
      handleMethods(node, data);
    } else if (node.action.actionType === 'formGetValue') {
      node.action.method = 'getFormData';
      handleMethods(node, data);
    } else if (['openModal', 'openDrawer'].includes(node.action.actionType)) {
      handleOpenModal(node, data, 'open');
    } else if (['closeModal', 'closeDrawer'].includes(node.action.actionType)) {
      handleOpenModal(node, data, 'close');
    } else if (node.action.actionType === 'jumpLink') {
      handleJumpLink(node, data);
    } else if (node.action.actionType === 'reloadPage') {
      window.location.reload();
    } else if (node.action.actionType === 'variable') {
      handleVariable(node, data);
    } else if (node.action.actionType === 'copy') {
      handleCopy(node, data);
    } else if (node.action.actionType === 'setTimeout') {
      handleSetTimeout(node, data);
    } else if (node.action.actionType === 'visible') {
      handleVisible(node, data);
    } else if (node.action.actionType === 'disable') {
      handleDisable(node, data);
    } else if (node.action.actionType === 'sendMessage') {
      handleSendMessage(node, data);
    } else if (node.action.actionType === 'createNode') {
      handleCreateNode(node, data);
    } else if (node.action.actionType === 'script') {
      handleRunScripts(node, data);
    }
  } catch (error) {
    console.error(`事件流[${node.actionType}执行异常]`, error);
  }
};

/**
 * 合并行为中的参数
 * @param eventParams 事件行为中配置的参数
 * @param initData 事件触发时，组件传递的参数
 */
const mergeParams = (eventParams: any = [], initData: any = {}) => {
  // 获取行为中配置的静态参数
  const data = handleArrayVariable(eventParams, initData);
  // 如果行为配置参数为空，而上一个行为返回的数据（initData）为基础类型，则直接返回，因为基础类型没有属性，无法合并。
  if (
    !eventParams?.length &&
    (Array.isArray(initData) || typeof initData === 'string' || typeof initData === 'number' || typeof initData === 'boolean')
  ) {
    return initData;
  }
  // 处理params
  initData &&
    Object.keys(initData).forEach((key) => {
      if (key && typeof initData[key] != 'undefined' && initData[key] != null) {
        data[key] = initData[key];
      }
    });
  return handleParamVariable(data);
};

/**
 * 处理组件方法
 */
async function handleMethods({ action, next }: ActionNode<MethodsAction>, data: any = {}) {
  const ref = getComponentRef(action.target);
  // TODO 需要等待组件完全加载后，才可执行(此处有漏洞，如果组件被删除，会一直找不到)
  if (!ref) {
    // 添加计数器，防止死循环
    sessionStorage.setItem('mars-event-flow-wait', '1');
    if (Number(sessionStorage.getItem('mars-event-flow-wait')) < 10) {
      setTimeout(() => {
        handleMethods({ action, next }, data);
      }, 100);
    } else {
      console.error('组件加载超时，请检查组件是否存在');
    }
    return;
  }
  try {
    const result = await ref?.[action.method]?.({ ...action?.params, ...data });
    if (typeof result === 'boolean') {
      if (result) {
        execAction(next?.success || next, data);
      } else {
        execAction(next?.fail, data);
      }
    } else {
      setTimeout(() => {
        // 基础类型不能使用对象合并的方式
        if ((Array.isArray(result) || typeof result !== 'object') && isNotEmpty(result)) {
          execAction(next?.success || next, result);
        } else {
          execAction(next?.success || next, Object.assign(data, result || {}));
        }
      });
    }
  } catch (error) {
    execAction(next?.fail, data);
    console.error(`【${action.method}】方法调用失败：`, error);
  }
}

/**
 * 打开/关闭弹窗
 */
async function handleOpenModal({ action, next }: ActionNode<MethodsAction>, data: any = {}, type: 'open' | 'close') {
  const ref = getComponentRef(action.target);
  if (type === 'close') ref.close({ ...data });
  if (type === 'open') await ref.open({ ...data });
  execAction(next?.success || next, data);
}

/**
 * 处理确认框
 */
const handleShowConfirm = ({ action, next }: ActionNode<ConfirmAction>, data: any) => {
  Modal[action.type]?.({
    title: action.title,
    content: action.content,
    okText: action.okText,
    cancelText: action.cancelText,
    onOk: () => {
      execAction(next?.success || next, data);
    },
    onCancel: () => {
      execAction(next?.fail, data);
    },
  });
};

/**
 * 全局提示
 */
const handleMessage = ({ action, next }: ActionNode<MessageAction>, data: any) => {
  message
    .open({
      type: action.type,
      content: action.content,
      duration: action.duration,
    })
    .then(() => {
      execAction(next?.success || next, data);
    });
};

/**
 * 消息通知
 */
const handleNotification = ({ action, next }: ActionNode<NotificationAction>, data: any) => {
  notification.open({
    type: action.type,
    message: action.message,
    description: action.description,
    placement: action.placement,
    duration: action.duration,
  });
  execAction(next?.success || next, data);
};

/**
 * 请求处理
 */
const handleRequest = async ({ action, next }: ActionNode<ApiConfig>, data: any) => {
  const res = await handleApi(action, data);
  if (res.code === 0) {
    execAction(next?.success || next, res);
  } else {
    execAction(next?.fail, res);
  }
};

/**
 * 跳转链接
 */
const handleJumpLink = async ({ action, next }: ActionNode<JumpLinkAction>, data: any) => {
  const params = new URLSearchParams(data);
  if (action.jumpType === 'route') {
    let url = action.url;
    if (params) {
      url += action.url.indexOf('?') > -1 ? '&' : '?' + params;
    }
    router.navigate(url);
  } else if (action.jumpType === 'micro') {
    if (!window.microApp) {
      console.warn('跨服务跳转：当前页面不在微应用环境中，无法跳转');
    }
    window.microApp?.dispatch({ type: 'router', path: action.url, data });
  } else if (action.jumpType === 'link') {
    const url = `${action.url}${action.url.indexOf('?') > -1 ? '&' : '?'}${params}`;
    if (action.isNewWindow) {
      window.open(url);
    } else {
      window.location.href = url;
    }
  }
};

/**
 * 变量赋值
 */
const handleVariable = ({ action, next }: ActionNode<VariableAction>, data: any) => {
  let value = action.assignmentType === 'reset' ? undefined : data[action.name];
  /**
   * 1. 变量重置，清空variableData中的数据
   * 2. 变量静态赋值，直接使用定义的value
   * 3. 变量动态赋值，使用上一个行为中返回的数据作为结果赋值
   */
  if (action.assignmentType === 'reset') {
    value = undefined;
  } else if (action.assignmentType === 'assignment') {
    if (action.assignmentWay === 'static') {
      value = action.value;
    } else {
      value = data;
    }
  }
  usePageStore.getState().setVariableData({
    name: action.name,
    value,
  });
  execAction(next?.success || next, data);
};

/**
 * 复制内容
 */
const handleCopy = async ({ action, next }: ActionNode<CopyAction>, data: any) => {
  try {
    const copyContent = renderTemplate(action.content, data || {});
    await copyText(copyContent);
    execAction(next?.success || next, data);
  } catch (error) {
    console.log('执行复制行为：', error);
  }
};

/**
 * 定时器
 */
const handleSetTimeout = async ({ action, next }: ActionNode<{ duration: number }>, data: any) => {
  setTimeout(() => {
    execAction(next?.success || next, data);
  }, action.duration * 1000);
};

/**
 * 组件显示和隐藏
 */
const handleVisible = async ({ action, next }: ActionNode<{ target: string; showType: string; showResult: string; expression: any }>, data: any) => {
  const ref = getComponentRef(action.target);
  if (action.showType === 'static') {
    if (action.showResult === 'show') {
      ref.show({ ...data });
    } else {
      ref.hide({ ...data });
    }
  } else {
    const result = action.expression;
    if (result) {
      ref.show({ ...data });
    } else {
      ref.hide({ ...data });
    }
  }
  execAction(next?.success || next, data);
};

/**
 * 组件禁用
 */
const handleDisable = async (
  { action, next }: ActionNode<{ target: string; disableType: string; disableResult: string; expression: any }>,
  data: any,
) => {
  const ref = getComponentRef(action.target);
  if (action.disableType === 'static') {
    if (action.disableResult) {
      ref.disable({ ...data });
    } else {
      ref.enable({ ...data });
    }
  } else {
    const expression = action.expression ?? {};
    const formula = expression.value;
    const result = renderFormula(formula);
    if (result ? true : false) {
      ref.disable({ ...data });
    } else {
      ref.enable({ ...data });
    }
  }
  execAction(next?.success || next, data);
};

/**
 * 发送飞书消息
 */
const handleSendMessage = async (
  { action, next }: ActionNode<{ msgType: string; content: string; templateId: string; receiveId: number }>,
  data: any,
) => {
  const res = await request.post(`${import.meta.env.VITE_BASE_API}/robot/sendMessage`, { ...action, variables: data });
  if (res.data.code === 0) {
    execAction(next?.success || next, res.data.data);
  } else {
    execAction(next?.fail, res.msg);
  }
};

/**
 * 创建知识库副本
 */
const handleCreateNode = async ({ action, next }: ActionNode<{ space_id: number; node_token: string; title: string }>, data: any) => {
  const res = await request.post(`${import.meta.env.VITE_BASE_API}/robot/createNode`, { ...action, variables: data });
  if (res.data.code === 0) {
    execAction(next?.success || next, res.data.data);
  } else {
    execAction(next?.fail, res.msg);
  }
};

/**
 * 运行脚本
 */
const handleRunScripts = async ({ action, next }: ActionNode<{ scripts: string }>, data: any) => {
  const result = renderFormula(action.scripts, data);
  if (typeof result === 'boolean') {
    if (result) {
      execAction(next?.success || next, data);
    } else {
      execAction(next?.fail, data);
    }
  } else {
    // result 为undfined/null时才用data兜底
    execAction(next?.success || next, result ?? data);
  }
};
