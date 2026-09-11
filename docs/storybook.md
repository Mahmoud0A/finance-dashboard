# Storybook

Storybook is a tool for building, viewing, documenting, and testing UI components in isolation from the application.

We added it to FinSight so reusable UI components can be inspected without navigating through full pages or depending on API data.

## Run

```bash
npm run storybook
```

Storybook runs at `http://localhost:6006`.

To build the static Storybook:

```bash
npm run build-storybook
```

## Stories Added

- `Design System/Button`
- `Design System/Input`
- `Design System/Card`
- `Finance/Budgets/BudgetProgress`
- `Finance/Transactions/TransactionRow`
- `Finance/Accounts/AccountCard`

## Core Terms

A Story is one specific example or state of a component.

Args are prop values passed to a component in a story.

Controls let you change selected args interactively in the Storybook UI.

Storybook uses the real `globals.css`, so components render with the same design tokens, colors, spacing, radius, and typography as the app.

Storybook does not replace the real component. For example, `Button.tsx` is the application component, while `Button.stories.tsx` only defines isolated examples.

Storybook lets us inspect components in isolation, including light mode, dark mode, LTR, and RTL previews.
