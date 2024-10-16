import { Col, Row, Space, Tabs, Tooltip } from 'antd';
import {
  AppstoreOutlined,
  PartitionOutlined,
  CodeOutlined,
  ApiOutlined,
  FunctionOutlined,
  UsergroupAddOutlined,
  ProjectOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import PageList from './Pages/PageList';
import ComponentPanel from './ComponentPanel';
import OutlinePanel from './OutlinePanel';
import CodingPanel from './CodingPanel';
import ApiList from './ApiList/ApiList';
import MemberList from './Member/MemberList';
import VariableList from './Variable/VariableList';
import styles from './index.module.less';

/**
 * 左侧面板类型
 */
const panels = [
  {
    key: 'ComponentPanel',
    icon: <AppstoreOutlined />,
    title: (
      <Space>
        <span>组件物料</span>
        <Tooltip title="无需拖拽，直接点击就能添加到画布中。">
          <QuestionCircleOutlined />
        </Tooltip>
      </Space>
    ),
    component: () => {
      return <ComponentPanel />;
    },
  },
  {
    key: 'home',
    icon: <ProjectOutlined />,
    title: '页面列表',
    component: () => {
      return <PageList />;
    },
  },
  {
    key: 'OutlinePanel',
    icon: <PartitionOutlined />,
    title: (
      <Space>
        <span>页面大纲</span>
        <Tooltip title="组件支持拖拽排序">
          <QuestionCircleOutlined />
        </Tooltip>
      </Space>
    ),
    component: () => {
      return <OutlinePanel />;
    },
  },
  {
    key: 'CodingPanel',
    icon: <CodeOutlined />,
    title: '页面JSON',
    component: () => {
      return <CodingPanel />;
    },
  },
  {
    key: 'ApiList',
    icon: <ApiOutlined />,
    title: '页面接口',
    component: () => {
      return <ApiList />;
    },
  },
  {
    key: 'Variable',
    icon: <FunctionOutlined />,
    title: '页面变量',
    component: () => {
      return <VariableList />;
    },
  },
  {
    key: 'Member',
    icon: <UsergroupAddOutlined />,
    title: '页面成员',
    component: () => {
      return <MemberList />;
    },
  },
];

/**
 * 生成左侧组件列表
 */

const Menu = () => {
  return (
    <>
      <Tabs
        size={'small'}
        defaultActiveKey={panels[0].key}
        tabPosition="left"
        tabBarStyle={{ width: '50px', height: 'calc(100vh - 64px)' }}
        className={styles.leftTool}
        centered={true}
        items={panels.map((item) => {
          return {
            key: item.key,
            label: (
              <Tooltip placement="right" title={item.title}>
                {item.icon}
              </Tooltip>
            ),
            children: (
              <div style={{ marginLeft: -10, marginRight: 10 }}>
                <Row style={{ height: 46 }} align={'middle'} justify={'space-between'}>
                  <Col>
                    <span style={{ fontWeight: 'bold' }}>{item.title}</span>
                  </Col>
                </Row>
                {item.component?.()}
              </div>
            ),
          };
        })}
      />
    </>
  );
};

export default Menu;
