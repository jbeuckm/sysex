"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Transcode a number as 7bit chunks right justified
 */
var Identity = /** @class */ (function () {
    function Identity(length) {
        this.length = length;
    }
    Identity.prototype.encode = function (value) {
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
    Identity.prototype.decode = function (bytes) {
        if (bytes.length !== this.length) {
            throw "Decoder[" + this.length + "] called with " + bytes.length + " bytes.";
        }
        var value = 0;
        bytes.forEach(function (byte, i) {
            value = (value << 7) | byte;
        });
        return value;
    };
    return Identity;
}());
exports.default = Identity;
//# sourceMappingURL=Identity.js.map