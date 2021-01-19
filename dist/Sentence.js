"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Term_1 = __importDefault(require("./Term"));
var Sentence = /** @class */ (function () {
    function Sentence(format) {
        var fullTerms;
        if (typeof format === 'string') {
            fullTerms = format;
        }
        else {
            fullTerms = format.sentence.join(' ');
        }
        this.terms = fullTerms
            .split(' ')
            .filter(function (term) { return term !== ''; })
            .map(function (term) { return new Term_1.default(term, format); });
    }
    Sentence.prototype.encode = function (params) {
        var bytes = [];
        this.terms.forEach(function (term) {
            bytes.push.apply(bytes, term.encode(params));
        });
        return bytes;
    };
    Sentence.prototype.decode = function (bytes) {
        var values = {};
        this.terms.forEach(function (term) {
            var termBytes = bytes.splice(0, term.length);
            if (term.name) {
                values[term.name] = term.decode(termBytes);
            }
        });
        return values;
    };
    return Sentence;
}());
exports.default = Sentence;
//# sourceMappingURL=Sentence.js.map