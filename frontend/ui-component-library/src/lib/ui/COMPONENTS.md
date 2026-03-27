# NewGen UI - Example Components

This folder contains simple, copy-paste ready React components (Button, Card, Navbar) and an index export so they can also be published and imported via npm.

Copy-paste usage (no build step required):

1. Button

```tsx
import Button from './src/lib/ui/Button';

export default function Example() {
  return <Button variant="primary">Click me</Button>;
}
```

2. Card

```tsx
import Card from './src/lib/ui/Card';

export default function ExampleCard() {
  return (
    <Card title="Hello" description="This is a sample card">
      <p>Card content goes here.</p>
    </Card>
  );
}
```

3. Navbar

```tsx
import LibNavbar from './src/lib/ui/Navbar';

export default function ExampleNav() {
  return <LibNavbar />;
}
```

Publishing as a package (high level):

1. Move `src/lib/ui` to its own package directory or set up a package.json in the repo root that points `main`/`exports` to the built files.
2. Build with `tsc` or your bundler (rollup, vite, tsup) to output ESM/CJS.
3. Update package.json with `name`, `version`, `publishConfig`, and `exports`.
4. Run `npm publish --access public`.

Importing from npm (after publishing):

```bash
npm install @your-scope/newgen-ui
```

```tsx
import { Button, Card, Navbar } from '@your-scope/newgen-ui';
```

Notes:
- These example components use CSS variables defined in `src/app/globals.css`. If you copy them into a new project, add the token definitions or provide equivalent styles.
- Consider bundling styles with the package (CSS-in-JS, CSS module, or provide a small CSS file to import).
