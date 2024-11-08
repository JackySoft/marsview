import { Button, Result } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
function NotFound() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return (
    <Result
      status={404}
      title="404"
      subTitle={`抱歉，您访问的${searchParams.get('type') === 'project' ? '项目' : '页面'}不存在，请检查。`}
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          回首页
        </Button>
      }
    />
  );
}

export default NotFound;
