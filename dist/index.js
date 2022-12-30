"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logger_1 = require("./src/log/logger");
var datasource_1 = __importDefault(require("./src/datasource/datasource"));
var app = (0, express_1.default)();
var PORT = process.env.PORT || 9120;
var CronJob = require("cron").CronJob;
var cors = require("cors");
var dataSourceRoutes = datasource_1.default.getRoute();
app.use(cors());
app.use(express_1.default.json());
app.use('/vessels', dataSourceRoutes);
app.get('/', function (req, res) {
    res.json({
        "status": "success",
        "message": "connected"
    });
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    // next(createError(404));
    res.status(404).json({
        code: 404,
        status: "failed",
        message: "Page Not Found",
    });
});
var server = app.listen(PORT, function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    logger_1.logger.log("debug", "running at http://" + address + ":" + port);
});
