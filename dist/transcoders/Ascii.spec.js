"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ascii_1 = require("./Ascii");
var ASCII_A = 'a'.charCodeAt(0);
var ASCII_B = 'b'.charCodeAt(0);
describe('Ascii Transcoder', function () {
    test('encode one byte', function () {
        var tr = new Ascii_1.Ascii(1);
        expect(tr.encode()).toEqual([0]);
        expect(tr.encode('a')).toEqual([ASCII_A]);
    });
    test('encode two bytes', function () {
        var tr = new Ascii_1.Ascii(2);
        expect(tr.encode('ab')).toEqual([ASCII_A, ASCII_B]);
    });
    test('decode one byte', function () {
        var tr = new Ascii_1.Ascii(1);
        expect(tr.decode([ASCII_A])).toEqual('a');
    });
    test('decode two bytes', function () {
        var tr = new Ascii_1.Ascii(2);
        expect(tr.decode([ASCII_A, ASCII_B])).toEqual('ab');
    });
    test('encode shorter string than spec length', function () {
        var tr = new Ascii_1.Ascii(4);
        expect(tr.encode('ab')).toEqual([ASCII_A, ASCII_B, 0, 0]);
    });
});
//# sourceMappingURL=Ascii.spec.js.map