"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../types");
/*
 * Most to least significat 7bit chunks
 */
var MostToLeast = /** @class */ (function (_super) {
    __extends(MostToLeast, _super);
    function MostToLeast() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MostToLeast.prototype.encode = function (value) {
        var bytes = [];
        var acc = value || 0;
        while (acc > 0) {
            bytes.unshift(acc & 0x7f);
            acc >>>= 7;
        }
        if (bytes.length > this.length) {
            throw "Value \"" + value + "\" too large to fit in " + this.length + " bytes.";
        }
        while (bytes.length < this.length) {
            bytes.unshift(0);
        }
        return bytes;
    };
    MostToLeast.prototype.decode = function (bytes) {
        if (bytes.length !== this.length) {
            throw "Decoder[" + this.length + "] called with " + bytes.length + " bytes.";
        }
        var value = 0;
        bytes.forEach(function (byte) {
            value = (value << 7) | byte;
        });
        return value;
    };
    return MostToLeast;
}(types_1.Transcoder));
exports.default = MostToLeast;
//# sourceMappingURL=MostToLeast.js.map