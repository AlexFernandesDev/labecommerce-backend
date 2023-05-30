"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
    {
        id: 'u001',
        name: 'Alex',
        email: 'alex@gmail.com',
        password: '1234',
        createdAt: new Date().toISOString()
    },
    {
        id: 'u002',
        name: 'Pedro',
        email: 'pedro@gmail.com',
        password: '9876',
        createdAt: new Date().toISOString()
    },
];
exports.products = [
    {
        id: 'prod001',
        name: 'Mouse gamer',
        price: 250,
        description: 'Melhor mouse do mercado!',
        imageUrl: 'https://picsum.photos/seed/Mouse%20gamer/400'
    },
    {
        id: 'prod002',
        name: 'Monitor',
        price: 900,
        description: 'Monitor LED Full HD 24 polegadas!',
        imageUrl: 'https://picsum.photos/seed/Monitor/400'
    },
];
function createUser(id, name, email, password) {
    const newUser = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString()
    };
    exports.users.push(newUser);
    return 'Usuário cadastrado com sucesso';
}
exports.createUser = createUser;
function getAllUsers(users) {
    return users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, description, imageUrl) {
    const newProduct = {
        id,
        name,
        price,
        description,
        imageUrl,
    };
    exports.products.push(newProduct);
    return "Produto criado com sucesso";
}
exports.createProduct = createProduct;
function getAllProducts(products) {
    return products;
}
exports.getAllProducts = getAllProducts;
function searchProductsByName(product) {
    return exports.products.filter(prod => prod.name.toLowerCase().includes(product.toLowerCase()));
}
exports.searchProductsByName = searchProductsByName;
//# sourceMappingURL=database.js.map