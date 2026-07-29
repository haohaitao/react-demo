import { describe, it, expect, beforeEach } from 'vitest';
import { act } from '@testing-library/react';
import { useUIStore } from './ui';

describe('useUIStore', () => {
  beforeEach(() => {
    act(() => {
      useUIStore.setState({ menuOpen: false });
    });
  });

  it('默认收起菜单', () => {
    expect(useUIStore.getState().menuOpen).toBe(false);
  });

  it('openMenu 展开菜单', () => {
    act(() => useUIStore.getState().openMenu());
    expect(useUIStore.getState().menuOpen).toBe(true);
  });

  it('closeMenu 收起菜单', () => {
    act(() => useUIStore.getState().openMenu());
    act(() => useUIStore.getState().closeMenu());
    expect(useUIStore.getState().menuOpen).toBe(false);
  });

  it('toggleMenu 在两个状态间切换', () => {
    act(() => useUIStore.getState().toggleMenu());
    expect(useUIStore.getState().menuOpen).toBe(true);
    act(() => useUIStore.getState().toggleMenu());
    expect(useUIStore.getState().menuOpen).toBe(false);
  });
});
