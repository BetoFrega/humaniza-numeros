# humaniza-numeros

[![Test](https://github.com/BetoFrega/humaniza-numeros/actions/workflows/test.yml/badge.svg)](https://github.com/BetoFrega/humaniza-numeros/actions/workflows/test.yml)
[![npm version](https://badge.fury.io/js/humaniza-numeros.svg)](https://badge.fury.io/js/humaniza-numeros)
[![npm](https://img.shields.io/npm/dt/humaniza-numeros.svg)](https://www.npmjs.com/package/humaniza-numeros)
[![GitHub license](https://img.shields.io/github/license/BetoFrega/humaniza-numeros.svg)](LICENSE)

> Transforma números muito grandes em versões mais legíveis por humanos, de acordo com a escala utilizada no Brasil: `1234567` → `1,2 Milhão`

## Instalação

Requer Node.js 22.14+ na linha 22, ou Node.js 24.10+. Para desenvolvimento, utilize Node.js 24 LTS (`nvm use`).

```sh
$ npm i humaniza-numeros
```

## Utilização

```javascript
import humanizaNumeros from 'humaniza-numeros';

humanizaNumeros(1560, 1);
// => '1,6 Mil'

humanizaNumeros(2111111111111, 3);
// => '2,111 Trilhões'
```

O pacote inclui versões ESM e CommonJS e declarações de tipos para TypeScript, sem dependências de runtime.

Em CommonJS, a função continua disponível em `default`:

```javascript
const { default: humanizaNumeros } = require('humaniza-numeros');

humanizaNumeros(1560, 1);
// => '1,6 Mil'
```

## API

### humanizaNumeros(input, decimals = 0)

Arredonda o valor `input` com base no [`Math.round`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round), utilizando o número de casas `decimais` fornecido e anexando o valor de escala apropriado (Milhão, Bilhão, etc.)

#### input

Tipo: `number`

Número a ser humanizado

#### decimals

Tipo: `number`

Número de casas decimais

## Desenvolvimento

```sh
nvm use
npm ci
npm run check
```

- `npm run build`: gera `dist/` com esbuild e declarações de tipos com TypeScript.
- `npm run typecheck`: verifica os tipos do código-fonte.
- `npm test`: compila e executa os testes com o runner nativo do Node e cobertura.
- `npm run test:package`: empacota, instala em um projeto temporário e verifica ESM, CommonJS e os tipos em ambos os formatos.
- `npm run format`: formata o projeto com Prettier.
- `npm run check`: executa todas as verificações acima, incluindo a conferência de formatação.

O Husky instala os hooks em `npm ci`: o commit-msg verifica Conventional Commits com commitlint e o pre-push executa `npm run check`.

## Publicação

O CI testa Node.js 22 e 24 em pushes e pull requests. A publicação com semantic-release ocorre somente em pushes para `master`, depois de `npm run check`. O build também roda automaticamente em `npm pack` e `npm publish`.

A publicação usa npm Trusted Publishing (OIDC): nas configurações do pacote no npm, cadastre o repositório `BetoFrega/humaniza-numeros` e o workflow `npmpublish.yml` como trusted publisher. O job possui `id-token: write` para obter a identidade de publicação.

O workflow não utiliza `NPM_TOKEN` nem `NODE_AUTH_TOKEN`: a autenticação no npm é feita por OIDC. O `GITHUB_TOKEN` continua necessário para criar tags e releases no GitHub. O secret `npm_token` antigo pode ser removido das configurações do repositório, pois deixou de ser utilizado. Nenhum token é necessário para desenvolver ou validar o pacote localmente.

A atualização do requisito de Node.js e o mapa de exports devem ser publicados como uma versão major. Utilize um commit com `!` (por exemplo, `feat!: moderniza o stack`) ou um rodapé `BREAKING CHANGE:` para que semantic-release determine a versão. Os imports devem usar `humaniza-numeros`; caminhos internos como `humaniza-numeros/dist/index.js` não fazem parte dos exports.

A modernização mantém os resultados atuais da função, incluindo suas regras de arredondamento e pluralização. Alterações dessas regras devem ser tratadas separadamente.

## Licença

MIT © [Beto Frega](https://github.com/BetoFrega)
