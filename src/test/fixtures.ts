import type { RawPost, Tag, Category } from '@/types/wp';

/** 一条完整的接口原始文章数据 */
export const rawPost: RawPost = {
  id: 101,
  date: '2024-03-15T10:30:00',
  modified: '2024-03-16T08:00:00',
  slug: 'hello-world',
  link: 'https://example.com/hello-world',
  title: { rendered: '你好，世界' },
  excerpt: { rendered: '<p>这是摘要</p>' },
  content: { rendered: '<p>这是正文</p>' },
  categories: [7, 9],
  tags: [1, 2],
  content_first_image: 'https://example.com/cover.jpg',
  views: 233,
  total_comments: 5,
  post_date: '2024-03-15',
  category_name: '前端',
  next_post_id: 102,
  previous_post_id: 100,
};

/** 缺失全部可选字段的文章，用来验证兜底逻辑 */
export const minimalRawPost: RawPost = {
  id: 202,
  date: '2024-01-01T00:00:00',
  modified: '2024-01-01T00:00:00',
  slug: 'minimal',
  link: 'https://example.com/minimal',
  title: { rendered: '最小文章' },
  excerpt: { rendered: '' },
  content: { rendered: '' },
  categories: [],
  tags: [],
};

export const tags: Tag[] = [
  { id: 1, name: 'React', slug: 'react', count: 12 },
  { id: 2, name: 'TypeScript', slug: 'typescript', count: 8 },
];

export const categories: Category[] = [
  { id: 7, name: '前端', slug: 'frontend', count: 20, parent: 0 },
  { id: 9, name: '随笔', slug: 'essay', count: 4, parent: 0 },
];
