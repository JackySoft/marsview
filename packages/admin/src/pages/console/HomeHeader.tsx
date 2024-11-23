import { Dropdown, Flex, Space } from 'antd';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import style from './index.module.less';
function HomeHeader() {
  const userInfo: any = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className={style.homeHeader}>
      <div className={style.logo}>
        <img width={40} src={`${import.meta.env.VITE_CDN_URL}/mars-logo.png`} alt="logo" />
        <span>工作台</span>
      </div>
      <Flex align="center">
        {/* 用户头像 */}
        {userInfo.avatar ? <img width={30} src={userInfo.avatar} style={{ marginRight: 10 }} /> : null}
        <Dropdown
          menu={{
            items: [
              {
                key: 'profile',
                label: userInfo.userName,
              },
              {
                key: 'logout',
                label: '退出',
              },
            ],
            onClick: ({ key }) => {
              if (key === 'logout') {
                localStorage.clear();
                navigate(`/login?callback=${window.location.href}`);
              }
            },
            selectable: true,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {`${userInfo?.nickName}` || '开发者'}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Flex>
    </div>
  );
}
export default HomeHeader;
