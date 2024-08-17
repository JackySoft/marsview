import { Dropdown, Space } from 'antd';
import style from './index.module.less';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
function HomeHeader() {
  const userInfo: any = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className={style.homeHeader}>
      <div className={style.logo}>
        <img width={38} src="/imgs/mars-logo.png" alt="logo" />
        工作台
      </div>
      <Dropdown
        menu={{
          items: [
            {
              key: '1',
              label: `${userInfo?.userName}`,
            },
            {
              key: '2',
              label: (
                <div
                  onClick={(e) => {
                    localStorage.clear();
                    navigate(`/login?callback=${window.location.href}`);
                  }}
                >
                  退出
                </div>
              ),
            },
          ],
          selectable: true,
        }}
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <span>{`${userInfo?.userName}` || '开发者'}</span>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}
export default HomeHeader;
