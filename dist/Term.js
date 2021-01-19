"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Identity_1 = __importDefault(require("./transcoders/Identity"));
var LENGTH_REGEX = /\[(\d+)\]$/;
var BYTE_REGEX = /^[0-9a-f]{2}$/;
var Term = /** @class */ (function () {
    function Term(term, format) {
        this.length = 1;
        this.term = term;
        var root = this.extractLength(term);
        this.transcoder = new Identity_1.default(this.length);
        if (root.match(BYTE_REGEX)) {
            this.constant = parseInt(root, 16);
            return;
        }
        this.name = root;
        if (typeof format === 'object') {
            this.default = format.defaults && format.defaults[this.name];
            var transcoder = format.transcoders && format.transcoders[this.name];
            if (transcoder) {
                this.transcoder = transcoder;
            }
        }
    }
    Term.prototype.extractLength = function (term) {
        var length = term.match(LENGTH_REGEX);
        if (length && length[1]) {
            this.length = Number(length[1]);
            return term.replace(LENGTH_REGEX, '');
        }
        else {
            this.length = 1;
            return term;
        }
    };
    Term.prototype.encode = function (params) {
        if (typeof this.constant !== 'undefined') {
            return Array(this.length).fill(this.constant);
        }
        if (this.name && params && typeof params[this.name] !== 'undefined') {
            return this.transcoder.encode(params[this.name]);
        }
        if (this.default) {
            return this.default;
        }
        return Array(this.length).fill(0);
    };
    Term.prototype.decode = function (bytes) {
        return this.transcoder.decode(bytes);
    };
    return Term;
}());
exports.default = Term;
//# sourceMappingURL=Term.js.map