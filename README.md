# Live Crawler
Um pequeno web-crawler que busca e trata o DOM da <a href="https://habblive.in/noticias/184" target="_blank">página de promoções ativas do Habblive</a>,
transformando as notícias em um tipo de dado consistente e apresentando as promoções numa interface simples construída com React Bootstrap.

## Rodando a aplicação

Desenvolvimento:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador para carregar a home.

## Changelog

### v0.2.0
O html da página é buscado (através do `fetch` nativo).

Utilizando a biblioteca <a href="https://cheerio.js.org" target="_blank">Cheerio</a>, o DOM é manipulado de modo a obter os dados
necessários para inicializar instâncias da entidade `Article`.

- A plataforma `browserless` não é mais utilizada;
- A biblioteca `Puppeteer` não é mais utilizada.

### v0.1.0
Utiliza-se a biblioteca <a href="https://pptr.dev/" target="_blank">Puppeteer</a> para acessar a página e buscar os dados,
formatando-os na página `.tsx`.

Como browser, utilizava-se a plataforma `browserless` para acessar o site do Habblive num ambiente serverless..
