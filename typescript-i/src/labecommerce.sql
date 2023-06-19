-- Active: 1687132479182@@127.0.0.1@3306
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

SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

PRAGMA table_info('products');

INSERT INTO products (id, name, price, category)    
VALUES
('prod003','Celular',800.95,'telefonia'), 
('prod004','Cadeira',120.00,'decoração'), 
('prod005','Power Bank',110.15,'eletronicos'),
('prod006','Camiseta',25.90,'vestuário'),
('prod007','Fone de ouvido',110.15,'eletronicos');

SELECT * FROM products