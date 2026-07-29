import type { AxiosResponse } from "axios";
import type { Paged, Post, RawPost } from "@/types/wp";

/**
 * 把接口原始文章结构解包成组件友好的扁平结构。
 *
 * 旧代码在 6 个地方重复写 `item.title = item.title.rendered`，
 * 现在统一收敛到这一个函数。
 */
export function normalizePost(raw: RawPost): Post {
  return {
    id: raw.id,
    title: raw.title?.rendered ?? "",
    excerpt: raw.excerpt?.rendered ?? "",
    content: raw.content?.rendered ?? "",
    date: raw.date,
    modified: raw.modified,
    slug: raw.slug,
    link: raw.link,
    // 旧代码写的是 categories["0"]，分类为空时会拿到 undefined 并静默出错，
    // 这里用可选取值明确表达「可能没有」
    categoryId: raw.categories?.[0],
    categoryName: raw.category_name,
    categoryIds: raw.categories ?? [],
    tagIds: raw.tags ?? [],
    coverImage: raw.content_first_image ?? "",
    pageviews: raw.views ?? 0,
    totalComments: raw.total_comments ?? 0,
    // 优先用接口给的格式化日期，没有则从 ISO 串里截出日期部分
    displayDate: raw.post_date ?? raw.date?.split("T")[0] ?? "",
    nextPostId: raw.next_post_id ?? undefined,
    previousPostId: raw.previous_post_id ?? undefined,
  };
}

/**
 * 从响应头里读出分页信息。
 * WP 用 x-wp-total / x-wp-totalpages 两个响应头传递总数。
 */
export function toPaged<T>(res: AxiosResponse<unknown>, items: T[]): Paged<T> {
  const total = Number(res.headers["x-wp-total"] ?? 0);
  const totalPages = Number(res.headers["x-wp-totalpages"] ?? 0);
  return {
    items,
    total: Number.isNaN(total) ? 0 : total,
    totalPages: Number.isNaN(totalPages) ? 0 : totalPages,
  };
}

/**
 * 把 ISO 时间串拆成 "YYYY-MM-DD HH:mm:ss"。
 * 旧代码里散落着 `blog.date.split("T")[0] + " " + blog.date.split("T")[1]`，
 * 且在字段为空时会抛异常，这里统一处理并给出兜底。
 */
export function formatDateTime(
  iso?: string,
  fallback = "1970-01-01 00:00:00",
): string {
  if (!iso) return fallback;
  const [date, time] = iso.split("T");
  if (!date) return fallback;
  return time ? `${date} ${time.replace("Z", "")}` : date;
}

/** 只取日期部分 */
export function formatDate(iso?: string, fallback = "1970-01-01"): string {
  if (!iso) return fallback;
  return iso.split("T")[0] || fallback;
}
