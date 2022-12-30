"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHelper = void 0;
var QueryHelper = /** @class */ (function () {
    function QueryHelper() {
    }
    QueryHelper.prototype.insertNewVesselInfo = function (FLEET_TYPE_NAME, SHIP_TEAM_CURRENT, SISTER_CLASS, NAME, IMO_NUMBER, VesselManagerRole, VESSEL_MGR_NAME, Builder, Builder_Country, Flag) {
        var value = ",CreatedBy";
        var query = "INSERT INTO VessselInformation(FLEET_TYPE_NAME, SHIP_TEAM_CURRENT, SISTER_CLASS, NAME, \n            IMO_NUMBER,VesselManagerRole, VESSEL_MGR_NAME, Builder, Builder_Country, Flag ".concat(value, ") \n        VALUES ('").concat(FLEET_TYPE_NAME, "','").concat(SHIP_TEAM_CURRENT, "','").concat(SISTER_CLASS, "','").concat(NAME, "',").concat(IMO_NUMBER, ",'").concat(VesselManagerRole, "',\n        '").concat(VESSEL_MGR_NAME, "','").concat(Builder, "', '").concat(Builder_Country, "','").concat(Flag, "')");
        return query;
    };
    return QueryHelper;
}());
exports.queryHelper = new QueryHelper();
