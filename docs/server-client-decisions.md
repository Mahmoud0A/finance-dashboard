# Server vs Client Component Decisions

- Root layout: Server (no interactivity needed)
- Page shells (dashboard, transactions, budgets, accounts): Mostly Server; only interactive features become Client
- TransactionFilters: Client (useState + event handlers)
- TransactionsPage: Client (owns lifted filter state, passes to siblings)
- DashboardPage: Client (reads Zustand preferences, handles customization events)
- SettingsPage: Client (Context + Zustand interactions)
- ThemeProvider: Client (Context provider)
- I18nProvider: Client (locale state + React Context)
- Shared Button/Card: Client (can be Client; no server dependency needed but safe either way)
