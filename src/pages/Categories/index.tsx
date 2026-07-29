import { Skeleton } from 'antd';
import { useNavigate } from 'react-router';

import { MainWrapper, CateWrapper } from './style';
import { Sidebar } from '@/components/Sidebar';
import { useCategories } from '@/hooks/queries';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import type { Category } from '@/types/wp';

/**
 * 分类目录列表。
 *
 * 旧代码把同一份列表 JSX 写了两遍（mobile_cate_none / mobile_cate_block
 * 两个 section 靠 CSS 控制显隐），这里抽成内部组件复用。
 */
function CategoryList({
  categories,
  isPending,
}: {
  categories?: Category[];
  isPending: boolean;
}) {
  const navigate = useNavigate();

  if (isPending) {
    return <Skeleton active paragraph={{ rows: 6 }} title={false} />;
  }

  return (
    <ul>
      {categories?.map((cate) => (
        <li key={cate.id} onClick={() => navigate(`/catedetail/${cate.id}`)}>
          #&nbsp;&nbsp;
          <span className="categoryName">
            {cate.name}&nbsp;&nbsp;[{cate.count}]
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Categories() {
  useDocumentTitle('分类');

  const { data, isPending } = useCategories();

  return (
    <MainWrapper>
      <CateWrapper className="mobile_style animated rollIn">
        {/* 桌面端 */}
        <section className="mobile_cate_none">
          <h3 className="hot">
            <span className="cate_title">分类目录</span>
          </h3>
          <CategoryList categories={data} isPending={isPending} />
        </section>

        {/* 移动端 */}
        <section className="mobile_cate_block">
          <h3 className="hot">
            <span className="cate_title">分类目录</span>
          </h3>
          <CategoryList categories={data} isPending={isPending} />
        </section>
      </CateWrapper>
      <Sidebar />
    </MainWrapper>
  );
}

export default Categories;
