import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import { message } from 'antd';

/**
 * 接口根地址。
 * - 开发环境：留空，请求 /api/xxx 走 vite.config.ts 的代理
 * - 生产环境：由 VITE_API_BASE_URL 指定真实域名
 */
const baseURL = import.meta.env.VITE_API_BASE_URL || '';

export const http = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * 响应拦截器。
 *
 * 注意：旧代码里 `if (response.status === 200)` 的判断是多余的——
 * axios 默认只把 2xx 当成功，非 2xx 本来就会走到 reject 分支。
 * 这里只保留错误分支的统一提示。
 */
http.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // 请求被主动取消时不提示（比如组件卸载、query 被 abort）
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    const text =
      status === 404
        ? '内容不存在或已被删除'
        : status === 429
        ? '请求过于频繁，请稍后重试'
        : '数据异常，请稍后重试';

    message.error(text);
    return Promise.reject(error);
  },
);

/** 发起请求并只取 data，带泛型 */
export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const res = await http.request<T>(config);
  return res.data;
}

/** 需要读取响应头（分页信息）时用这个，返回完整 response */
export async function requestWithHeaders<T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return http.request<T>(config);
}

export function get<T>(url: string, params?: Record<string, unknown>) {
  return request<T>({ method: 'get', url, params });
}

export function getWithHeaders<T>(
  url: string,
  params?: Record<string, unknown>,
) {
  return requestWithHeaders<T>({ method: 'get', url, params });
}

export function post<T>(url: string, data?: unknown) {
  return request<T>({ method: 'post', url, data });
}
