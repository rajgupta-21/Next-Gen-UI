# Previewing NewGen UI components

To preview components locally in this Next app:

1. Start the Next dev server:

```bash
cd frontend/ui-component-library
npm run dev
```

2. Open http://localhost:3000/preview and click a component to view live examples and copy-ready code.

Publishing a package (high level):

1. Create a package in `packages/newgen-ui` and copy the `src/lib/ui` files there.
2. Add a bundler script (tsup/rollup) to build ESM/CJS and types.
3. Publish with `npm publish --access public`.
