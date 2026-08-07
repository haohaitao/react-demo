import { Skeleton } from "antd";

interface PostListSkeletonProps {
  /** 骨架卡片数量 */
  count?: number;
}

/**
 * 文章列表加载骨架。
 *
 * 替代旧代码里「在 state 默认值里填 10 个空对象」的做法——
 * 那种写法在 Slider.js、Home/store/reducers.js、CateDetail/cateDetail.js
 * 三处共占了约 280 行。
 *
 * 结构必须和 PostCard 严格一致（article > .bg-cover + .desc > .title/.excerpt/.desc-bottom），
 * 少一层都会让 .desc 的高度分配变化，加载完成瞬间产生跳动。
 */
export function PostListSkeleton({ count = 6 }: PostListSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <article className="home_article" key={i}>
          <div className="bg-cover">
            {/* 包一层 .bg-img 与 PostCard 结构对齐：
                该类带 height:193px 和圆角，缺了会让封面区高度不同 */}
            <div className="bg-img">
              <Skeleton.Image
                active
                style={{ width: "200px", height: "193px" }}
              />
            </div>
          </div>
          <div className="desc">
            {/* 对应 PostCard 的 .title，高度 30px */}
            <div className="title">
              <Skeleton.Input active size="small" block />
            </div>
            {/* 对应 .excerpt，高度 90px，两行正文 */}
            <div className="excerpt">
              <Skeleton
                active
                title={false}
                paragraph={{ rows: 2, width: ["100%", "80%"] }}
              />
            </div>
            {/* 占位撑起底部信息栏，保证 .desc 的高度分配与真实卡片一致 */}
            <div className="desc-bottom">
              <div className="d-detail">
                <Skeleton.Input active size="small" style={{ width: 180 }} />
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
