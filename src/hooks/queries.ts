import { useQuery, useQueries } from '@tanstack/react-query';
import {
  postsQuery,
  postsByCategoryQuery,
  postQuery,
  latestPostsQuery,
  tagsQuery,
  tagQuery,
  categoriesQuery,
  everydayQuery,
} from '@/lib/queryOptions';

/**
 * 这些 hook 只负责「读」，query 的 key 和 queryFn 定义在 @/lib/queryOptions，
 * 路由 loader 会用同一份配置提前把数据写进缓存，
 * 所以组件挂载时通常已经能直接命中，不再出现第二次 loading。
 */

/** 首页文章列表 */
export function usePosts(page: number) {
  return useQuery(postsQuery(page));
}

/** 分类下的文章列表 */
export function usePostsByCategory(
  categoryId: string | undefined,
  page: number,
) {
  return useQuery({
    ...postsByCategoryQuery(categoryId ?? '', page),
    enabled: Boolean(categoryId),
  });
}

/**
 * 文章详情。
 *
 * queryKey 里含 id，所以 id 变化时会自动重新请求——
 * 这正是旧代码需要 UNSAFE_componentWillReceiveProps 复制一整段
 * 请求逻辑才能做到的事。
 */
export function usePost(id: string | undefined) {
  return useQuery({
    ...postQuery(id ?? ''),
    enabled: Boolean(id),
  });
}

/** 侧边栏「最新文章」 */
export function useLatestPosts() {
  return useQuery(latestPostsQuery());
}

/** 全部标签 */
export function useTags() {
  return useQuery(tagsQuery());
}

/**
 * 按 id 批量取标签（文章详情页用）。
 * 旧代码在 map 里逐个发请求并反复 setState，这里用 useQueries 并行处理，
 * 结果天然去重、可缓存。
 */
export function useTagsByIds(ids: number[]) {
  return useQueries({
    queries: ids.map((id) => tagQuery(id)),
    combine: (results) => ({
      data: results.flatMap((r) => (r.data ? [r.data] : [])),
      isPending: results.some((r) => r.isPending),
    }),
  });
}

/** 全部分类 */
export function useCategories() {
  return useQuery(categoriesQuery());
}

/** 每日一图 */
export function useEveryday() {
  return useQuery(everydayQuery());
}
