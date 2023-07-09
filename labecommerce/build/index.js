"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
(0, database_1.createUser)('007', 'Vitor', 'vitor@gmail.com', '134');
console.table((0, database_1.getAllUsers)(database_1.users));
//# sourceMappingURL=index.js.map