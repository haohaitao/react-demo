import { Spin } from 'antd';

/**
 * 首次进入站点时的整页 loading。
 *
 * 只在根路由的 HydrateFallback 位置出现一次——
 * 站内跳转不会用到它，那种情况下旧页面原地保留，
 * 由 Header 下方的 <RouteProgress /> 提示加载中。
 */
export function PageFallback() {
  return (
    <div style={{ textAlign: 'center', padding: '25vh 0' }}>
      <Spin tip="Loading..." size="large">
        <div style={{ minHeight: 60 }} />
      </Spin>
    </div>
  );
}

export default PageFallback;
