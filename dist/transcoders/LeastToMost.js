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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MostToLeast_1 = __importDefault(require("./MostToLeast"));
/*
 * Least to most significat 7bit chunks
 */
var LeastToMost = /** @class */ (function (_super) {
    __extends(LeastToMost, _super);
    function LeastToMost() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LeastToMost.prototype.encode = function (value) {
        return _super.prototype.encode.call(this, value).reverse();
    };
    LeastToMost.prototype.decode = function (bytes) {
        return _super.prototype.decode.call(this, bytes.reverse());
    };
    return LeastToMost;
}(MostToLeast_1.default));
exports.default = LeastToMost;
//# sourceMappingURL=LeastToMost.js.map