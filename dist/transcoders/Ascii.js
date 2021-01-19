"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Transcode a number as 7bit chunks right justified
 */
var Ascii = /** @class */ (function () {
    function Ascii(length) {
        this.length = length;
    }
    Ascii.prototype.encode = function (value) {
        if (!value) {
            return Array(this.length).fill(0);
        }
        var bytes = [];
        var valueLength = Math.min(value.length, this.length);
        for (var i = 0; i < valueLength; i++) {
            bytes.push(value.charCodeAt(i));
        }
        while (bytes.length < this.length) {
            bytes.push(0);
        }
        return bytes;
    };
    Ascii.prototype.decode = function (bytes) {
        if (bytes.length !== this.length) {
            throw "Decoder[" + this.length + "] called with " + bytes.length + " bytes.";
        }
        return bytes.map(function (byte) { return String.fromCharCode(byte); }).join('');
    };
    return Ascii;
}());
exports.default = Ascii;
//# sourceMappingURL=Ascii.js.map