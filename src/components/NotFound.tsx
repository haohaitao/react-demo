import { Link } from 'react-router';
import { MainWrapper } from './layout/style';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import pic from '@/assets/404.png';

export function NotFound() {
  useDocumentTitle('404-NotFound', { raw: true });

  return (
    <MainWrapper>
      <div className="content">
        <div className="image-box">
          <img src={pic} alt="404" />
        </div>
        <h3>你所访问的页面不存在！</h3>
        <p>
          资源不存在或者没有访问权限，<Link to="/">点击这里</Link>返回首页
        </p>
      </div>
    </MainWrapper>
  );
}

export default NotFound;
