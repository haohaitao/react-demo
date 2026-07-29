# react-demo-next

个人博客站的现代化重写版本。原工程见同级目录 `react-demo`（CRA + React 16），
本工程为 Vite + React 19 + TypeScript 重写版。

## 快速开始

```bash
# 1. 安装依赖（需要 Node >= 22.22.0，你本机是 22.23.1，满足）
pnpm install

# 2. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，填入 Valine 的 appId / appKey
# （旧值可从 react-demo/src/view/Detail/index.js 第 56-57 行取得）

# 3. 启动开发服务器
pnpm dev

# 4.（首次）安装 Prettier 相关依赖后，全量格式化一次
pnpm format
```

## 脚本

| 命令                | 说明                                     |
| ------------------- | ---------------------------------------- |
| `pnpm dev`          | 开发服务器，默认 3000 端口，自动开浏览器 |
| `pnpm build`        | 类型检查 + 生产构建，输出到 `dist/`      |
| `pnpm preview`      | 本地预览生产构建产物                     |
| `pnpm typecheck`    | 只跑类型检查                             |
| `pnpm lint`         | ESLint 检查                              |
| `pnpm lint:fix`     | ESLint 自动修复                          |
| `pnpm format`       | Prettier 全量格式化                      |
| `pnpm format:check` | 只检查格式不改文件，适合放进 CI          |
| `pnpm test`         | 跑一遍测试                               |
| `pnpm test:watch`   | 监听模式跑测试                           |

## 代码风格

多人协作时格式统一靠三个文件，各管一段，互不重叠：

| 文件               | 管什么                                                    |
| ------------------ | --------------------------------------------------------- |
| `.prettierrc.json` | 代码排版：单引号、带分号、80 列、尾逗号 `all`             |
| `.editorconfig`    | Prettier 覆盖不到的文件（`.env`、`.md` 等）的缩进与换行符 |
| `eslint.config.js` | 代码质量问题（未使用变量、hooks 依赖），**不管排版**      |

ESLint 配置末尾接了 `eslint-config-prettier`，作用是关掉 ESLint 里所有格式相关规则，
避免它和 Prettier 对同一行代码给出相反意见。这一行必须留在配置数组的最后。

`.vscode/settings.json` 里刻意没有重复写 `prettier.singleQuote` 之类的选项——
风格只在 `.prettierrc.json` 里定义一处，否则两边容易改得不一致。

首次拉取项目后，VSCode 会根据 `.vscode/extensions.json` 提示安装推荐插件。
**Prettier 插件是必装的**，否则「保存自动格式化」不生效，你的改动会带上一堆格式噪音。
用其他编辑器的话，只要装了对应的 Prettier 和 EditorConfig 插件，效果一致。

提交前建议跑一次：

```bash
pnpm format && pnpm lint && pnpm typecheck && pnpm test
```

目前没有配置 git 钩子，所以这一步靠自觉。等项目 `git init` 之后，
可以再加 husky + lint-staged 把它自动化。

## 技术栈

- **构建** Vite 7
- **框架** React 19 + TypeScript 5
- **路由** React Router 8（注意：不再有 `react-router-dom` 包，从 `react-router` 导入）
- **UI** Ant Design 6 + `@ant-design/icons`
- **服务端状态** TanStack Query 5
- **客户端状态** Zustand 5
- **样式** styled-components 6 + 原有的 CSS
- **测试** Vitest + React Testing Library

## 环境变量

| 变量                  | 用途                     | 开发环境             | 生产环境   |
| --------------------- | ------------------------ | -------------------- | ---------- |
| `VITE_API_BASE_URL`   | 接口根地址               | 留空（走 vite 代理） | 填真实域名 |
| `PROXY_TARGET`        | 开发代理目标             | `api地址`            | 不生效     |
| `VITE_VALINE_APP_ID`  | Valine LeanCloud App ID  | 必填                 | 必填       |
| `VITE_VALINE_APP_KEY` | Valine LeanCloud App Key | 必填                 | 必填       |

`PROXY_TARGET` 故意不加 `VITE_` 前缀，这样源站地址不会被打进前端产物。

接口路径前缀由 `src/config.ts` 的 `WP_API` 统一处理：开发环境是 `/api/wp-json/wp/v2`
（触发 vite 代理），生产环境是 `/wp-json/wp/v2`（拼在 `VITE_API_BASE_URL` 后面）。

## 目录结构

```
src/
├── api/              请求层
│   ├── http.ts       axios 实例 + 响应拦截器
│   ├── normalize.ts  WP 数据解包（rendered 字段、日期格式化、分页头）
│   └── wp.ts         具名接口函数
├── types/wp.ts       WordPress REST API 类型定义
├── hooks/
│   ├── queries.ts        所有 useQuery 封装
│   ├── useDocumentTitle  页面标题
│   └── useHomePagination 首页页码与 URL 同步
├── store/ui.ts       Zustand，移动端菜单开关
├── lib/queryClient.ts QueryClient 配置 + query key 统一管理
├── components/
│   ├── layout/       Header / Footer / RootLayout / 公共 styled 组件
│   ├── PostCard          文章卡片（Home 和 CateDetail 共用）
│   ├── PostListSkeleton  列表加载骨架
│   ├── Sidebar           侧边栏（原 Slider.js）
│   ├── Comments          Valine 评论区封装
│   ├── ScrollToTop       路由变化时滚动置顶
│   └── NotFound
├── pages/            各页面
├── styles/           全局 CSS
├── test/             测试工具与 fixtures
├── config.ts         全局常量
├── router.tsx        路由表
└── main.tsx          入口
```
