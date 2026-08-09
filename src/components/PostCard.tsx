import { useNavigate } from "react-router";
import {
  CalendarOutlined,
  EyeOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import type { Post } from "@/types/wp";
import placeholderImage from "@/assets/placeholderImage.jpeg";

interface PostCardProps {
  post: Post;
}

/** 从正文 HTML 中提取第一张图片，提取失败时使用默认占位图。 */
export function getPostCoverImage(post: Post): string {
  if (post.coverImage?.trim()) return post.coverImage;

  const imageSrc = post.content.match(
    /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/i,
  )?.[1];

  return imageSrc || placeholderImage;
}

/**
 * 文章卡片。
 *
 * 旧代码在 Home/components/home.js 和 CateDetail/cateDetail.js 里
 * 各写了一份几乎相同的卡片 JSX，这里合并成一个组件。
 * 两处的样式类名本来就一致（bg-cover / desc / desc-bottom），
 * 所以样式无需改动。
 */
export function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate();
  const goDetail = () => navigate(`/article/${post.id}`);
  const coverImage = getPostCoverImage(post);

  return (
    <article className="home_article">
      <div className="bg-cover" onClick={goDetail}>
        <div
          className="bg-img"
          style={{
            backgroundImage: `url(${coverImage})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        />
      </div>
      <div className="desc">
        <p className="title" title={post.title} onClick={goDetail}>
          {post.title}
        </p>
        <p
          className="excerpt"
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
        <div className="desc-bottom">
          {/*
            旧代码这里是 className="d-detail,hidden-detail"（逗号是笔误），
            DOM 里实际是一个名为 `d-detail,hidden-detail` 的类，两条 CSS 都没命中。
            若照字面改成 "d-detail hidden-detail"，`.hidden-detail > span`
            的 visibility:hidden 会真的生效，把日期/浏览量/评论数整行藏掉。
            旧站的实际观感由 `.d-detail` 决定，所以只保留它。
          */}
          <div className="d-detail">
            <CalendarOutlined />
            <span style={{ fontSize: 14, marginLeft: 5 }}>
              {post.displayDate}
            </span>
            <span style={{ fontSize: 14, marginLeft: 5 }}>
              <span style={{ marginRight: 5 }}>
                <EyeOutlined />
              </span>
              {post.pageviews}
            </span>
            {post.totalComments > 0 && (
              <span style={{ display: "inline-block", marginLeft: 5 }}>
                <MessageOutlined />
                <span style={{ fontSize: 14, marginLeft: 5 }}>
                  {post.totalComments}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
