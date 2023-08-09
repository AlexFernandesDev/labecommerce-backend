# Projeto Labecommerce

API vinculada à bando de dados para cadastro, consulta, alteração e exclusão de usuários, produtos e pedidos, simulando o backend de uma loja online.

## 🔧 Funcionalidades do Projeto
- [x] Cadastro de usuários, produtos e pedidos
- [x] Consulta de usuários, produtos e pedidos
- [x] Alteração de produtos
- [x] Exclusão de pedidos
   
## Estrutura do banco de dados
![image](https://github.com/AlexFernandesDev/labecommerce-backend/assets/61995505/1b256926-0db8-4287-a4bb-57835077bdde)

## 📺 Layout
### Get all users
Endpoint que busca todos os usuários

![image](https://github.com/AlexFernandesDev/labecommerce-backend/assets/61995505/03084ab9-16c9-48ad-be5d-95c1e26010c1)

### Get all products
Endpoint que busca todos os produtos ou um produto específico através do id informado como param.

![image](https://github.com/AlexFernandesDev/labecommerce-backend/assets/61995505/f74374bf-079b-4309-a9b1-eb6fc1fbdeb0)


### Create user
Endpoint para criar um usuário

![image](https://github.com/AlexFernandesDev/labecommerce-backend/assets/61995505/f529d209-131c-4bdd-ae6a-18b2492d2cdc)

### Create product
Endpoint para criar um produto

![image](https://github.com/AlexFernandesDev/labecommerce-backend/assets/61995505/7657d258-3d3d-40fd-a58b-6a7d50c8fdd4)

### Edit product by id
Endpoint para editar um produto informando o id.
Pode-se alterar quais dados quiser do produto.

![image](https://github.com/AlexFernandesDev/labecommerce-backend/assets/61995505/c32119c3-f3ea-4982-b5a0-aae196dafc97)

### Create purchase
Endpoint para criar pedidos

![image](https://github.com/AlexFernandesDev/labecommerce-backend/assets/61995505/66ed74ac-7951-4e84-b76c-39349ef94d09)

### Get purchase by id
Endpoint para buscar um pedido pelo id, relacionando os produtos do pedido

![image](https://github.com/AlexFernandesDev/labecommerce-backend/assets/61995505/1d5b9ece-4cbf-49b4-9b60-7de09fd50ac5)

### Delete purchase by id
Endpoint para deletar um pedido pelo id

![image](https://github.com/AlexFernandesDev/labecommerce-backend/assets/61995505/b874a385-0352-4275-b9f0-3642b6e84164)

## 📚 DOCUMENTAÇÃO API POSTMAN
https://documenter.getpostman.com/view/26589685/2s93sgYAuV

## Como rodar este projeto?
```bash
# Clone este repositório
$ git clone linkrepo

# Acesse a pasta do projeto no seu terminal
cd labecommerce

# Instale as dependências
$ npm install

# Execute a aplicação
$ npm run dev
```

## Tecnologias utilizadas
1. [Knex](https://knexjs.org/)
2. [Express](https://expressjs.com/)
3. [SQLite](https://www.sqlite.org/index.html)

## Autor
 - Alex Fernandes da Silva
