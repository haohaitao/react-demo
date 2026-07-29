import { useState } from "react";
import { Pagination } from "antd";
import { useParams } from "react-router";

import { CateWrapper, CateDetailWrapper } from "./style";
import { Sidebar } from "@/components/Sidebar";
import { PostCard } from "@/components/PostCard";
import { PostListSkeleton } from "@/components/PostListSkeleton";
import { usePostsByCategory, useCategoriesByIds } from "@/hooks/queries";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { CATEGORY_PAGE_SIZE } from "@/config";

/**
 * 分类详情。
 *
 * 合并了旧的 view/CateDetail/index.js 和 cateDetail.js。
 * 分类名改为直接查 categories 接口，不再从列表首条文章里取
 * （旧写法 `res.data['0'].category_name` 在该分类下没有文章时拿不到名字）。
 */
export function CateDetail() {
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState(1);

  // 切换分类时把页码重置回第 1 页，否则从 A 分类的第 3 页跳到 B 分类
  // 会停在不存在的第 3 页（旧代码也有这个问题）。
  // 这里用 React 官方推荐的「渲染期间调整 state」写法，
  // 比 useEffect 少一次多余渲染。
  const [prevId, setPrevId] = useState(id);
  if (id !== prevId) {
    setPrevId(id);
    setPage(1);
  }

  const { data, isPending } = usePostsByCategory(id, page);
  const { data: categories } = useCategoriesByIds(
    Number(id) > 0 ? [Number(id)] : [],
  );
  const categoryName = categories?.[0]?.name;

  useDocumentTitle(categoryName ? `${categoryName} - 分类` : "分类详情");

  return (
    <CateWrapper>
      <CateDetailWrapper className="mobile_cate_list">
        <section className="artList-by-type">
          <p>
            归类在
            {/* inline-block + minWidth：分类名加载前后字数不同，
                这一行是居中布局，宽度变化会让整行左右重排 */}
            <span
              className="type-title"
              style={{ display: "inline-block", minWidth: "4em" }}
            >
              {categoryName ?? " "}
            </span>
            下的文章
          </p>
          <p>
            共有
            <span
              className="type-total"
              style={{ display: "inline-block", minWidth: "2em" }}
            >
              {data?.total ?? 0}
            </span>
            篇
          </p>
        </section>

        {isPending ? (
          <PostListSkeleton count={CATEGORY_PAGE_SIZE} />
        ) : (
          data?.items.map((post) => <PostCard key={post.id} post={post} />)
        )}

        <div className="clear" />

        {/* 同 Home：预留分页器高度，避免数据到达时把页面往下顶 */}
        <div style={{ minHeight: 32 }}>
          <Pagination
            style={{ textAlign: "right", marginRight: 20 }}
            current={page}
            total={data?.total ?? 0}
            pageSize={CATEGORY_PAGE_SIZE}
            showSizeChanger={false}
            onChange={(next) => {
              setPage(next);
              window.scrollTo({ top: 0, behavior: "instant" });
            }}
          />
        </div>
      </CateDetailWrapper>
      <Sidebar />
    </CateWrapper>
  );
}

export default CateDetail;
