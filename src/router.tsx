import {
  createBrowserRouter,
  type LoaderFunctionArgs,
  type RouteObject,
} from 'react-router';

import { RootLayout } from '@/components/layout/RootLayout';
import { NotFound } from '@/components/NotFound';
import { RouteError } from '@/components/RouteError';
import { PageFallback } from '@/components/PageFallback';
import { queryClient } from '@/lib/queryClient';
import {
  postsQuery,
  postQuery,
  postsByCategoryQuery,
  categoriesQuery,
  categoriesByIdsQuery,
  everydayQuery,
  latestPostsQuery,
  tagsQuery,
  tagQuery,
} from '@/lib/queryOptions';

// 首页不做代码分割，保证首屏最快
import Home from '@/pages/Home';

/**
 * 侧边栏（最新文章 + 标签）的预取。
 *
 * 和页面主体数据一起 await，让侧边栏和列表在同一帧出现；
 * 否则主体加载完后侧边栏还要再闪一次骨架屏，又变成两段 loading。
 * 失败时吞掉错误：侧边栏挂了不该让整页进错误边界，退化成骨架屏即可。
 */
function prefetchSidebar() {
  return [
    queryClient.ensureQueryData(latestPostsQuery()).catch(() => null),
    queryClient.ensureQueryData(tagsQuery()).catch(() => null),
  ];
}

/**
 * 页面路由的公共配置。
 *
 * HydrateFallback 挂在每个子路由而不是根路由上：
 * 挂根路由会让首屏加载期间连 Header/Footer 一起被替换掉，
 * 挂子路由则只替换 <Outlet /> 的部分，布局始终可见。
 */
function page(route: RouteObject): RouteObject {
  return { HydrateFallback: PageFallback, ...route };
}

/**
 * 路由表。
 *
 * 关于 loading：数据用路由 `loader` 预取，组件用路由原生 `lazy` 分割，
 * react-router 会并行发起这两件事，所以「下载组件代码」和「请求数据」
 * 不再串行——这正是之前先后出现两个 loading 的原因。
 *
 * 现在每次进入页面只有一次 loading：
 * - 首次进站/刷新：HydrateFallback
 * - 站内跳转：Header 下方的进度条，旧页面原地保留直到新页面就绪
 *
 * 相比 v5 的变化：
 * - `<Switch>` + `<Route component>` → 对象式配置
 * - 不再需要 `exact`，v6+ 默认精确匹配
 * - `<Redirect to="/err">` → `path: '*'` 兜底
 * - Header/Footer 从「写在 Switch 外面」改为 layout 路由 + <Outlet />
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // 用独立的错误组件而不是 RootLayout：后者只有 <Outlet />，
    // 错误状态下没有子路由可渲染，会显示成一片空白
    errorElement: <RouteError />,
    children: [
      page({
        index: true,
        element: <Home />,
        loader: () =>
          Promise.all([
            queryClient.ensureQueryData(postsQuery(1)),
            ...prefetchSidebar(),
          ]).then(() => null),
      }),
      page({
        path: 'page/:page',
        element: <Home />,
        loader: ({ params }: LoaderFunctionArgs) => {
          // 与 useHomePagination 保持同一套解析规则：非法页码回退到第 1 页
          const parsed = Number(params.page);
          const page = Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
          return Promise.all([
            queryClient.ensureQueryData(postsQuery(page)),
            ...prefetchSidebar(),
          ]).then(() => null);
        },
      }),
      page({
        path: 'article/:id',
        lazy: {
          Component: () => import('@/pages/Detail').then((m) => m.default),
        },
        loader: async ({ params }: LoaderFunctionArgs) => {
          const post = await queryClient.ensureQueryData(postQuery(params.id!));
          // 标签渲染在正文末尾，不必阻塞首屏，后台补即可
          post.tagIds.forEach((tagId) => {
            queryClient.prefetchQuery(tagQuery(tagId));
          });
          return null;
        },
      }),
      page({
        path: 'categories',
        lazy: {
          Component: () => import('@/pages/Categories').then((m) => m.default),
        },
        loader: () =>
          Promise.all([
            queryClient.ensureQueryData(categoriesQuery()),
            ...prefetchSidebar(),
          ]).then(() => null),
      }),
      page({
        path: 'catedetail/:id',
        lazy: {
          Component: () => import('@/pages/CateDetail').then((m) => m.default),
        },
        // 页码是组件内部 state，切换分类时会重置回第 1 页，
        // 所以这里只预取第 1 页；翻页由 keepPreviousData 兜住
        loader: ({ params }: LoaderFunctionArgs) =>
          Promise.all([
            queryClient.ensureQueryData(postsByCategoryQuery(params.id!, 1)),
            // 分类名单独查 categories 接口，一起预取避免标题二次闪烁
            queryClient
              .ensureQueryData(categoriesByIdsQuery([Number(params.id)]))
              .catch(() => null),
            ...prefetchSidebar(),
          ]).then(() => null),
      }),
      page({
        path: 'everyday',
        lazy: {
          Component: () => import('@/pages/Everyday').then((m) => m.default),
        },
        loader: () =>
          queryClient.ensureQueryData(everydayQuery()).then(() => null),
      }),
      page({
        path: 'about',
        lazy: {
          Component: () => import('@/pages/About').then((m) => m.default),
        },
      }),
      { path: 'err', element: <NotFound /> },
      // 兜底：匹配不到的路径统一渲染 404（旧站是重定向到 /err，
      // 这里直接原地渲染，保留用户输入的 URL，体验更好）
      { path: '*', element: <NotFound /> },
    ],
  },
]);
