-- Active: 1691714031743@@127.0.0.1@3306
-- Criação da tabela de usuários
CREATE TABLE users (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Inserções na tabela de usuários
INSERT INTO users (id, name, email, password)
VALUES
    ('user1', 'João Silva', 'joao@example.com', 'hashed_password_123'),
    ('user2', 'Maria Souza', 'maria@example.com', 'hashed_password_456'),
    ('user3', 'Carlos Oliveira', 'carlos@example.com', 'hashed_password_789');


-- Criação da tabela de produtos
CREATE TABLE products (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- Inserções na tabela de produtos
INSERT INTO products (id, name, price, description, image_url)
VALUES
    ('product1', 'Camiseta Branca', 29.99, 'Camiseta de algodão branca', 'image_url1'),
    ('product2', 'Calça Jeans', 59.99, 'Calça jeans tradicional', 'image_url2'),
    ('product3', 'Tênis Esportivo', 79.99, 'Tênis para atividades esportivas', 'image_url3');


-- Criação da tabela de pedidos
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    buyer TEXT NOT NULL,
    total_price REAL NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    paid BOOLEAN,
    FOREIGN KEY (buyer) REFERENCES users(id)
);

-- Inserções na tabela de pedidos
INSERT INTO purchases (id, buyer, total_price, paid)
VALUES
    ('purchase1', 'user1', 89.98, TRUE),
    ('purchase2', 'user2', 59.99, TRUE),
    ('purchase3', 'user3', 109.98, FALSE);


-- Criação da tabela de relação entre pedidos e produtos
CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Inserções na tabela de relação entre pedidos e produtos
INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
    ('purchase1', 'product1', 2),
    ('purchase1', 'product3', 1),
    ('purchase2', 'product2', 1),
    ('purchase3', 'product1', 3),
    ('purchase3', 'product2', 1);


