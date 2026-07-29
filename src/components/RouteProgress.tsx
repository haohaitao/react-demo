import { useNavigation } from 'react-router';

/**
 * 顶部路由加载进度条。
 *
 * 用了 loader 之后，站内跳转会先在原页面等数据就绪再切换，
 * 期间界面不动，容易让人以为点击没生效。这里给一条细进度条作为反馈，
 * 代替原来「整页 Spin 盖住内容」的做法。
 */
export function RouteProgress() {
  const { state } = useNavigation();

  if (state === 'idle') return null;

  return (
    <div
      role="progressbar"
      aria-label="页面加载中"
      style={{
        position: 'fixed',
        top: 70, // 贴在固定定位的 Header 下沿
        left: 0,
        width: '100%',
        height: 3,
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      <div
        style={{
          width: '40%',
          height: '100%',
          background: '#1890ff',
          animation: 'route-progress 1s ease-in-out infinite',
        }}
      />
    </div>
  );
}
