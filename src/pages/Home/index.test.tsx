import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';

import { renderWithProviders, userEvent } from '@/test/utils';
import Home from './index';
import { normalizePost } from '@/api/normalize';
import { rawPost } from '@/test/fixtures';

// mock 掉 api 层，测试只关心组件到 hook 的数据流
vi.mock('@/api/wp', () => ({
  getPosts: vi.fn(),
  getLatestPosts: vi.fn(() => Promise.resolve([])),
  getTags: vi.fn(() => Promise.resolve([])),
}));

const { getPosts } = await import('@/api/wp');

describe('Home 首页', () => {
  beforeEach(() => {
    vi.mocked(getPosts).mockResolvedValue({
      items: [normalizePost(rawPost)],
      total: 25,
      totalPages: 3,
    });
  });

  it('加载完成后渲染文章列表', async () => {
    renderWithProviders(<Home />, { route: '/', path: '/' });

    await waitFor(() => {
      expect(screen.getByText('你好，世界')).toBeInTheDocument();
    });
  });

  it('首次进入请求第 1 页', async () => {
    renderWithProviders(<Home />, { route: '/', path: '/' });

    await waitFor(() => {
      expect(getPosts).toHaveBeenCalledWith(1, 10);
    });
  });

  // 旧站的 URL 规则：第 1 页是 /，其余是 /page/N
  it('URL 带页码时请求对应页', async () => {
    renderWithProviders(<Home />, { route: '/page/3', path: '/page/:page' });

    await waitFor(() => {
      expect(getPosts).toHaveBeenCalledWith(3, 10);
    });
  });

  it('页码非法时回退到第 1 页', async () => {
    renderWithProviders(<Home />, {
      route: '/page/abc',
      path: '/page/:page',
    });

    await waitFor(() => {
      expect(getPosts).toHaveBeenCalledWith(1, 10);
    });
  });

  it('分页组件显示接口返回的总数', async () => {
    renderWithProviders(<Home />, { route: '/', path: '/' });

    await waitFor(() => {
      expect(screen.getByText('你好，世界')).toBeInTheDocument();
    });
    // 25 条 / 每页 10 条 = 3 页
    expect(screen.getByRole('listitem', { name: '3' })).toBeInTheDocument();
  });

  it('点击第 2 页会跳转到 /page/2', async () => {
    const user = userEvent.setup();
    // 同时注册 /page/:page，否则跳转后无路由匹配会渲染出 404 错误页
    const { router } = renderWithProviders(<Home />, {
      route: '/',
      path: ['/', '/page/:page'],
    });

    await waitFor(() => {
      expect(screen.getByText('你好，世界')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('listitem', { name: '2' }));

    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/page/2');
    });
  });
});
