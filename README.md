### Very Useful Tools to Remember (VUTTR)

- Typescript;
- Node, Express, Mongoose e MongoDB;
- Eslint
- Prettier
- Testes com jest e supertest
- Documentação das rotas usando Swagger
- Husky controlando os pushes para o repositório passando antes pelo linter e prettier

#### Requisitos

- Node 10.16.0 ou superior;
- Arquivo de variáveis de ambiente na raiz deste repositório com o nome **.env** contento as variáveis de ambiente necessárias(as variáveis serão explicadas logo abaixo);
- Docker (opcional para rodar a aplicação);

#### Variáveis de ambiente

As seguintes variáveis definidas no arquivo **.env** na raiz deste repositório são necessárias para a aplicação:

- DB_URI: url de conexão com o MongoDB, exemplo: _mongodb://user:password@ds.mlab.com:51463/database_
- TEST_DB_URI: url de conexão com o MongoDB para os **testes**, exemplo: _mongodb://user:password@ds.mlab.com:51463/database_test_
- NODE_ENV: environment cujo Node irá executar, pode ter os valores `development`, `production` e `test`;

Exemplo de _.env_:

```javascript
TEST_DB_URI=mongodb://qa:test@ds.mlab.com:51463/database_test
DB_URI=mongodb://user:password@ds.mlab.com:51463/database
NODE_ENV=development

```

#### Scripts

Para executar os scripts basta usar o comando `yarn run <script-name>`.

- **lint**: executa o eslit em todos os arquivos .ts dentro do diretório /src
- **prettier**: executa o check do prettier em todos os arquivos dentro do diretório /src
- **test**: executa os testes unitários e de integração com jest e supertest
- **test:coverage**: executa o comando acima mostrando o _coverage_ dos tests
- **start:dev**: executa o ts-node para executar a aplição
- **start**: executa a aplicação depois do processo de transpilação do typescript
- **build**: executa o processo de transpilação do typescript em apenas javascript, gerando a build no diretório _/build_
- ** build:watch **: executa o comando acima com a opção _watch_ para acompanhar cada passo do processo

#### Executando a aplicação

Respeitando os requisitos exigidos, para executar a aplicação localmente basta executar dois comandos:

```
yarn run build
yarn run start
```

Caso queira executar usando Docker, certifique-se de que o Docker está sendo executado e apenas execute o seguinte comando:

```
docker-compose up
```

Com isso a aplicação estará sendo executada e poderá ser acessada através do caminho: `http://localhost:3000`

#### Documentação da API

As informações sobre as rotas da aplicação pode ser encontradas através da rota `{server_url}/api-docs`
