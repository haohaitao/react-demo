import { HomeWrapper, SectionContent } from "@/pages/Home/style";
import { PostListSkeleton } from "@/components/PostListSkeleton";
import { Sidebar } from "@/components/Sidebar";
import { HOME_PAGE_SIZE } from "@/config";

/**
 * 首页路由 loader 等待期间的页面骨架。
 *
 * 首页数据由路由 loader 预取，loader 未完成前 Home 组件还不会挂载，
 * 所以组件内部的 isPending 分支无法覆盖首次进入页面的 loading 状态。
 */
export function HomePageSkeleton() {
  return (
    <HomeWrapper aria-label="首页加载中">
      <SectionContent>
        <PostListSkeleton count={HOME_PAGE_SIZE} />
        <div className="clear" />
        <div style={{ minHeight: 32 }} />
      </SectionContent>
      <Sidebar />
    </HomeWrapper>
  );
}

export default HomePageSkeleton;
