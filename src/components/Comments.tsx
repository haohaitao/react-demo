import { useEffect, useRef } from 'react';
import { VALINE_CONFIG } from '@/config';

interface CommentsProps {
  /** 评论区绑定的路径，通常用文章的路由路径 */
  path: string;
}

/**
 * Valine 评论区。
 *
 * 旧代码直接在请求回调里 `new Valine({ el: '#vcomments' })`，
 * 有三个问题：
 * 1. 没有清理逻辑，React 18+ 严格模式下 effect 跑两次会出现两个评论框
 * 2. appId / appKey 硬编码在源码里
 * 3. 挂载时机依赖请求回调，切换文章时可能重复初始化
 *
 * 这里改用 ref 绑定容器 + 带 cleanup 的 useEffect，密钥走环境变量。
 */
export function Comments({ path }: CommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (!VALINE_CONFIG.appId || !VALINE_CONFIG.appKey) {
      if (import.meta.env.DEV) {
        console.warn(
          '[Comments] 未配置 VITE_VALINE_APP_ID / VITE_VALINE_APP_KEY，评论区已跳过渲染',
        );
      }
      return;
    }

    let cancelled = false;

    // 动态引入，避免 valine 进入首屏包
    import('valine').then(({ default: Valine }) => {
      if (cancelled || !containerRef.current) return;

      new Valine({
        el: containerRef.current,
        appId: VALINE_CONFIG.appId,
        appKey: VALINE_CONFIG.appKey,
        notify: true,
        verify: true,
        avatar: 'mp',
        placeholder: 'ヾﾉ≧∀≦)o来啊，快活啊!',
        recordIP: true,
        path,
      });
    });

    return () => {
      cancelled = true;
      // Valine 没有提供 destroy 方法，直接清空容器
      if (el) el.innerHTML = '';
    };
  }, [path]);

  return <div id="vcomments" ref={containerRef} />;
}
