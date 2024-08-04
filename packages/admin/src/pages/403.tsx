import { Button, Result } from 'antd';
import { useSearchParams } from 'react-router-dom';
function Forbidden() {
  const [searchParams] = useSearchParams();

  const navigate = (path: string) => {
    window.open(path);
  };
  return (
    <Result
      status={403}
      title="403"
      subTitle={`抱歉，您当前没有权限访问此${searchParams.get('type') === 'project' ? '项目' : '页面'}`}
      extra={
        <Button type="primary" onClick={() => navigate(`http://www.marsview.cc/`)}>
          返回Mars平台
        </Button>
      }
    />
  );
}

export default Forbidden;
