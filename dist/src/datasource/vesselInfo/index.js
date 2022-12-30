"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vesselInfo = void 0;
var express_1 = __importDefault(require("express"));
var logger_1 = require("../../log/logger");
var controller_1 = require("./controller");
var provider_1 = require("./provider");
var VesselInfo = /** @class */ (function () {
    function VesselInfo() {
        this.router = express_1.default.Router();
        this.initialize();
    }
    VesselInfo.prototype.initialize = function () {
        var _this = this;
        this.router.post('/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var data, _a, FLEET_TYPE_NAME, SHIP_TEAM_CURRENT, SISTER_CLASS, NAME, IMO_NUMBER, VesselManagerRole, VESSEL_MGR_NAME, Builder, Builder_Country, Flag, finalResponse, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        data = provider_1.provider.vesselInfoApi();
                        _a = req.body(data), FLEET_TYPE_NAME = _a.FLEET_TYPE_NAME, SHIP_TEAM_CURRENT = _a.SHIP_TEAM_CURRENT, SISTER_CLASS = _a.SISTER_CLASS, NAME = _a.NAME, IMO_NUMBER = _a.IMO_NUMBER, VesselManagerRole = _a.VesselManagerRole, VESSEL_MGR_NAME = _a.VESSEL_MGR_NAME, Builder = _a.Builder, Builder_Country = _a.Builder_Country, Flag = _a.Flag;
                        if (!FLEET_TYPE_NAME ||
                            !SHIP_TEAM_CURRENT ||
                            !SISTER_CLASS ||
                            !NAME ||
                            !IMO_NUMBER ||
                            !VesselManagerRole ||
                            !VESSEL_MGR_NAME ||
                            !Builder ||
                            !Builder_Country ||
                            !Flag) {
                            return [2 /*return*/, res.send({
                                    status: "failure",
                                    message: "Necessary Parameter Missing !!!",
                                })];
                        }
                        return [4 /*yield*/, controller_1.controller.createNewVesselInfo(FLEET_TYPE_NAME, SHIP_TEAM_CURRENT, SISTER_CLASS, NAME, IMO_NUMBER, VesselManagerRole, VESSEL_MGR_NAME, Builder, Builder_Country, Flag)];
                    case 1:
                        finalResponse = _b.sent();
                        return [2 /*return*/, res.send((finalResponse))];
                    case 2:
                        error_1 = _b.sent();
                        logger_1.logger.log("error", error_1);
                        return [2 /*return*/, res.send({
                                status: "failure",
                                message: "Internal Server Error!!!",
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    VesselInfo.prototype.getRoute = function () {
        return this.router;
    };
    return VesselInfo;
}());
exports.vesselInfo = new VesselInfo();
