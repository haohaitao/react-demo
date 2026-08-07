import { Skeleton } from "antd";

import { ArticleContent } from "@/pages/Detail/style";

/** 文章详情在路由预取或组件请求期间使用的结构化骨架。 */
export function DetailSkeleton() {
  return (
    <ArticleContent aria-label="文章详情加载中">
      <div className="detail-article detail-skeleton">
        <div className="art-header">
          <Skeleton.Input active block style={{ height: 32 }} />
          <div className="header-info detail-skeleton-meta">
            <Skeleton.Input active size="small" style={{ width: 150 }} />
            <Skeleton.Input active size="small" style={{ width: 80 }} />
            <Skeleton.Input active size="small" style={{ width: 80 }} />
          </div>
        </div>

        <div className="detail-skeleton-content">
          <Skeleton
            active
            title={false}
            paragraph={{
              rows: 12,
              width: [
                "100%",
                "96%",
                "92%",
                "100%",
                "86%",
                "98%",
                "94%",
                "100%",
                "88%",
                "96%",
                "90%",
                "72%",
              ],
            }}
          />
        </div>

        <div className="content-footer">
          <div className="article-info detail-skeleton-footer">
            <Skeleton.Input active size="small" style={{ width: "55%" }} />
            <Skeleton.Input active size="small" style={{ width: "48%" }} />
            <Skeleton.Input active size="small" style={{ width: "72%" }} />
            <Skeleton.Input active size="small" style={{ width: "42%" }} />
          </div>
        </div>
      </div>
    </ArticleContent>
  );
}

export default DetailSkeleton;
