"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var vesselInfo_1 = require("./vesselInfo");
var DataSource = /** @class */ (function () {
    function DataSource() {
        this.dataSourceRouter = express_1.default.Router();
        this.initialize();
    }
    DataSource.prototype.initialize = function () {
        this.dataSourceRouter.use("/vesselInfo", vesselInfo_1.vesselInfo.getRoute());
    };
    DataSource.prototype.getRoute = function () {
        return this.dataSourceRouter;
    };
    return DataSource;
}());
var dataSource = new DataSource();
console.log(dataSource);
exports.default = dataSource;
