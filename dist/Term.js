"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transcoders_1 = require("./transcoders");
var LENGTH_REGEX = /\[(\d+)\]$/;
var BYTE_REGEX = /^[0-9a-f]{2}$/;
var transcoders = [
    { suffix: '*', transcoder: transcoders_1.Ascii },
    { suffix: '/', transcoder: transcoders_1.LeastToMost },
    { suffix: '\\', transcoder: transcoders_1.MostToLeast },
];
var escape = function (char) { return char.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); };
var Term = /** @class */ (function () {
    function Term(term, format) {
        this.length = 1;
        this.term = term;
        var root = this.extractTranscoder(term);
        root = this.extractLength(root);
        if (root.match(BYTE_REGEX)) {
            this.constant = parseInt(root, 16);
            return;
        }
        this.name = root;
        if (typeof format === 'object') {
            this.default = format.defaults && format.defaults[this.name];
            var transcoder = format.transcoders && format.transcoders[this.name];
            if (transcoder) {
                this.Transcoder = transcoder;
            }
        }
    }
    Term.prototype.extractTranscoder = function (term) {
        for (var i = 0; i < transcoders.length; i++) {
            var transcoder = transcoders[i];
            var suffixRegex = new RegExp(escape(transcoder.suffix) + "$");
            if (term.match(suffixRegex)) {
                this.Transcoder = transcoder.transcoder;
                return term.replace(suffixRegex, '');
            }
        }
        this.Transcoder = transcoders_1.MostToLeast;
        return term;
    };
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
        var transcoder = new this.Transcoder(this.length);
        if (typeof this.constant !== 'undefined') {
            return Array(this.length).fill(this.constant);
        }
        if (this.name && params && typeof params[this.name] !== 'undefined') {
            return transcoder.encode(params[this.name]);
        }
        if (this.default) {
            return this.default;
        }
        return Array(this.length).fill(0);
    };
    Term.prototype.decode = function (bytes) {
        var transcoder = new this.Transcoder(this.length);
        return transcoder.decode(bytes);
    };
    return Term;
}());
exports.default = Term;
//# sourceMappingURL=Term.js.map