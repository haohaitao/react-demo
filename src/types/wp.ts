/**
 * WordPress REST API 类型定义
 *
 * 说明：本站的 WP 安装带有自定义字段（pageviews、content_first_image、
 * category_name、total_comments、post_date、next_post_id、previous_post_id），
 * 这些不是 WP 核心字段，是主题/插件加上的。
 *
 * WP 核心的 title/excerpt/content 都是 { rendered: string } 包一层，
 * 我们在 api 层解包，让组件拿到扁平的字符串。
 */

/** WP 核心字段惯用的「渲染后 HTML」包装 */
export interface Rendered {
  rendered: string;
}

/** 接口原始返回的文章结构（未解包） */
export interface RawPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  link: string;
  title: Rendered;
  excerpt: Rendered;
  content: Rendered;
  categories: number[];
  tags: number[];

  // --- 以下为本站自定义字段 ---
  /** 正文里的第一张图，用作列表封面 */
  content_first_image?: string;
  /** 浏览量 */
  views?: number;
  /** 评论数 */
  total_comments?: number;
  /** 格式化后的发布日期 */
  post_date?: string;
  /** 分类名（详情接口返回） */
  category_name?: string;
  /** 下一篇文章 id */
  next_post_id?: number | null;
  /** 上一篇文章 id */
  previous_post_id?: number | null;
}

/** 解包后供组件使用的文章结构 */
export interface Post {
  id: number;
  /** 已解包的纯文本/HTML 标题 */
  title: string;
  /** 已解包的摘要 HTML */
  excerpt: string;
  /** 已解包的正文 HTML */
  content: string;
  /** ISO 时间串，如 2024-01-01T12:00:00 */
  date: string;
  /** 最后修改时间，ISO 串 */
  modified: string;
  slug: string;
  link: string;
  /** 首个分类 id。原代码用 categories["0"]，这里改为安全取值 */
  categoryId?: number;
  categoryName?: string;
  categoryIds: number[];
  tagIds: number[];
  coverImage: string;
  pageviews: number;
  totalComments: number;
  /** 优先用自定义的 post_date，回退到 date 的日期部分 */
  displayDate: string;
  nextPostId?: number;
  previousPostId?: number;
}

/** 标签 */
export interface Tag {
  id: number;
  name: string;
  slug: string;
  count: number;
}

/** 分类 */
export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  parent: number;
}

/** 带分页信息的列表返回 */
export interface Paged<T> {
  items: T[];
  /** 来自响应头 x-wp-total */
  total: number;
  /** 来自响应头 x-wp-totalpages */
  totalPages: number;
}
