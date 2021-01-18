"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("./types");
var Segment = /** @class */ (function () {
    function Segment(format) {
        this.format = format;
    }
    Segment.prototype.getDefaultBytes = function () {
        if (typeof this.format.default === 'number') {
            return Array(this.format.length).fill(this.format.default);
        }
        return this.format.default;
    };
    Segment.prototype.encode = function (value) {
        switch (this.format.encoding) {
            case types_1.Encoding.BYTE:
                if (value !== undefined) {
                    return [Number(value)];
                }
                else {
                    return [this.format.default];
                }
                break;
            case types_1.Encoding.ASCII: {
                var bytes = this.getDefaultBytes();
                if (typeof value === 'string') {
                    for (var i = 0; i < this.format.length; i++) {
                        var charCode = value.charCodeAt(i);
                        if (!isNaN(charCode)) {
                            bytes[i] = charCode;
                        }
                    }
                }
                return bytes;
                break;
            }
            case types_1.Encoding.CONSTANT:
            default:
                return this.getDefaultBytes();
                break;
        }
    };
    Segment.prototype.decode = function (bytes) {
        return 0;
    };
    return Segment;
}());
exports.default = Segment;
//# sourceMappingURL=Segment.js.map