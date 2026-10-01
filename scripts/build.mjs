import { execFileSync } from 'node:child_process';
import { copyFile, rm } from 'node:fs/promises';
import { build } from 'esbuild';

await rm(new URL('../dist/', import.meta.url), {
  recursive: true,
  force: true,
});

const options = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'neutral',
  target: 'es2022',
  sourcemap: true,
};

await Promise.all([
  build({ ...options, format: 'esm', outfile: 'dist/index.js' }),
  build({ ...options, format: 'cjs', outfile: 'dist/index.cjs' }),
]);

execFileSync(
  process.execPath,
  ['node_modules/typescript/bin/tsc', '-p', 'tsconfig.json'],
  {
    stdio: 'inherit',
  },
);
await copyFile('dist/index.d.ts', 'dist/index.d.cts');
