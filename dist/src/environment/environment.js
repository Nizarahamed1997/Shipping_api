"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
exports.environment = {
    MySQLConfig: {
        host: process.env.MY_SQL_URL || "localhost",
        user: process.env.MY_SQL_USER || "root",
        password: process.env.MY_SQL_PASSWORD || "1702",
        database: process.env.MY_SQL_DATABASE || "Shipping",
        port: Number(process.env.MY_SQL_PORT) || 3306,
    }
};
