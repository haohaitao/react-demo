import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { RouteProgress } from '@/components/RouteProgress';

/**
 * 全站布局。
 *
 * 旧代码把 Header/Footer 直接写在 <Switch> 外面，
 * 这里改用 react-router 的 layout 路由 + <Outlet />，
 * 语义更清晰，也便于将来做嵌套布局。
 */
export function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <RouteProgress />
      <Outlet />
      <Footer />
    </>
  );
}
