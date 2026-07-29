import { Pagination } from "antd";

import { HomeWrapper, SectionContent } from "./style";
import { Sidebar } from "@/components/Sidebar";
import { PostCard } from "@/components/PostCard";
import { PostListSkeleton } from "@/components/PostListSkeleton";
import { usePosts } from "@/hooks/queries";
import { useHomePagination } from "@/hooks/useHomePagination";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { HOME_PAGE_SIZE } from "@/config";

/**
 * 首页。
 *
 * 合并了旧的 view/Home/index.js（外层 + Spin）和
 * view/Home/components/home.js（列表 + 分页）两个文件，
 * 以及 view/Home/store/ 下的 4 个 Redux 文件。
 */
export function Home() {
  useDocumentTitle("郝海涛的个人网站 - Hao HaiTao's Personal Website", {
    raw: true,
  });

  const { page, setPage } = useHomePagination();
  const { data, isPending } = usePosts(page);

  return (
    <HomeWrapper>
      <SectionContent>
        {isPending ? (
          <PostListSkeleton count={HOME_PAGE_SIZE} />
        ) : (
          data?.items.map((post) => <PostCard key={post.id} post={post} />)
        )}

        <div className="clear" />

        {/* 固定高度占位：首次加载时 total 为 0，antd Pagination 不渲染任何页码，
            数据到达后突然出现会把页面往下顶。这里预留它的实际高度。 */}
        <div style={{ minHeight: 32 }}>
          <Pagination
            style={{ textAlign: "right", marginRight: 20 }}
            current={page}
            total={data?.total ?? 0}
            pageSize={HOME_PAGE_SIZE}
            showSizeChanger={false}
            onChange={setPage}
          />
        </div>
      </SectionContent>
      <Sidebar />
    </HomeWrapper>
  );
}

export default Home;
