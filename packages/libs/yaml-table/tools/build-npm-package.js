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
    entryPoints: ['packages/libs/yaml-table/src/cli.ts'],
    outfile: 'dist/packages/libs/yaml-table/cli/cli.cjs',
    format: 'cjs',
    external: ['fs', 'path', 'url'],
    ...shared
  }),

  // Lib (ESM)
  build({
    entryPoints: ['packages/libs/yaml-table/src/index.ts'],
    outfile: 'dist/packages/libs/yaml-table/lib/index.js',
    format: 'esm',
    ...shared
  }),

  // Lib (CJS)
  build({
    entryPoints: ['packages/libs/yaml-table/src/index.ts'],
    outfile: 'dist/packages/libs/yaml-table/lib/index.cjs',
    format: 'cjs',
    ...shared
  })
]);
