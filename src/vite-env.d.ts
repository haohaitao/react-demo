/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 接口根地址。开发环境留空走 vite 代理，生产环境填真实域名 */
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
