import { get, getWithHeaders } from './http';
import { normalizePost, toPaged } from './normalize';
import { WP_API, HOME_PAGE_SIZE, EVERYDAY_PAGE_ID } from '@/config';
import type { Paged, Post, RawPost, Tag, Category } from '@/types/wp';

/** 文章列表（首页用），带分页 */
export async function getPosts(
  page = 1,
  perPage = HOME_PAGE_SIZE,
): Promise<Paged<Post>> {
  const res = await getWithHeaders<RawPost[]>(`${WP_API}/posts`, {
    per_page: perPage,
    page,
  });
  return toPaged(res, res.data.map(normalizePost));
}

/** 某个分类下的文章列表，带分页 */
export async function getPostsByCategory(
  categoryId: number | string,
  page = 1,
  perPage = 12,
): Promise<Paged<Post>> {
  const res = await getWithHeaders<RawPost[]>(`${WP_API}/posts`, {
    per_page: perPage,
    page,
    categories: categoryId,
  });
  return toPaged(res, res.data.map(normalizePost));
}

/** 文章详情 */
export async function getPost(id: number | string): Promise<Post> {
  const raw = await get<RawPost>(`${WP_API}/posts/${id}`);
  return normalizePost(raw);
}

/** 最新文章（侧边栏用，不需要分页信息） */
export async function getLatestPosts(): Promise<Post[]> {
  const list = await get<RawPost[]>(`${WP_API}/posts`);
  return list.map(normalizePost);
}

/** 全部标签 */
export function getTags(): Promise<Tag[]> {
  return get<Tag[]>(`${WP_API}/tags`);
}

/** 单个标签 */
export function getTag(id: number): Promise<Tag> {
  return get<Tag>(`${WP_API}/tags/${id}`);
}

/** 全部分类 */
export function getCategories(): Promise<Category[]> {
  return get<Category[]>(`${WP_API}/categories`);
}

/**
 * 「每日一图」页面。
 * 旧实现硬编码了 WP 页面 id 994，这里保持一致但把 id 提到 config 里，
 * 方便日后页面被重建时修改。
 */
export async function getEveryday(): Promise<Post> {
  const raw = await get<RawPost>(`${WP_API}/pages/${EVERYDAY_PAGE_ID}`);
  return normalizePost(raw);
}
