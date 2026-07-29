import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 博客内容更新不频繁，5 分钟内认为数据是新鲜的，避免重复请求
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      // 切回标签页时不自动重取，博客场景没必要
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

/**
 * 统一管理 query key，避免在组件里手写字符串导致缓存命中不了。
 */
export const queryKeys = {
  posts: (page: number) => ['posts', page] as const,
  post: (id: string | number) => ['post', String(id)] as const,
  postsByCategory: (categoryId: string | number, page: number) =>
    ['posts', 'category', String(categoryId), page] as const,
  latestPosts: () => ['posts', 'latest'] as const,
  tags: () => ['tags'] as const,
  tag: (id: number) => ['tag', id] as const,
  categories: () => ['categories'] as const,
  categoriesByIds: (ids: number[]) => ['categories', 'byIds', ids] as const,
  everyday: () => ['everyday'] as const,
} as const;
