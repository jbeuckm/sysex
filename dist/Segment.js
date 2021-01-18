"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Segment = /** @class */ (function () {
    function Segment(format) {
        this.format = format;
    }
    Segment.prototype.getDefaultBytes = function () {
        if (typeof this.format.default === 'number') {
            return Array(this.format.length).fill(this.format.default);
        }
        return Array.isArray(this.format.default)
            ? this.format.default
            : Array(this.format.length).fill(0x00);
    };
    Segment.prototype.encode = function (value) {
        if (typeof this.format.encoder === 'function') {
            return this.format.encoder(value);
        }
        switch (this.format.encoder) {
            case 'byte':
                if (value !== undefined) {
                    return [Number(value)];
                }
                else {
                    return [this.format.default];
                }
                break;
            case 'ascii': {
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
            case 'constant':
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