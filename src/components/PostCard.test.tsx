import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "@/test/utils";
import { getPostCoverImage, PostCard } from "./PostCard";
import { normalizePost } from "@/api/normalize";
import { rawPost, minimalRawPost } from "@/test/fixtures";

describe("getPostCoverImage", () => {
  it.each([
    [
      '<p><img loading="lazy" class="aligncenter" src="https://www.haohaitao.cn/wp-content/uploads/2020/01/react_doc.jpg" alt="react接入websocket" /></p>',
      "https://www.haohaitao.cn/wp-content/uploads/2020/01/react_doc.jpg",
    ],
    [
      '<p><img src="https://img.haohaitao.cn/wp-content/uploads/20241010_2995_01.png" alt="CentOS使用docker部署nuxt3应用" /></p>',
      "https://img.haohaitao.cn/wp-content/uploads/20241010_2995_01.png",
    ],
  ])("从正文 HTML 中提取第一张图片", (content, expected) => {
    const post = { ...normalizePost(minimalRawPost), content };
    expect(getPostCoverImage(post)).toBe(expected);
  });

  it("已有 coverImage 时优先使用接口字段", () => {
    expect(getPostCoverImage(normalizePost(rawPost))).toBe(
      "https://example.com/cover.jpg"
    );
  });

  it("正文中解析不到图片时使用默认占位图", () => {
    expect(getPostCoverImage(normalizePost(minimalRawPost))).toContain(
      "placeholderImage"
    );
  });
});

describe("PostCard", () => {
  it("渲染标题、日期和浏览量", () => {
    renderWithProviders(<PostCard post={normalizePost(rawPost)} />);

    expect(screen.getByText("你好，世界")).toBeInTheDocument();
    expect(screen.getByText("2024-03-15")).toBeInTheDocument();
    expect(screen.getByText("233")).toBeInTheDocument();
  });

  it("评论数大于 0 时显示评论数", () => {
    const { container } = renderWithProviders(
      <PostCard post={normalizePost(rawPost)} />
    );
    // 评论区块是「图标 span + 数字 span」的嵌套结构，两层的 textContent
    // 都是 "5"，直接 getByText('5') 会命中多个节点，所以按图标定位区块
    const commentBlock =
      container.querySelector(".anticon-message")?.parentElement;
    expect(commentBlock).toBeInTheDocument();
    expect(commentBlock).toHaveTextContent("5");
  });

  it("评论数为 0 时不显示评论区块", () => {
    const { container } = renderWithProviders(
      <PostCard post={normalizePost(minimalRawPost)} />
    );
    // 注意不能用 queryByText('0') 断言：浏览量缺失时归一化同样是 0，
    // 那个 span 会命中。只能按评论图标是否存在来判断。
    expect(container.querySelector(".anticon-message")).not.toBeInTheDocument();
  });

  it("摘要以 HTML 渲染", () => {
    const { container } = renderWithProviders(
      <PostCard post={normalizePost(rawPost)} />
    );
    expect(container.querySelector(".excerpt")?.innerHTML).toContain(
      "<p>这是摘要</p>"
    );
  });
});
