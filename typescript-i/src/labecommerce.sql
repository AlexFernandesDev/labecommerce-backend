-- Active: 1687280178194@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES
('u005','user5@gmail.com','1234'),
('u006','user6@gmail.com','1234'),
('u007','user7@gmail.com','1234');


CREATE TABLE products (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)    
VALUES
('prod003','Celular',800.95,'telefonia'), 
('prod004','Cadeira',120.00,'decoração'), 
('prod005','Power Bank',110.15,'eletronicos'),
('prod006','Camiseta',25.90,'vestuário'),
('prod007','Fone de ouvido',110.15,'eletronicos');

-- Busca por todos os usuários
SELECT * FROM users;

-- Busca por todos os produtos
SELECT * FROM products;

-- Busca um produto pelo nome
SELECT * FROM products WHERE name = 'Celular';

-- Cria um novo usuário
INSERT INTO users (id, email, password)
VALUES
('u008','user8@gmail.com','1234');

-- Cria um novo produto
INSERT INTO products (id, name, price, category)
VALUES
('prod008','Smartphone',1200.95,'telefonia');

-- Buscar produto pelo id   
SELECT * FROM products
WHERE id = 'prod008';

-- Deletar user pelo id
DELETE FROM users
WHERE id = 'u008';

-- Deletar product pelo id 
DELETE FROM products
WHERE id = 'prod008';

-- Atualizar user pelo id - atualizar todas as colunas
UPDATE users
SET email = '<EMAIL>', password = '<PASSWORD>'
WHERE id = 'u008';

-- Atualizar produto pelo id - atualizar todas as colunas
UPDATE products
SET name = '<NAME>', price = '<PRICE>', category = '<CATEGORY>'
WHERE id = 'prod008';

-- Buscar todos os users ordenando pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY email ASC;

-- Buscar todos os produtos ordenando pela coluna price em ordem crescente, limitando o resultado em 3
SELECT * FROM products 
ORDER BY price ASC
LIMIT 3;

-- Buscar todos os produtos com intervalo de preço entre 100 e 300 em ordem crescente
SELECT * FROM products
WHERE price BETWEEN 100 AND 300
ORDER BY price ASC;
