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
exports.Ascii = void 0;
var index_1 = require("./index");
/*
 * Transcode a number as 7bit chunks right justified
 */
var Ascii = /** @class */ (function (_super) {
    __extends(Ascii, _super);
    function Ascii() {
        return _super !== null && _super.apply(this, arguments) || this;
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
}(index_1.Transcoder));
exports.Ascii = Ascii;
//# sourceMappingURL=Ascii.js.map