import { Tag } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate, useParams, useLocation } from "react-router";

import { ArticleContent } from "./style";
import { Comments } from "@/components/Comments";
import { DetailSkeleton } from "@/components/DetailSkeleton";
import { usePost, useTagsByIds, useCategoriesByIds } from "@/hooks/queries";
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
  const { data: categories } = useCategoriesByIds(post?.categoryIds ?? []);

  useDocumentTitle(post?.title);

  if (isPending) {
    return <DetailSkeleton />;
  }

  return (
    <ArticleContent>
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
                <div className="flex items-center">
                  文章分类：
                  {categories?.length
                    ? categories.map((category) => (
                        <Tag
                          color="cyan"
                          key={category.id}
                          style={{ marginRight: 8, cursor: "pointer" }}
                          onClick={() => navigate(`/catedetail/${category.id}`)}
                        >
                          {category.name}
                        </Tag>
                      ))
                    : "-"}
                </div>
                <div className="flex items-center">
                  文章标签：
                  {tags?.length
                    ? tags.map((tag) => (
                        <Tag
                          color="blue"
                          key={tag.id}
                          style={{ marginRight: 8 }}
                        >
                          {tag.name}
                        </Tag>
                      ))
                    : "-"}
                </div>
                <div className="flex items-center">
                  版权声明：
                  <a
                    href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    CC BY-NC-ND 4.0 DEED
                  </a>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 16, height: 16, marginLeft: 8 }}
                  >
                    <path stroke="none" d="M0 0h24v24H0z"></path>
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M14.5 9a3.5 4 0 1 0 0 6"></path>
                  </svg>
                </div>
                <div className="flex items-center">
                  最后编辑时间：{formatDateTime(post.modified)}
                </div>
              </div>

              <Comments path={pathname} />
            </div>
          </div>
        )}
    </ArticleContent>
  );
}

export default Detail;
