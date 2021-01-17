"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Segment = /** @class */ (function () {
    function Segment(format) {
        this.format = format;
    }
    Segment.prototype.encode = function (value) {
        return this.format.default;
    };
    Segment.prototype.decode = function (bytes) {
        return 0;
    };
    return Segment;
}());
exports.default = Segment;
//# sourceMappingURL=Segment.js.map