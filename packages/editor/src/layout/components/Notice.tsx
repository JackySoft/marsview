import { FloatButton, Popover, Tooltip } from 'antd';
import { CommentOutlined, LinkOutlined, QuestionCircleOutlined, SoundOutlined } from '@ant-design/icons';
export default () => {
  return (
    <FloatButton.Group trigger="click" type="primary" style={{ insetInlineEnd: 24 }} icon={<SoundOutlined />}>
      <Tooltip title="使用文档" placement="left">
        <FloatButton icon={<LinkOutlined />} onClick={() => window.open('http://docs.marsview.com.cn', '_blank')} />
      </Tooltip>
      <Popover
        content={
          <>
            <p>1. 强烈建议直接点击左侧组件物料，无需拖拽即可渲染到画布中。</p>
            <p>2. 添加子组件时，直接选中父组件，点击左侧物料即可填充。</p>
            <p>3. 画布中的组件支持快捷键：ctrl+c/v 复制和粘贴；Del 删除。</p>
            <p>4. 表单组件，只能放在Form容器和搜索表单组件中，请勿单独使用。</p>
            <p>5. 支持接口调用，表单联动、自定义样式、逻辑编排，脚本运行，变量绑定等等。</p>
            <p>6. 页面支持通过微前端框架集成到自身传统项目中。</p>
            <p>7. 有任何技术和使用问题，请联系我，24H为你解答。</p>
          </>
        }
        title="使用说明(不建议使用拖拽功能)"
        placement="left"
      >
        <FloatButton icon={<QuestionCircleOutlined />} />
      </Popover>
      <Popover
        placement="left"
        content={
          <>
            <img width={150} src={`https://imgcloud.cdn.bcebos.com/f35323e9a2625a85909cb6f02.png`} />
            <p style={{ textAlign: 'center' }}>请备注：marsview</p>
          </>
        }
      >
        <FloatButton icon={<CommentOutlined />} />
      </Popover>
    </FloatButton.Group>
  );
};
