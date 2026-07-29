import { Tag, Spin } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate, useParams, useLocation } from "react-router";

import { ArticleContent } from "./style";
import { Comments } from "@/components/Comments";
import { usePost, useTagsByIds } from "@/hooks/queries";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { formatDateTime } from "@/api/normalize";

/**
 * 文章详情。
 *
 * 这是本次重构收益最大的一个文件（旧版 229 行 → 现在约 110 行）。
 * 旧代码里 componentDidMount 和 UNSAFE_componentWillReceiveProps
 * 各写了一份几乎相同的请求逻辑（约 50 行重复），因为 class 组件
 * 无法表达「id 变了就重新请求」。
 *
 * 现在 useQuery 的 queryKey 含 id，id 变化自动重取，两段逻辑天然合一。
 * 标签的 N+1 请求也从「map 里逐个请求 + 反复 setState」
 * 换成了 useQueries 并行处理。
 */
export function Detail() {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data: post, isPending } = usePost(id);
  const { data: tags } = useTagsByIds(post?.tagIds ?? []);

  useDocumentTitle(post?.title);

  return (
    <ArticleContent className={isPending ? "detail-loading" : ""}>
      <Spin tip="Loading..." spinning={isPending}>
        {post?.previousPostId && (
          <div
            className="post-nav-l"
            title="上一篇"
            onClick={() => navigate(`/article/${post.previousPostId}`)}
          >
            <span>
              <LeftOutlined />
            </span>
          </div>
        )}
        {post?.nextPostId && (
          <div
            className="post-nav-r"
            title="下一篇"
            onClick={() => navigate(`/article/${post.nextPostId}`)}
          >
            <span>
              <RightOutlined />
            </span>
          </div>
        )}

        {post && (
          <div className="detail-article">
            <div className="art-header">
              <h2>{post.title}</h2>
              <div className="header-info">
                <span>发布于：{formatDateTime(post.date)}</span>
                <span>{post.pageviews}次浏览</span>
                <span>{post.totalComments}条评论</span>
              </div>
            </div>

            <div id="blog" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="content-footer">
              <div className="article-info">
                <div>
                  文章分类：<Tag color="blue">{post.categoryName}</Tag>
                </div>
                <div>
                  文章标签：
                  {tags.map((tag) => (
                    <Tag color="blue" key={tag.id} style={{ paddingRight: 8 }}>
                      {tag.name}
                    </Tag>
                  ))}
                </div>
                <p>
                  版权声明：
                  <a
                    href="https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    自由转载-署名-非商用
                  </a>
                </p>
                <p>最后编辑时间：{formatDateTime(post.modified)}</p>
              </div>

              <Comments path={pathname} />
            </div>
          </div>
        )}
      </Spin>
    </ArticleContent>
  );
}

export default Detail;
