import { Dropdown, Space } from 'antd';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import style from './index.module.less';
function HomeHeader() {
  const userInfo: any = useLoaderData();
  const navigate = useNavigate();
  return (
    <div className={style.homeHeader}>
      <div className={style.logo}>
        <img width={40} src="https://marsview.cdn.bcebos.com/mars-logo.png" alt="logo" />
        <span>工作台</span>
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
            {`${userInfo?.userName}` || '开发者'}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}
export default HomeHeader;
