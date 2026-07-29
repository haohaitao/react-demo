import { create } from 'zustand';

interface UIState {
  /** 移动端菜单是否展开 */
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
}

/**
 * 客户端 UI 状态。
 *
 * 这是原来整个 Redux 里唯一真正属于「客户端状态」的部分
 * （原 src/components/store/，管移动端菜单开关）。
 * 其余两个 store 都在做服务端数据缓存，已交给 TanStack Query。
 */
export const useUIStore = create<UIState>((set) => ({
  menuOpen: false,
  openMenu: () => set({ menuOpen: true }),
  closeMenu: () => set({ menuOpen: false }),
  toggleMenu: () => set((s) => ({ menuOpen: !s.menuOpen })),
}));
