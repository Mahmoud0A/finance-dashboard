import { describe, it, expect, beforeEach } from 'vitest';

// We test the Zustand store logic directly without React
// to avoid SSR / localStorage issues in jsdom
import { useDashboardStore } from '@/stores/dashboardStore';

describe('useDashboardStore', () => {
  beforeEach(() => {
    // Reset store to default state before each test
    useDashboardStore.getState().resetLayout();
  });

  it('initialises with expected defaults', () => {
    const state = useDashboardStore.getState();
    expect(state.compactMode).toBe(false);
    expect(state.sidebarCollapsed).toBe(false);
    expect(state.selectedPeriod).toBe('month');
    expect(state.hiddenWidgets).toEqual([]);
    expect(state.pinnedAccounts).toEqual([]);
  });

  it('toggleSidebar flips sidebarCollapsed', () => {
    useDashboardStore.getState().toggleSidebar();
    expect(useDashboardStore.getState().sidebarCollapsed).toBe(true);
    useDashboardStore.getState().toggleSidebar();
    expect(useDashboardStore.getState().sidebarCollapsed).toBe(false);
  });

  it('setCompactMode sets compact mode', () => {
    useDashboardStore.getState().setCompactMode(true);
    expect(useDashboardStore.getState().compactMode).toBe(true);
  });

  it('setPeriod updates selectedPeriod', () => {
    useDashboardStore.getState().setPeriod('quarter');
    expect(useDashboardStore.getState().selectedPeriod).toBe('quarter');
  });

  it('hideWidget adds widget id to hiddenWidgets', () => {
    useDashboardStore.getState().hideWidget('balance');
    expect(useDashboardStore.getState().hiddenWidgets).toContain('balance');
  });

  it('showWidget removes widget id from hiddenWidgets', () => {
    useDashboardStore.getState().hideWidget('balance');
    useDashboardStore.getState().showWidget('balance');
    expect(useDashboardStore.getState().hiddenWidgets).not.toContain('balance');
  });

  it('pinAccount adds account id and deduplicates', () => {
    useDashboardStore.getState().pinAccount('acc-1');
    useDashboardStore.getState().pinAccount('acc-1');
    expect(useDashboardStore.getState().pinnedAccounts.filter((a) => a === 'acc-1')).toHaveLength(1);
  });

  it('unpinAccount removes account id', () => {
    useDashboardStore.getState().pinAccount('acc-2');
    useDashboardStore.getState().unpinAccount('acc-2');
    expect(useDashboardStore.getState().pinnedAccounts).not.toContain('acc-2');
  });

  it('reorderWidget moves item correctly', () => {
    const { widgetOrder } = useDashboardStore.getState();
    const first = widgetOrder[0];
    const second = widgetOrder[1];
    useDashboardStore.getState().reorderWidget(0, 1);
    const updated = useDashboardStore.getState().widgetOrder;
    expect(updated[0]).toBe(second);
    expect(updated[1]).toBe(first);
  });

  it('resetLayout restores defaults', () => {
    useDashboardStore.getState().setCompactMode(true);
    useDashboardStore.getState().hideWidget('savings');
    useDashboardStore.getState().resetLayout();
    const state = useDashboardStore.getState();
    expect(state.compactMode).toBe(false);
    expect(state.hiddenWidgets).toEqual([]);
  });
});
