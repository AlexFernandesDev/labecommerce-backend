"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.log((0, database_1.createProduct)('prod007', 'camiseta', 50, 'camiseta Goku', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.latostadora.com%2Fweb%2Fcamiseta_goku_hombre%2F1122354&psig=AOvVaw1wfceviaAt7U4X6_2OF_dN&ust=1685496276026000&source=images&cd=vfe&ved=2ahUKEwihyNiH8Zv_AhXYlmoFHQNJDSwQjRx6BAgAEAw'));
console.log((0, database_1.searchProductsByName)('Monitor'));
//# sourceMappingURL=index.js.map