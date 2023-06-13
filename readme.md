# Este é um teste para desenvolvedores

# possui 5 testes

## Introdução

Este projeto possui um banco de dados fake em fakeData.js com apenas um registro.
A ideia é melhorar e o CRUD escrito nos 4 arquivos de teste abaixo.

Será a validada a forma de escrita de código.
Escreva códigos que humanos consigam entender.

Fique a vontade para fazer modificaçoes nos serviços, comentários em código, estrutura, mas seja objetivo.

## teste1.js

GET em /user

Possuimos neste arquivo um serviço que faz uma busca no banco fake e retorna um registro.
Este código funciona, mas é possivel melhorar.
Veja o que pode deixar ele melhor escrito e mais performatico.

## teste2.js

POST em /users, descubra a intenção dele e o corrija.

## teste3.js

Este procura um usuário e o deleta da base.
Retorne sucesso para o client caso realmente tenha sido excluido e deixe o código mais performatico.

## teste4.js

Atualiza os dados de um usuário especifico.

## teste5.js

Retorne quantas vezes determinado usuário foi lido no teste1.

## teste 6

Definina uma forma de criar permissão para o usuario, defina se o usuário pode deletar ou atualizar usuários. Crie um middleware para validar essas permissões e adicione no teste4 e teste3.

---

Challenge start: Jun 11 - 18:20  
Challenge end: Jun 12 - 23:48

## Major project changes

- **Changed project file structure**  
  Instead of having files with ambigous names such as `teste1.js`, controllers, services and other utilitarian files have been created and the original project's functionalities have been maintained and propperly segregated into these diferent files.
- **Added unit tests**  
   Unit tests have been added first, when the project had it's original structure, as to preserve original behavior once refactoring and improvements took place, extra functionalities have been implemented tests-first. Managed to achieve 100% code coverage.
- **Fixed all bugs in the original code**  
  Fixed all bugs in the original code, including ones that were not mentioned.
- **Measured api performance**  
  Measured api performance using [vegeta](https://github.com/tsenart/vegeta).

## Running the project

Before running the aplication or the tests, you will need to setup a `.env` file, an `.env.template` file is provided with this repo for that, just copy that file, rename it to `.env` and fill in the env variables, only `AUTH_SECRET` is mandatory (otherwise jsonwebtoken will break), the other variables have default values if none are provided.

1. cd into project directory
2. run `npm i`
3. run `npm run dev`

The application should be available by default at `http://localhost:3000`

### Running the unit tests

Given that the `.env` file is already created, and that all dependencies were installed, just run `npm run test`. It should provide with a report on the terminal at the end, as well as creating the folder `coverage` with the test results inside.

### Running load tests

With a terminal already running the application, open another one and run `make load-all`, this will run all load tests and save them inside the `docs` folder. Don't forget you'll need [vegeta](https://github.com/tsenart/vegeta) installed.

### How to login

Send a POST request to `/login` with the following body `{ "id": 0 }`, this will return a payload with the `accessToken` in it, copy that token and add it to the Authorization header with the format `JWT <ACCESS_TOKEN>`.

### Viewing load test results

I left the load test results i took during development inside the `docs` folder, inside, they are separated in 3 folders:

- perf-before: Performance results of the original code (with major breaking bugs fixed)
- perf-db-refactor: Performance results during the mid point of development (db just had been refactored)
- perf-final: Performance results taken at the end of development (this commit, which should be the final if no other major problems occur)

Inside each if these folders, there will be `perf-all-users` and `perf-one-user` files, they are the results for attacking the route that retrieves all users and the route that retrieves one user, respectively.

## Considerations

I had to assume a few things about the challenge, which i'll go through below.

### Regarding performance

Ideally, for having better control of performance regarding data, we should make use of an actual relational database, considering how the challange is structured, i refrained from using one and stuck with just js, in this case i used an associative array to improve performance a little bit and kept track of the highest id the database knows, so we don't have id overlap or other related problems.

Another option would be implementing a cache (e.g.: Redis) in the application, that would give us some more performance, even though we would need to handle a lot of cache invalidations due to `readCount` present in every user entry, again, i did not implement one as i thought it would deviate too much from the focus of the challenge.

### Regarding authentication

It wasn't clear if a full login and password system or just an api key system was being requested, so in the interest of time i just added a very simple system for getting a jwt token using just the id of an user that has admin rights (the default user that is registered in the fake database has admin rights). Ideally in an actual production environment, i would have at least a login and password system setted up for this, using a library such as bcrypt for handling password hashing before storing the information in the database.

### Possible improvements

- Using typescript
- Using an actual relational database
- Adding a password and login system, would also require adding a registration route
- Dockerizing the project
- Adding a cache system such as redis or memcached
- Setting up more vegeta load tests for the other routes

## Final considerations

Thank you very much for the challenge and the opportunity! :D
