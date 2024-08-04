import { Result, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
function NotFound() {
  const navigate = useNavigate();
  const { projectId, env } = useParams();
  const handleBack = () => {
    navigate(`/project/${env}/${projectId}/welcome`);
  };
  return (
    <Result
      status={404}
      title="无法找到该页面"
      subTitle="当前页面路径不存在，请检查路由地址是否正确或页面是否发布"
      extra={
        <Button type="primary" onClick={handleBack}>
          返回首页
        </Button>
      }
    />
  );
}

export default NotFound;
