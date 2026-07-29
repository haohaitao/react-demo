import { describe, it, expect, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useDocumentTitle } from './useDocumentTitle';
import { SITE_NAME } from '@/config';

describe('useDocumentTitle', () => {
  afterEach(() => {
    document.title = '';
  });

  it('默认拼接站名', () => {
    renderHook(() => useDocumentTitle('关于'));
    expect(document.title).toBe(`关于 - ${SITE_NAME}`);
  });

  it('raw 模式下直接使用传入标题', () => {
    renderHook(() => useDocumentTitle('404-NotFound', { raw: true }));
    expect(document.title).toBe('404-NotFound');
  });

  it('标题为空时只显示站名', () => {
    renderHook(() => useDocumentTitle(undefined));
    expect(document.title).toBe(SITE_NAME);
  });

  it('卸载后恢复上一个标题', () => {
    document.title = '原标题';
    const { unmount } = renderHook(() => useDocumentTitle('新标题'));
    expect(document.title).toBe(`新标题 - ${SITE_NAME}`);
    unmount();
    expect(document.title).toBe('原标题');
  });

  it('标题变化时同步更新', () => {
    const { rerender } = renderHook(
      ({ title }: { title: string }) => useDocumentTitle(title),
      { initialProps: { title: '第一页' } },
    );
    expect(document.title).toBe(`第一页 - ${SITE_NAME}`);

    rerender({ title: '第二页' });
    expect(document.title).toBe(`第二页 - ${SITE_NAME}`);
  });
});
