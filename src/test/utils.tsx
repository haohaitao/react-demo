import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';

/**
 * 每个测试用独立的 QueryClient，避免用例之间共享缓存。
 * 关掉重试，让失败用例立刻报错而不是卡住。
 */
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  });
}

interface WrapperOptions {
  /** 初始路由，默认 '/' */
  route?: string;
  /**
   * 路由路径模板，需要读 useParams 时指定，如 '/article/:id'。
   * 传数组可以注册多个路径，都渲染同一个 ui——
   * 用于测试组件内部的跳转（否则 navigate 后无路由匹配，会触发 404 错误页）。
   */
  path?: string | string[];
  queryClient?: QueryClient;
}

/**
 * 把组件包进测试需要的全部 Provider。
 *
 * 注意 react-router v8 起没有 <MemoryRouter> 配合 data router 的用法，
 * 这里用 createMemoryRouter 构造一个内存路由。
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    route = '/',
    path = '*',
    queryClient,
    ...options
  }: WrapperOptions & Omit<RenderOptions, 'wrapper'> = {},
) {
  const client = queryClient ?? createTestQueryClient();

  const router = createMemoryRouter(
    (Array.isArray(path) ? path : [path]).map((p) => ({
      path: p,
      element: ui,
    })),
    { initialEntries: [route] },
  );

  // ui 由 router 负责渲染，所以 Wrapper 不接收 children。
  // 反过来用 render(ui, { wrapper }) 会让 ui 被渲染两遍。
  function Wrapper() {
    return (
      <ConfigProvider locale={zhCN}>
        <AntdApp>
          <QueryClientProvider client={client}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AntdApp>
      </ConfigProvider>
    );
  }

  return {
    ...render(<Wrapper />, options),
    router,
    queryClient: client,
  };
}

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
