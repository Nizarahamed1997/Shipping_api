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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LoggerStream = void 0;
var winston = __importStar(require("winston"));
var winston_1 = require("winston");
var moment_timezone_1 = __importDefault(require("moment-timezone"));
var winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
var combine = winston_1.format.combine, timestamp = winston_1.format.timestamp, label = winston_1.format.label, printf = winston_1.format.printf;
var baseDir = process.cwd();
var appendTimestamp = (0, winston_1.format)(function (info, opts) {
    if (opts.tz)
        info.timestamp = (0, moment_timezone_1.default)(new Date()).tz("UTC").format("YYYY-MM-DD HH:mm:ss"); // FOR UTC
    //   info.timestamp = moment(new Date()).utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss');  // FOR IST
    return info;
});
var myFormat = printf(function (info) { return "".concat(info.timestamp, " [").concat(info.level, "]: ").concat(info.label, " - ").concat(info.message); });
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.logger = winston.createLogger({
        format: combine(winston_1.format.splat(), label({ label: "" }), appendTimestamp({ tz: "UTC" }), myFormat),
        transports: [
            //    new winston.transports.File(this.fileLogOptions),
            new winston.transports.Console({
                level: typeof process.env.logLevel === "undefined"
                    ? "debug"
                    : process.env.logLevel,
                handleExceptions: true,
            }),
            new winston_daily_rotate_file_1.default({
                level: typeof process.env.logLevel === "undefined"
                    ? "debug"
                    : process.env.logLevel,
                filename: "goose-resp-api-%DATE%.log",
                dirname: baseDir + "/logs",
                datePattern: "YYYY-MM-DD",
                maxSize: "30m",
                maxFiles: "30d",
            }),
        ],
        exitOnError: false,
    });
    return Logger;
}());
var LoggerStream = /** @class */ (function () {
    function LoggerStream() {
    }
    LoggerStream.prototype.write = function (message) {
        Logger.logger.info(message.substring(0, message.lastIndexOf("\n")));
    };
    return LoggerStream;
}());
exports.LoggerStream = LoggerStream;
exports.logger = Logger.logger;
