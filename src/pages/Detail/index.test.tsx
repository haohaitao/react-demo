import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';

import { renderWithProviders } from '@/test/utils';
import Detail from './index';
import { normalizePost } from '@/api/normalize';
import { rawPost, tags } from '@/test/fixtures';

vi.mock('@/api/wp', () => ({
  getPost: vi.fn(),
  getTag: vi.fn(),
}));

// Valine 走动态 import，测试里直接 mock 掉
vi.mock('valine', () => ({
  default: class {
    constructor() {}
  },
}));

const { getPost, getTag } = await import('@/api/wp');

describe('Detail 文章详情', () => {
  it('文章请求未完成时显示详情骨架屏', () => {
    vi.mocked(getPost).mockImplementation(() => new Promise(() => {}));

    renderWithProviders(<Detail />, {
      route: '/article/101',
      path: '/article/:id',
    });

    expect(screen.getByLabelText('文章详情加载中')).toBeInTheDocument();
    expect(screen.queryByText('你好，世界')).not.toBeInTheDocument();
  });

  beforeEach(() => {
    vi.mocked(getPost).mockResolvedValue(normalizePost(rawPost));
    vi.mocked(getTag).mockImplementation((id: number) =>
      Promise.resolve(tags.find((t) => t.id === id)!),
    );
  });

  it('渲染文章标题和正文', async () => {
    renderWithProviders(<Detail />, {
      route: '/article/101',
      path: '/article/:id',
    });

    await waitFor(() => {
      expect(screen.getByText('你好，世界')).toBeInTheDocument();
    });
  });

  it('按 URL 参数请求对应文章', async () => {
    renderWithProviders(<Detail />, {
      route: '/article/101',
      path: '/article/:id',
    });

    await waitFor(() => {
      expect(getPost).toHaveBeenCalledWith('101');
    });
  });

  it('并行请求文章的所有标签并渲染', async () => {
    renderWithProviders(<Detail />, {
      route: '/article/101',
      path: '/article/:id',
    });

    await waitFor(() => {
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });
  });

  it('有上下篇时渲染导航箭头', async () => {
    const { container } = renderWithProviders(<Detail />, {
      route: '/article/101',
      path: '/article/:id',
    });

    await waitFor(() => {
      expect(container.querySelector('.post-nav-l')).toBeInTheDocument();
      expect(container.querySelector('.post-nav-r')).toBeInTheDocument();
    });
  });

  it('没有上下篇时不渲染导航箭头', async () => {
    vi.mocked(getPost).mockResolvedValue(
      normalizePost({ ...rawPost, next_post_id: null, previous_post_id: null }),
    );

    const { container } = renderWithProviders(<Detail />, {
      route: '/article/101',
      path: '/article/:id',
    });

    await waitFor(() => {
      expect(screen.getByText('你好，世界')).toBeInTheDocument();
    });
    expect(container.querySelector('.post-nav-l')).not.toBeInTheDocument();
    expect(container.querySelector('.post-nav-r')).not.toBeInTheDocument();
  });

  it('渲染格式化后的发布时间和最后编辑时间', async () => {
    renderWithProviders(<Detail />, {
      route: '/article/101',
      path: '/article/:id',
    });

    await waitFor(() => {
      expect(
        screen.getByText('发布于：2024-03-15 10:30:00'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('最后编辑时间：2024-03-16 08:00:00'),
      ).toBeInTheDocument();
    });
  });
});
