import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * 路由变化时滚动到顶部。
 *
 * 替代旧代码里散落在各处的
 * `document.documentElement.scrollTop = document.body.scrollTop = 0`。
 * 挂在布局组件上即可，无需在每个跳转处手写。
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
