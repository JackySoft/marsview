import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
function Forbidden() {
  const navigate = useNavigate();

  return (
    <Result
      status={403}
      title="403"
      subTitle="抱歉，您当前暂无权限访问"
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          回首页
        </Button>
      }
    />
  );
}

export default Forbidden;
