import { build } from 'esbuild';

const shared = {
  bundle: true,
  platform: 'node',
  target: 'es2020',
  logLevel: 'info',
};

await Promise.all([
  // CLI
  build({
    entryPoints: ['packages/npm-package/src/cli.ts'],
    outfile: 'dist/packages/npm-package/cli/cli.cjs',
    format: 'cjs',
    external: ['fs', 'path', 'url'],
    ...shared,
  }),

  // Lib (ESM)
  build({
    entryPoints: ['packages/npm-package/src/index.ts'],
    outfile: 'dist/packages/npm-package/lib/index.js',
    format: 'esm',
    ...shared,
  }),

  // Lib (CJS)
  build({
    entryPoints: ['packages/npm-package/src/index.ts'],
    outfile: 'dist/packages/npm-package/lib/index.cjs',
    format: 'cjs',
    ...shared,
  }),
]);
