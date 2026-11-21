# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Github Pages for Component Library Storybook

https://hettlingen.github.io/suus-component-library/

##

## Icons

Import icons by name from `suus-component-library`:

```tsx
import { HomeIcon, Icon, IconButton, NotificationIcon, PenIcon } from "suus-component-library";

<HomeIcon width={24} height={24} color="white" />
<IconButton label="Bearbeiten" icon={<PenIcon />} />
<Icon icon={<NotificationIcon width="100%" height="100%" />} size={32} badgeCount={2} />
```

Icons use `currentColor` and default to `1em` by `1em`. They accept standard SVG
props, including `className`, `width`, and `height`. Icons are decorative by default.
For a standalone icon that conveys meaning, supply `aria-label` or `aria-labelledby`.
For an icon inside an `IconButton`, give the button a `label`.

The former white variants use the same shapes with `color="white"`. Use
`UserIcon` for `avatar-white.svg`, `HomeIcon` for `home-white.svg` and
`NotificationIcon` for `notification-white.svg`.

Find the full set in Storybook under **Components / Icon Catalog**. To add an icon, create
a component in `src/components/icons/`, use the internal `SvgIcon` wrapper, keep
the original `viewBox`, and add a named export to that directory's `index.ts`.
For external artwork, record the source and license in `THIRD-PARTY-NOTICES.md`.
