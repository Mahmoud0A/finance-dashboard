# How to Explain This Project to an Instructor

## Why Feature-Based Architecture?
Code is grouped by business capability (dashboard, transactions, budgets, accounts) rather than technical layer. This makes it easy to find feature-specific logic and avoids scattering domain concepts across many folders.

## Why isn't every state global?
Only values needed by unrelated parts of the app become global (Zustand). Related siblings share lifted state (useState at parent). Single components keep their own local state.

## Transaction filters — Lift State Up
Filters are owned by TransactionsPage and passed to TransactionFilters, TransactionSummary, and TransactionList. Multiple related siblings share the same filter values.

## Theme — Context API
Theme is a simple cross-cutting value used by header, sidebar, settings, and pages. Context avoids unnecessary complexity; Zustand would be overkill for a boolean toggle.

## Dashboard preferences — Zustand
Widget layout, hidden widgets, pinned accounts, compact mode, and sidebar collapse affect unrelated components (Dashboard, Settings, Sidebar). Zustand provides a simple global client store with persistence.

## Transactions — TanStack Query
Transactions, accounts, and budgets are server-controlled. TanStack Query handles fetching, caching, mutations, and invalidation. Creating a transaction invalidates ["transactions"], ["accounts"], and ["dashboard-summary"].

## Client vs Server State
Server state = accounts, transactions, balances, budgets (TanStack Query). Client state = UI preferences (Zustand) and simple shared values (Context). Local UI state = modal visibility and active tabs (useState).

## Why not put transactions in Zustand?
Duplicating server data in Zustand breaks caching, requires manual synchronization, and loses the ability to re-fetch after mutations. TanStack Query manages the server boundary correctly.

## When would Redux Toolkit become justified?
If the app grew complex inter-feature communication (e.g., many unrelated modules needing to react to transaction events), Redux Toolkit's middleware and structured store would become valuable. For this educational project, Zustand is sufficient.
