import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
function Forbidden() {
  const navigate = useNavigate();
  return (
    <Result
      status={403}
      title="403"
      subTitle="抱歉，您当前没有权限访问此页面"
      extra={
        <Button type="primary" onClick={() => navigate('/projects')}>
          返回列表
        </Button>
      }
    />
  );
}

export default Forbidden;
