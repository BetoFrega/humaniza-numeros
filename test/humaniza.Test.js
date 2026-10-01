import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import humanizaNumeros from '../dist/index.js';

describe('humanizaNumeros', function () {
  it('deve arredondar corretamente para cima', function () {
    assert.equal(humanizaNumeros(1560, 1), '1,6 Mil');
    assert.equal(humanizaNumeros(1450, 1), '1,5 Mil');
    assert.equal(humanizaNumeros(14550, 1), '14,6 Mil');
  });
  it('deve arredondar corretamente para baixo', function () {
    assert.equal(humanizaNumeros(1449, 1), '1,4 Mil');
  });
  it('deve arredondar corretamente em quantidade de dígitos decimais', function () {
    assert.equal(humanizaNumeros(1449, 1), '1,4 Mil');
    assert.equal(humanizaNumeros(1449, 2), '1,45 Mil');
    assert.equal(humanizaNumeros(1449, 3), '1,449 Mil');
    assert.equal(humanizaNumeros(1449, 4), '1,449 Mil');
    assert.equal(humanizaNumeros(1449, 5), '1,449 Mil');
  });
  it('deve apresentar corretamente no singular', function () {
    assert.equal(humanizaNumeros(1111111, 1), '1,1 Milhão');
    assert.equal(humanizaNumeros(1111111111, 1), '1,1 Bilhão');
    assert.equal(humanizaNumeros(1111111111111, 1), '1,1 Trilhão');
  });
  it('deve apresentar corretamente no plural', function () {
    assert.equal(humanizaNumeros(2111111, 1), '2,1 Milhões');
    assert.equal(humanizaNumeros(2111111111, 1), '2,1 Bilhões');
    assert.equal(humanizaNumeros(2111111111111, 1), '2,1 Trilhões');
  });
  it('deve apresentar corretamente os milhares', function () {
    assert.equal(humanizaNumeros(1234, 1), '1,2 Mil');
  });
  it('deve apresentar corretamente os milhões', function () {
    assert.equal(humanizaNumeros(1234567, 1), '1,2 Milhão');
  });
  it('deve apresentar corretamente os bilhões', function () {
    assert.equal(humanizaNumeros(1234567890, 1), '1,2 Bilhão');
  });
  it('deve apresentar corretamente os trilhões', function () {
    assert.equal(humanizaNumeros(1234567890000, 1), '1,2 Trilhão');
  });
  /**
   * Proposta de features:
   */
  /*
  it('deve apresentar quatrilhões como milhares de trilhões', function () {
    assert.equal(humanizaNumeros(1234567890000000, 1), '1.234 Trilhões');
  });
  it('deve apresentar números muito grandes como notação científica', function () {
    assert.equal(humanizaNumeros(1234567890000000000, 1), '1.2x10^18');
  });
  */
});
