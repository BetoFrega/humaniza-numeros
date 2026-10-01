import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import humanizaNumeros from '../dist/index.js';

const require = createRequire(import.meta.url);
const commonjs = require('../dist/index.cjs');

test('ESM e CommonJS preservam os resultados da API', () => {
  for (const input of [
    0, 12, 999, 1000, 1560, 1234567, 2111111111, 1234567890000000,
    1234567890000000000,
  ]) {
    for (const decimals of [0, 1, 3]) {
      assert.equal(
        commonjs.default(input, decimals),
        humanizaNumeros(input, decimals),
      );
    }
  }
  assert.equal(humanizaNumeros(1560), '2 Mil');
  assert.equal(humanizaNumeros(0), '0 ');
});
