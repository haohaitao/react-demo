import { Link, useRouteError, isRouteErrorResponse } from 'react-router';
import { MainWrapper } from './layout/style';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import pic from '@/assets/404.png';

/**
 * 路由级错误边界。
 *
 * 注意这里刻意不渲染 <Outlet />：错误状态下没有匹配的子路由，
 * Outlet 只会渲染出空白。也刻意不复用 RootLayout，
 * 否则 Header/Footer 自身抛错时会再次落进同一个 errorElement。
 */
export function RouteError() {
  const error = useRouteError();
  useDocumentTitle('出错了', { raw: true });

  // 404 这类路由响应错误单独给文案，其余按未知异常处理
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  const title = is404 ? '你所访问的页面不存在！' : '页面出了点问题';

  const detail = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
    ? error.message
    : '';

  return (
    <MainWrapper>
      <div className="content">
        <div className="image-box">
          <img src={pic} alt="error" />
        </div>
        <h3>{title}</h3>
        <p>
          {detail && <span style={{ marginRight: 8 }}>{detail}</span>}
          <Link to="/">点击这里</Link>返回首页
        </p>
      </div>
    </MainWrapper>
  );
}

export default RouteError;
