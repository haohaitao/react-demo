/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 接口根地址。开发环境留空走 vite 代理，生产环境填真实域名 */
  readonly VITE_API_BASE_URL: string;
  /** Valine 评论系统 LeanCloud App ID */
  readonly VITE_VALINE_APP_ID: string;
  /** Valine 评论系统 LeanCloud App Key */
  readonly VITE_VALINE_APP_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** valine 没有官方类型声明，这里给出用到的最小接口 */
declare module 'valine' {
  interface ValineOptions {
    el: string | HTMLElement;
    appId: string;
    appKey: string;
    notify?: boolean;
    verify?: boolean;
    avatar?: string;
    placeholder?: string;
    recordIP?: boolean;
    path?: string;
    lang?: string;
  }

  export default class Valine {
    constructor(options: ValineOptions);
    init(options: ValineOptions): void;
  }
}
