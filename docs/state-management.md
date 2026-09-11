# State Management Matrix

## useState (Local State)
- Add Transaction modal open/closed
- Expanded transaction details
- Active tab inside cards
- Confirmation dialog state

Reason: Only one component needs this state.

## Lift State Up
- Transaction filters (search, category, account, type, sort)
Owner: TransactionsPage
Consumers: TransactionFilters, TransactionSummary, TransactionList

Reason: Multiple related sibling components share filter values.

## Context API
- Theme (theme, toggleTheme)
Consumers: Header, Sidebar, Settings, Dashboard

Reason: Simple shared cross-cutting UI concern; no complex store needed.

## Zustand (Global Client State)
- DashboardPreferences (widgetOrder, hiddenWidgets, pinnedAccounts, compactMode, selectedPeriod, sidebarCollapsed)
Consumers: Dashboard, Settings, Sidebar
Persisted to localStorage.

Reason: Unrelated parts of the app need the same preferences.

## TanStack Query (Server State)
- Accounts, Transactions, Budgets, Dashboard Summary
Query keys: ["accounts"], ["transactions"], ["budgets"], ["dashboard-summary"]
Mutations invalidate related queries.

Reason: Server-controlled data requires fetching, caching, and synchronization.

## Why server data is NOT in Zustand
Storing transactions or balances in Zustand would duplicate server truth, break caching, and prevent automatic synchronization after mutations.
