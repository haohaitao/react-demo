import { describe, it, expect } from 'vitest';
import type { AxiosResponse } from 'axios';

import {
  normalizePost,
  toPaged,
  formatDate,
  formatDateTime,
} from '@/api/normalize';
import { rawPost, minimalRawPost } from '@/test/fixtures';

describe('normalizePost', () => {
  it('解包 title/excerpt/content 的 rendered 字段', () => {
    const post = normalizePost(rawPost);
    expect(post.title).toBe('你好，世界');
    expect(post.excerpt).toBe('<p>这是摘要</p>');
    expect(post.content).toBe('<p>这是正文</p>');
  });

  it('把自定义字段映射为驼峰命名', () => {
    const post = normalizePost(rawPost);
    expect(post.coverImage).toBe('https://example.com/cover.jpg');
    expect(post.pageviews).toBe(233);
    expect(post.totalComments).toBe(5);
    expect(post.categoryName).toBe('前端');
    expect(post.nextPostId).toBe(102);
    expect(post.previousPostId).toBe(100);
  });

  it('取 categories 数组的第一项作为 categoryId', () => {
    expect(normalizePost(rawPost).categoryId).toBe(7);
  });

  // 这是旧代码的一个真实缺陷：写的是 res.data.categories["0"]，
  // 分类为空时会静默拿到 undefined
  it('categories 为空数组时 categoryId 应为 undefined 而不抛错', () => {
    expect(() => normalizePost(minimalRawPost)).not.toThrow();
    expect(normalizePost(minimalRawPost).categoryId).toBeUndefined();
  });

  it('可选的数值字段缺失时回退为 0', () => {
    const post = normalizePost(minimalRawPost);
    expect(post.pageviews).toBe(0);
    expect(post.totalComments).toBe(0);
    expect(post.coverImage).toBe('');
    expect(post.tagIds).toEqual([]);
  });

  it('优先使用 post_date，缺失时从 ISO 串截取日期', () => {
    expect(normalizePost(rawPost).displayDate).toBe('2024-03-15');
    expect(normalizePost(minimalRawPost).displayDate).toBe('2024-01-01');
  });
});

describe('toPaged', () => {
  function fakeResponse(headers: Record<string, string>) {
    return { headers } as unknown as AxiosResponse<unknown>;
  }

  it('从响应头读出总数和总页数', () => {
    const paged = toPaged(
      fakeResponse({ 'x-wp-total': '42', 'x-wp-totalpages': '5' }),
      [1, 2, 3],
    );
    expect(paged.total).toBe(42);
    expect(paged.totalPages).toBe(5);
    expect(paged.items).toEqual([1, 2, 3]);
  });

  it('响应头缺失时回退为 0', () => {
    const paged = toPaged(fakeResponse({}), []);
    expect(paged.total).toBe(0);
    expect(paged.totalPages).toBe(0);
  });

  it('响应头不是数字时回退为 0 而不是 NaN', () => {
    const paged = toPaged(fakeResponse({ 'x-wp-total': 'abc' }), []);
    expect(paged.total).toBe(0);
  });
});

describe('formatDateTime / formatDate', () => {
  it('把 ISO 串拆成日期 + 时间', () => {
    expect(formatDateTime('2024-03-15T10:30:00')).toBe('2024-03-15 10:30:00');
  });

  it('去掉末尾的 Z', () => {
    expect(formatDateTime('2024-03-15T10:30:00Z')).toBe('2024-03-15 10:30:00');
  });

  // 旧代码在 blog.date 为空时会抛 TypeError
  it('传入 undefined 时返回兜底值而不抛错', () => {
    expect(() => formatDateTime(undefined)).not.toThrow();
    expect(formatDateTime(undefined)).toBe('1970-01-01 00:00:00');
    expect(formatDate(undefined)).toBe('1970-01-01');
  });

  it('只有日期没有时间时原样返回日期', () => {
    expect(formatDateTime('2024-03-15')).toBe('2024-03-15');
  });
});
