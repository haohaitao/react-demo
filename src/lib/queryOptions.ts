import { queryOptions, keepPreviousData } from '@tanstack/react-query';

import { queryKeys } from './queryClient';
import * as api from '@/api/wp';
import { HOME_PAGE_SIZE, CATEGORY_PAGE_SIZE } from '@/config';

/**
 * query 配置的单一来源。
 *
 * 路由 loader 用 `ensureQueryData(xxxQuery(...))` 预取，
 * 组件用 `useQuery(xxxQuery(...))` 读取，两边共用同一份 key 和 queryFn，
 * 保证 loader 写进缓存的数据能被组件直接命中，不会二次请求。
 */

export const postsQuery = (page: number) =>
  queryOptions({
    queryKey: queryKeys.posts(page),
    queryFn: () => api.getPosts(page, HOME_PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

export const postsByCategoryQuery = (categoryId: string, page: number) =>
  queryOptions({
    queryKey: queryKeys.postsByCategory(categoryId, page),
    queryFn: () => api.getPostsByCategory(categoryId, page, CATEGORY_PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

export const postQuery = (id: string) =>
  queryOptions({
    queryKey: queryKeys.post(id),
    queryFn: () => api.getPost(id),
  });

export const latestPostsQuery = () =>
  queryOptions({
    queryKey: queryKeys.latestPosts(),
    queryFn: api.getLatestPosts,
  });

export const tagsQuery = () =>
  queryOptions({
    queryKey: queryKeys.tags(),
    queryFn: api.getTags,
  });

export const tagQuery = (id: number) =>
  queryOptions({
    queryKey: queryKeys.tag(id),
    queryFn: () => api.getTag(id),
    staleTime: 30 * 60 * 1000, // 标签几乎不变，缓存久一些
  });

export const categoriesQuery = () =>
  queryOptions({
    queryKey: queryKeys.categories(),
    queryFn: api.getCategories,
  });

export const categoriesByIdsQuery = (ids: number[]) =>
  queryOptions({
    queryKey: queryKeys.categoriesByIds(ids),
    queryFn: () => api.getCategoriesByIds(ids),
    staleTime: 30 * 60 * 1000, // 分类几乎不变，缓存久一些
  });

export const everydayQuery = () =>
  queryOptions({
    queryKey: queryKeys.everyday(),
    queryFn: api.getEveryday,
  });
