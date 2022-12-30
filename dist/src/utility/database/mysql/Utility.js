"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utility = void 0;
var logger_1 = require("../../../log/logger");
var my_sql_1 = require("./my_sql");
var Error_1 = require("../../../Exceptions/Error");
var util = require("util");
var q = require("q");
var Utility = /** @class */ (function () {
    function Utility() {
    }
    Utility.executeCRUDQuery = function (connection, sqlQuery, parameters, description) {
        var deferred = q.defer();
        var result = connection.query(sqlQuery, parameters, function (err, res) {
            logger_1.logger.log("debug", "AssetServiceDAO :: %s ,Query : %s", description, result.sql);
            if (err) {
                logger_1.logger.log(err);
                deferred.reject(new Error_1.ServerError(err.message || err.toString()));
            }
            else {
                deferred.resolve(res);
            }
        });
        return deferred.promise;
    };
    Utility.getDBConnection = function (isTransaction) {
        if (isTransaction === void 0) { isTransaction = false; }
        var deferred = q.defer();
        my_sql_1.DBConnection.getConnection(isTransaction, function (err, connection) {
            if (err) {
                logger_1.logger.error("Error while getting the DBConnection" + err.message || err.toString());
                deferred.reject(new Error_1.ServerError("DB Connection error"));
            }
            else {
                deferred.resolve(connection);
            }
        });
        return deferred.promise;
    };
    Utility.closeDBConnection = function (connection) {
        try {
            if (connection && connection["isConnectionAlive"]) {
                connection["isConnectionAlive"] = false;
                connection.release();
            }
        }
        catch (err) {
            logger_1.logger.error("Error occurred while trying to release dbConnection :" +
                util.inspect(err, {
                    showHidden: false,
                    depth: null,
                }));
        }
    };
    Utility.databaseQuery = function (query, description) {
        var deffered = q.defer();
        var DBConnection;
        Utility.getDBConnection(false)
            .then(function (connection) {
            DBConnection = connection;
            DBConnection["isConnectionAlive"] = true;
            return Utility.executeCRUDQuery(DBConnection, query, [], description);
        })
            .then(function (result) {
            Utility.closeDBConnection(DBConnection);
            deffered.resolve(result);
        })
            .catch(function (err) {
            logger_1.logger.log("error", err);
            Utility.closeDBConnection(DBConnection);
            deffered.reject([]);
        });
        return deffered.promise;
    };
    return Utility;
}());
exports.Utility = Utility;
