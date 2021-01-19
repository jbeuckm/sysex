"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Ascii_1 = __importDefault(require("./Ascii"));
describe('Ascii Transcoder', function () {
    test('encode one byte', function () {
        var i = new Ascii_1.default(1);
        expect(i.encode()).toEqual([0]);
        expect(i.encode('a')).toEqual(['a'.charCodeAt(0)]);
    });
    test('encode two bytes', function () {
        var i = new Ascii_1.default(2);
        expect(i.encode('ab')).toEqual(['a'.charCodeAt(0), 'b'.charCodeAt(0)]);
    });
    test('decode one byte', function () {
        var i = new Ascii_1.default(1);
        expect(i.decode(['a'.charCodeAt(0)])).toEqual('a');
    });
    test('decode two bytes', function () {
        var i = new Ascii_1.default(2);
        expect(i.decode(['a'.charCodeAt(0), 'b'.charCodeAt(0)])).toEqual('ab');
    });
    test('encode shorter string than spec length', function () {
        var i = new Ascii_1.default(4);
        expect(i.encode('ab')).toEqual(['a'.charCodeAt(0), 'b'.charCodeAt(0), 0, 0]);
    });
});
//# sourceMappingURL=Ascii.spec.js.map