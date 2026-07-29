import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { MenuOutlined, RollbackOutlined } from '@ant-design/icons';

import { HeaderWrapper } from './style';
import { useUIStore } from '@/store/ui';

const NAV_ITEMS = [
  { to: '/', label: '首页' },
  { to: '/categories', label: '分类' },
  { to: '/everyday', label: '每日一图' },
  { to: '/about', label: '关于' },
] as const;

function NavList({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {NAV_ITEMS.map((item) => (
        <li key={item.to}>
          <Link to={item.to}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * 页头 + 移动端菜单。
 *
 * 两处相对旧代码的改进：
 * 1. 导航项抽成 NAV_ITEMS 常量，桌面端和移动端共用一份，
 *    旧代码把同样 4 个链接手写了两遍。
 * 2. 路由变化时自动收起移动端菜单。旧代码是在 Home/About/Categories/
 *    Everyday 四个页面各自的 componentDidMount 里调 menu_changeState()，
 *    既重复又容易漏（CateDetail 和 Detail 就漏了）。
 */
export function Header() {
  const menuOpen = useUIStore((s) => s.menuOpen);
  const openMenu = useUIStore((s) => s.openMenu);
  const closeMenu = useUIStore((s) => s.closeMenu);
  const { pathname } = useLocation();

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <HeaderWrapper>
      <div className="container">
        <div className="home-left">
          <i className="el-icon-cherry" />
          <Link to="/">
            <span className="title_left">H</span>
            <span className="title_middle">A</span>
            <span className="title_right">O</span>
          </Link>
        </div>
        <div className="nav-right">
          <NavList className="nav-far" />
        </div>
      </div>

      {/* 移动端：收起状态显示汉堡按钮 */}
      <div className={menuOpen ? 'mobile_menu_none' : 'mobile_menu_block'}>
        <MenuOutlined
          className="mobile_menu animated jackInTheBox"
          onClick={openMenu}
          aria-label="打开菜单"
        />
      </div>

      {/* 移动端：展开状态显示返回按钮和菜单列表 */}
      <div className={menuOpen ? 'mobile_menu_block' : 'mobile_menu_none'}>
        <RollbackOutlined
          className="animated swing"
          onClick={closeMenu}
          aria-label="关闭菜单"
        />
        <NavList className="mobile_menu_list animated swing" />
      </div>
    </HeaderWrapper>
  );
}
