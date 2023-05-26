"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = exports.user = void 0;
exports.user = [
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
exports.product = [
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
//# sourceMappingURL=database.js.map