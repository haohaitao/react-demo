import { Affix, Skeleton } from "antd";
import { ClockCircleOutlined, TagOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

import { SliderAside } from "./layout/style";
import { useLatestPosts, useTags } from "@/hooks/queries";

/**
 * 侧边栏：最新文章 + 标签云。
 *
 * 原文件叫 Slider.js（171 行），但它做的是侧边栏而非轮播图，
 * 这里改名 Sidebar。原来那 19 个空对象占位（约 100 行）
 * 换成了 antd Skeleton。
 */
export function Sidebar() {
  const navigate = useNavigate();
  const { data: posts, isPending: postsPending } = useLatestPosts();
  const { data: tags, isPending: tagsPending } = useTags();

  return (
    <SliderAside>
      <Affix offsetTop={90}>
        {/* 最新文章 */}
        <section>
          <h3 className="hot">
            <ClockCircleOutlined />
            <span style={{ paddingLeft: 8 }}>最新文章</span>
          </h3>
          {postsPending ? (
            <Skeleton
              active
              paragraph={{
                rows: 8,
              }}
              style={{ padding: "10px" }}
              title={false}
            />
          ) : (
            <ul>
              {posts?.map((post, index) => (
                <li
                  key={post.id}
                  onClick={() => navigate(`/article/${post.id}`)}
                >
                  <span className="listNumber">{index + 1}</span>
                  <span className="newPost">{post.title}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* 标签云 */}
        <section>
          <h3 className="tags">
            <TagOutlined />
            <span style={{ paddingLeft: 8 }}>标签</span>
          </h3>
          {tagsPending ? (
            <Skeleton active paragraph={{ rows: 3 }} title={false} />
          ) : (
            <div>
              {tags?.map((tag) => (
                <span key={tag.id} className="tag">
                  #{tag.name}[{tag.count}]
                </span>
              ))}
            </div>
          )}
        </section>

        <div className="clear" />
      </Affix>
    </SliderAside>
  );
}
