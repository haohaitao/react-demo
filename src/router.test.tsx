import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { screen, waitFor, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, App as AntdApp } from 'antd';

import { PageFallback } from '@/components/PageFallback';
import { postQuery } from '@/lib/queryOptions';
import { normalizePost } from '@/api/normalize';
import { rawPost } from '@/test/fixtures';
import type { Post } from '@/types/wp';

vi.mock('@/api/wp', () => ({
  getPost: vi.fn(),
  getTag: vi.fn(),
}));

vi.mock('valine', () => ({ default: class {} }));

const { getPost } = await import('@/api/wp');

/**
 * 这组用例锁的是「只出现一次 loading」这个行为本身。
 *
 * 改造前：路由用 React.lazy + Suspense，数据请求写在组件里，
 * 必须等 chunk 下载完、组件挂载后才发起 → 用户先看到 Suspense 的 Spin，
 * 再看到组件内 isPending 的 Spin，两个 loading 前后脚出现。
 *
 * 改造后：loader 预取数据、路由 lazy 加载组件，两者并行；
 * 组件挂载时缓存已就绪，isPending 直接为 false。
 */
describe('路由 loader 预取', () => {
  let queryClient: QueryClient;
  let resolveGetPost: (v: Post) => void;

  beforeEach(() => {
    queryClient = new QueryClient({
      // 不要把 gcTime 设成 0：loader 写入缓存时还没有任何 observer，
      // 数据会被立刻回收，组件挂载时又变成空缓存——那样测的就不是真实行为了
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    vi.mocked(getPost).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveGetPost = resolve;
        }),
    );
  });

  afterEach(() => {
    queryClient.clear();
  });

  function renderRoute() {
    const router = createMemoryRouter(
      [
        {
          path: '/article/:id',
          HydrateFallback: PageFallback,
          loader: ({ params }) =>
            queryClient.ensureQueryData(postQuery(params.id!)),
          lazy: {
            Component: () => import('@/pages/Detail').then((m) => m.default),
          },
        },
      ],
      { initialEntries: ['/article/101'] },
    );

    return render(
      <ConfigProvider>
        <AntdApp>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AntdApp>
      </ConfigProvider>,
    );
  }

  it('数据未就绪时组件不挂载，页面上只有一个 loading', async () => {
    const { container } = renderRoute();

    // loader 还在 pending：此时只有 HydrateFallback，组件本体尚未渲染
    await waitFor(() => {
      expect(container.querySelectorAll('.ant-spin-spinning')).toHaveLength(1);
    });
    expect(container.querySelector('.detail-article')).not.toBeInTheDocument();
  });

  it('loader 完成后组件直接拿到数据，不再出现第二个 loading', async () => {
    const { container } = renderRoute();

    await waitFor(() => expect(getPost).toHaveBeenCalled());
    resolveGetPost(normalizePost(rawPost));

    await waitFor(() => {
      expect(screen.getByText('你好，世界')).toBeInTheDocument();
    });
    // 关键断言：正文出现的同时，页面上不该还留着任何转圈
    expect(container.querySelectorAll('.ant-spin-spinning')).toHaveLength(0);
  });
});
