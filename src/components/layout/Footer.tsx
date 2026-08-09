import { useEffect } from "react";
import { FloatButton } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { FooterContent } from "./style";

/**
 * 页脚。
 *
 * 两处 antd 3 → 6 的改动：
 * - `<Icon type="github" />` → `<GithubOutlined />`
 * - `<BackTop>` 在 v5 起已废弃，改用 `<FloatButton.BackTop />`
 */
export function Footer() {
  useEffect(() => {
    console.log(
      `%cHello world! %c Copyright © ${new Date().getFullYear()}`,
      "text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:2em",
      "font-size:12px;color:#999999;",
    );
  }, []);

  return (
    <FooterContent>
      <p>
        <a
          href="https://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
        >
          豫ICP备17023037号
        </a>
      </p>
      <p>
        <span>
          Copyright © 2019-{new Date().getFullYear()}&nbsp;版权所有&nbsp;
        </span>
        <span className="github">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/haohaitao"
            aria-label="GitHub"
          >
            <GithubOutlined />
          </a>
        </span>
      </p>
      <FloatButton.BackTop />
    </FooterContent>
  );
}
