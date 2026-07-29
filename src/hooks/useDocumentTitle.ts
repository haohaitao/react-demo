import { useEffect } from 'react';
import { SITE_NAME } from '@/config';

/**
 * 设置页面标题。
 *
 * 替代旧代码里 5 个页面各自在 componentDidMount 里写的
 * `document.title = "xxx - 郝海涛的个人网站"`。
 *
 * @param title 页面标题。传空则只显示站名。
 * @param options.raw 为 true 时不拼接站名，直接使用传入的完整标题
 */
export function useDocumentTitle(title?: string, options?: { raw?: boolean }) {
  useEffect(() => {
    const previous = document.title;

    if (!title) {
      document.title = SITE_NAME;
    } else if (options?.raw) {
      document.title = title;
    } else {
      document.title = `${title} - ${SITE_NAME}`;
    }

    return () => {
      document.title = previous;
    };
  }, [title, options?.raw]);
}
