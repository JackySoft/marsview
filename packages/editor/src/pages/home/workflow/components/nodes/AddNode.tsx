import { useState } from 'react';
import { Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ApproverIcon, NotifierIcon, DealerIcon, ConditionIcon } from '../Icons';
import { useApprovalContext } from '../context';
import style from '../index.module.less';
/**
 * 节点加号按钮
 */
const AddNode = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { handleCreateNode } = useApprovalContext();
  return (
    <span className={style['add-node-btn']}>
      <Popover
        trigger="click"
        placement="rightTop"
        open={open}
        onOpenChange={(newOpen: boolean) => setOpen(newOpen)}
        content={
          <div className={style['popover-wrapper']}>
            <div
              className={style['popover-item']}
              onClick={() => {
                handleClose();
                handleCreateNode('approver', id);
              }}
            >
              <div className={style['icon']} style={{ color: '#ff943e' }}>
                {ApproverIcon}
              </div>
              <span>审批人</span>
            </div>
            <div
              className={style['popover-item']}
              onClick={() => {
                handleClose();
                handleCreateNode('notifier', id);
              }}
            >
              <div className={style['icon']} style={{ color: '#4ca3fb' }}>
                {NotifierIcon}
              </div>
              <span>抄送人</span>
            </div>
            <div
              className={style['popover-item']}
              onClick={() => {
                handleClose();
                handleCreateNode('dealer', id);
              }}
            >
              <div className={style['icon']} style={{ color: '#fb602d' }}>
                {DealerIcon}
              </div>
              <span>办理人</span>
            </div>
            <div
              className={style['popover-item']}
              onClick={() => {
                handleClose();
                handleCreateNode('condition', id);
              }}
            >
              <div className={style['icon']} style={{ color: '#15bc83' }}>
                {ConditionIcon}
              </div>
              <span>条件分支</span>
            </div>
          </div>
        }
      >
        <span className={style['add-icon']}>
          <PlusOutlined style={{ fontSize: 16, color: '#fff' }} />
        </span>
      </Popover>
    </span>
  );
};
export default AddNode;
