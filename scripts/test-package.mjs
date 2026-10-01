import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const npmCli = process.env.npm_execpath;
assert.ok(npmCli, 'Execute este script via npm run test:package.');
const temp = await mkdtemp(path.join(tmpdir(), 'humaniza-numeros-'));

try {
  const [artifact] = JSON.parse(
    execFileSync(
      process.execPath,
      [npmCli, 'pack', '--json', '--pack-destination', temp],
      {
        cwd: root,
        encoding: 'utf8',
      },
    ),
  );
  const files = artifact.files.map(({ path: file }) => file);
  for (const file of [
    'dist/index.js',
    'dist/index.cjs',
    'dist/index.d.ts',
    'dist/index.d.cts',
  ]) {
    assert.ok(files.includes(file), `Arquivo ausente do pacote: ${file}`);
  }
  assert.ok(
    files.every(
      (file) =>
        file.startsWith('dist/') ||
        ['package.json', 'README.md', 'LICENSE'].includes(file),
    ),
  );

  await writeFile(
    path.join(temp, 'package.json'),
    JSON.stringify({ private: true }),
  );
  execFileSync(
    process.execPath,
    [
      npmCli,
      'install',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      '--package-lock=false',
      path.join(temp, artifact.filename),
    ],
    { cwd: temp, stdio: 'pipe' },
  );

  for (const [format, source] of [
    ['module', "import humanizaNumeros from 'humaniza-numeros';"],
    [
      'commonjs',
      "const { default: humanizaNumeros } = require('humaniza-numeros');",
    ],
  ]) {
    execFileSync(
      process.execPath,
      [
        `--input-type=${format}`,
        '-e',
        `${source}\nif (humanizaNumeros(1560, 1) !== '1,6 Mil') throw new Error('Falha no pacote ${format}');`,
      ],
      { cwd: temp, stdio: 'inherit' },
    );
  }

  await writeFile(
    path.join(temp, 'consumer.mts'),
    "import humanizaNumeros from 'humaniza-numeros';\nconst result: string = humanizaNumeros(1560, 1);\n// @ts-expect-error A entrada deve ser numérica.\nhumanizaNumeros('1560');\n",
  );
  await writeFile(
    path.join(temp, 'consumer.cts'),
    "import humanizaNumeros = require('humaniza-numeros');\nconst result: string = humanizaNumeros.default(1560, 1);\n// @ts-expect-error A entrada deve ser numérica.\nhumanizaNumeros.default('1560');\n",
  );
  execFileSync(
    process.execPath,
    [
      path.join(root, 'node_modules/typescript/bin/tsc'),
      '--strict',
      '--noEmit',
      '--module',
      'NodeNext',
      '--moduleResolution',
      'NodeNext',
      '--target',
      'ES2022',
      'consumer.mts',
      'consumer.cts',
    ],
    { cwd: temp, stdio: 'inherit' },
  );

  console.log('Pacote validado: ESM, CommonJS e tipos TypeScript.');
} finally {
  await rm(temp, { recursive: true, force: true });
}
