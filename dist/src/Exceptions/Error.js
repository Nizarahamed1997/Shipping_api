"use strict";
/*
 class Error {
    public message: string
    public status: string
    public code: number
    public description: string

    constructor(message: any) {
        this.message=message

    }
}
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetDeviceORSubscriptionNotFound = exports.AssetDeviceMappingExist = exports.DeviceNotDispatched = exports.DuplicateAssetDeviceMapping = exports.APIBadRequest = exports.TDMGAPIBadRequest = exports.AssetDeviceNotExist = exports.SubscriptionExpiredError = exports.GatewayTimeoutError = exports.InternalServerError = exports.ServerError = exports.RequestEntityTooLargeError = exports.ResourceNotFoundError = exports.UnauthorizedError = exports.DuplicateDeviceError = exports.ValidationError = void 0;
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        return _this;
    }
    return CustomError;
}(Error));
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message) {
        return _super.call(this, message) || this;
        //this.statusCode = 400
    }
    return ValidationError;
}(CustomError));
exports.ValidationError = ValidationError;
var DuplicateDeviceError = /** @class */ (function (_super) {
    __extends(DuplicateDeviceError, _super);
    function DuplicateDeviceError(message) {
        return _super.call(this, message) || this;
        //this.statusCode = 400
    }
    return DuplicateDeviceError;
}(CustomError));
exports.DuplicateDeviceError = DuplicateDeviceError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message) {
        return _super.call(this, message) || this;
        //this.statusCode=401
    }
    return UnauthorizedError;
}(CustomError));
exports.UnauthorizedError = UnauthorizedError;
var ResourceNotFoundError = /** @class */ (function (_super) {
    __extends(ResourceNotFoundError, _super);
    function ResourceNotFoundError(message) {
        return _super.call(this, message) || this;
        //this.statusCode=404
    }
    return ResourceNotFoundError;
}(CustomError));
exports.ResourceNotFoundError = ResourceNotFoundError;
var RequestEntityTooLargeError = /** @class */ (function (_super) {
    __extends(RequestEntityTooLargeError, _super);
    function RequestEntityTooLargeError(message) {
        return _super.call(this, message) || this;
        //this.statusCode=413
    }
    return RequestEntityTooLargeError;
}(CustomError));
exports.RequestEntityTooLargeError = RequestEntityTooLargeError;
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError(message) {
        return _super.call(this, message) || this;
        //this.statusCode=500
    }
    return ServerError;
}(CustomError));
exports.ServerError = ServerError;
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message) {
        return _super.call(this, message) || this;
        //this.statusCode=500
    }
    return InternalServerError;
}(CustomError));
exports.InternalServerError = InternalServerError;
var GatewayTimeoutError = /** @class */ (function (_super) {
    __extends(GatewayTimeoutError, _super);
    function GatewayTimeoutError(message) {
        return _super.call(this, message) || this;
        //this.statusCode=504
    }
    return GatewayTimeoutError;
}(CustomError));
exports.GatewayTimeoutError = GatewayTimeoutError;
var SubscriptionExpiredError = /** @class */ (function (_super) {
    __extends(SubscriptionExpiredError, _super);
    function SubscriptionExpiredError(message) {
        return _super.call(this, message) || this;
    }
    return SubscriptionExpiredError;
}(CustomError));
exports.SubscriptionExpiredError = SubscriptionExpiredError;
var AssetDeviceNotExist = /** @class */ (function (_super) {
    __extends(AssetDeviceNotExist, _super);
    function AssetDeviceNotExist(message) {
        return _super.call(this, message) || this;
    }
    return AssetDeviceNotExist;
}(CustomError));
exports.AssetDeviceNotExist = AssetDeviceNotExist;
var TDMGAPIBadRequest = /** @class */ (function (_super) {
    __extends(TDMGAPIBadRequest, _super);
    function TDMGAPIBadRequest(message) {
        return _super.call(this, message) || this;
    }
    return TDMGAPIBadRequest;
}(CustomError));
exports.TDMGAPIBadRequest = TDMGAPIBadRequest;
var APIBadRequest = /** @class */ (function (_super) {
    __extends(APIBadRequest, _super);
    function APIBadRequest(message) {
        return _super.call(this, message) || this;
        //this.statusCode = 400
    }
    return APIBadRequest;
}(CustomError));
exports.APIBadRequest = APIBadRequest;
var DuplicateAssetDeviceMapping = /** @class */ (function (_super) {
    __extends(DuplicateAssetDeviceMapping, _super);
    function DuplicateAssetDeviceMapping(message) {
        return _super.call(this, message) || this;
    }
    return DuplicateAssetDeviceMapping;
}(CustomError));
exports.DuplicateAssetDeviceMapping = DuplicateAssetDeviceMapping;
var DeviceNotDispatched = /** @class */ (function (_super) {
    __extends(DeviceNotDispatched, _super);
    function DeviceNotDispatched(message) {
        return _super.call(this, message) || this;
    }
    return DeviceNotDispatched;
}(CustomError));
exports.DeviceNotDispatched = DeviceNotDispatched;
var AssetDeviceMappingExist = /** @class */ (function (_super) {
    __extends(AssetDeviceMappingExist, _super);
    function AssetDeviceMappingExist(message) {
        return _super.call(this, message) || this;
    }
    return AssetDeviceMappingExist;
}(CustomError));
exports.AssetDeviceMappingExist = AssetDeviceMappingExist;
var AssetDeviceORSubscriptionNotFound = /** @class */ (function (_super) {
    __extends(AssetDeviceORSubscriptionNotFound, _super);
    function AssetDeviceORSubscriptionNotFound(message) {
        return _super.call(this, message) || this;
    }
    return AssetDeviceORSubscriptionNotFound;
}(CustomError));
exports.AssetDeviceORSubscriptionNotFound = AssetDeviceORSubscriptionNotFound;
