"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Segment_1 = __importDefault(require("./Segment"));
var Sysex = /** @class */ (function () {
    function Sysex(format) {
        this.name = format.name;
        this.segments = format.segments.map(function (segmentFormat) { return new Segment_1.default(segmentFormat); });
    }
    Sysex.prototype.encode = function (values) {
        if (values === void 0) { values = {}; }
        var bytes = [];
        this.segments.forEach(function (segment) {
            var segmentBytes = segment.encode(values[segment.format.name]);
            segmentBytes.forEach(function (byte) { return bytes.push(byte); });
        });
        return bytes;
    };
    Sysex.prototype.parse = function (bytes) { };
    return Sysex;
}());
exports.default = Sysex;
//# sourceMappingURL=index.js.map