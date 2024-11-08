import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
function NotFound() {
  const navigate = useNavigate();

  return (
    <Result
      status={500}
      title="500"
      subTitle={`当前页面暂未发布，请到编辑器端发布后访问。`}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          回首页
        </Button>
      }
    />
  );
}

export default NotFound;
