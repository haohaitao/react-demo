/**
 * 全局配置常量
 */

/** 接口根地址，开发环境为空串（走 vite 代理） */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * WordPress REST API 的路径前缀。
 *
 * 开发环境没有 baseURL，需要带上 `/api` 前缀触发 vite 代理；
 * 生产环境已经有了真实的 baseURL，直接用 `/wp-json` 即可。
 */
export const WP_API = API_BASE_URL ? '/wp-json/wp/v2' : '/api/wp-json/wp/v2';

/** 站点名，用于拼接页面标题 */
export const SITE_NAME = '郝海涛的个人网站';

/** 首页每页文章数 */
export const HOME_PAGE_SIZE = 10;

/** 分类详情页每页文章数 */
export const CATEGORY_PAGE_SIZE = 12;

/** 「每日一图」对应的 WordPress 页面 id */
export const EVERYDAY_PAGE_ID = 994;

/** Valine 评论系统配置 */
export const VALINE_CONFIG = {
  appId: import.meta.env.VITE_VALINE_APP_ID || '',
  appKey: import.meta.env.VITE_VALINE_APP_KEY || '',
} as const;
