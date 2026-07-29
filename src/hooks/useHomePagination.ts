import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';

/**
 * 页码与 URL 同步。
 *
 * 首页的路由是 `/` 和 `/page/:page` 两条，第 1 页用 `/`，
 * 其余用 `/page/N`——沿用旧站的 URL 规则，保证既有链接不失效。
 */
export function useHomePagination() {
  const { page: pageParam } = useParams<{ page?: string }>();
  const navigate = useNavigate();

  const parsed = Number(pageParam);
  const page = Number.isInteger(parsed) && parsed > 0 ? parsed : 1;

  const setPage = useCallback(
    (next: number) => {
      navigate(next === 1 ? '/' : `/page/${next}`);
    },
    [navigate],
  );

  return { page, setPage };
}
