"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConnection = void 0;
var logger_1 = require("../../../log/logger");
var mysql = __importStar(require("mysql"));
var mysqlUtilities = __importStar(require("mysql-utilities"));
var environment_1 = require("../../../environment/environment");
var q = require("q");
var MysqlDBConnection = /** @class */ (function () {
    function MysqlDBConnection() {
        this.configDB();
        this.pool.on("connection", this.poolConnectionCallBack);
    }
    MysqlDBConnection.prototype.poolConnectionCallBack = function (connection) {
        mysqlUtilities.upgrade(connection);
        mysqlUtilities.introspection(connection);
    };
    MysqlDBConnection.prototype.configDB = function () {
        this.pool = mysql.createPool({
            connectionLimit: 25,
            host: environment_1.environment.MySQLConfig.host,
            user: environment_1.environment.MySQLConfig.user,
            password: environment_1.environment.MySQLConfig.password,
            database: environment_1.environment.MySQLConfig.database,
            port: +environment_1.environment.MySQLConfig.port,
            multipleStatements: true,
            waitForConnections: true,
            debug: false,
        });
        this.pool.on("acquire", function (connection) {
            logger_1.logger.log("debug", "Connection acquired from connection pool...Connection %s acquired", connection.threadId);
        });
        this.pool.on("connection", function (connection) {
            logger_1.logger.debug("**** New MySQL connection is made ****");
            mysqlUtilities.upgrade(connection);
            mysqlUtilities.introspection(connection);
        });
        this.pool.on("enqueue", function () {
            logger_1.logger.info("Waiting for available DB connection slot !!!!!!!!!!");
        });
        this.pool.on("release", function (connection) {
            logger_1.logger.debug("Connection %d is released back to the pool", connection.threadId);
        });
    };
    MysqlDBConnection.prototype.getConnection = function (transaction, callback) {
        if (typeof transaction == "function") {
            callback = transaction;
            transaction = false;
        }
        this.pool.getConnection(function (err, connection) {
            if (err) {
                if (connection) {
                    connection.release();
                }
                return callback(err, connection);
            }
            else {
                connection.connect();
                if (transaction) {
                    connection.beginTransaction(function (err) {
                        if (err) {
                            return callback(err, connection);
                        }
                        else {
                            callback(null, connection);
                        }
                    });
                }
                else {
                    callback(null, connection);
                }
            }
        });
    };
    return MysqlDBConnection;
}());
exports.DBConnection = new MysqlDBConnection();
