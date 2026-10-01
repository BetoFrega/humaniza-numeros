const escalaCurta = [
  '', //n*10^0*3
  'Mil', //n*10^1*3
  'Milhão', //n*^2*3
  'Bilhão', //...
  'Trilhão',
  'Quadrilhão',
  'Quintilhão',
];

/**
 * Transforma números muito grandes em versões mais legíveis por humanos, de acordo com a escala utilizada no Brasil:
 * `1234567` → `1,2 Milhão`
 *
 * @param {number} input Número a ser humanizado
 * @param {number} decimals Número de casas decimais
 * @returns {string} String representando o número humanizado em português do Brasil.
 */
function humanizaNumeros(input: number, decimals = 0): string {
  const indexEscala = Math.ceil(input.toString().length / 3) - 1;
  const divisor = Math.pow(10, 3 * indexEscala);
  const base = input / divisor;
  const escala =
    base <= 2
      ? escalaCurta[indexEscala]
      : escalaCurta[indexEscala].replace('ão', 'ões');
  const baseRound =
    Math.round(base * Math.pow(10, decimals)) / Math.pow(10, decimals);

  return `${baseRound.toString().replace('.', ',')} ${escala}`;
}

export default humanizaNumeros;
