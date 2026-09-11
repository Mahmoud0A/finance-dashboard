import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DashboardPreferences {
  widgetOrder: string[];
  hiddenWidgets: string[];
  pinnedAccounts: string[];
  compactMode: boolean;
  selectedPeriod: string;
  sidebarCollapsed: boolean;
  reorderWidget: (from: number, to: number) => void;
  hideWidget: (id: string) => void;
  showWidget: (id: string) => void;
  pinAccount: (id: string) => void;
  unpinAccount: (id: string) => void;
  resetLayout: () => void;
  setCompactMode: (value: boolean) => void;
  setPeriod: (period: string) => void;
  toggleSidebar: () => void;
}

export const useDashboardStore = create<DashboardPreferences>()(
  persist(
    (set) => ({
      widgetOrder: ['balance', 'income', 'expenses', 'savings', 'budget', 'accounts', 'transactions'],
      hiddenWidgets: [],
      pinnedAccounts: [],
      compactMode: false,
      selectedPeriod: 'month',
      sidebarCollapsed: false,
      reorderWidget: (from, to) =>
        set((state) => {
          const next = [...state.widgetOrder];
          const [item] = next.splice(from, 1);
          next.splice(to, 0, item);
          return { widgetOrder: next };
        }),
      hideWidget: (id) =>
        set((state) => ({ hiddenWidgets: [...state.hiddenWidgets, id] })),
      showWidget: (id) =>
        set((state) => ({ hiddenWidgets: state.hiddenWidgets.filter((w) => w !== id) })),
      pinAccount: (id) =>
        set((state) => ({ pinnedAccounts: [...new Set([...state.pinnedAccounts, id])] })),
      unpinAccount: (id) =>
        set((state) => ({ pinnedAccounts: state.pinnedAccounts.filter((w) => w !== id) })),
      resetLayout: () =>
        set({ widgetOrder: ['balance', 'income', 'expenses', 'savings', 'budget', 'accounts', 'transactions'], hiddenWidgets: [], pinnedAccounts: [], compactMode: false, sidebarCollapsed: false, selectedPeriod: 'month' }),
      setCompactMode: (value) => set({ compactMode: value }),
      setPeriod: (period) => set({ selectedPeriod: period }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    { name: 'finsight-dashboard-preferences' }
  )
);
