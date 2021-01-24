"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Term_1 = __importDefault(require("./Term"));
describe('Term', function () {
    test('parse constant term', function () {
        var term = new Term_1.default('43');
        expect(term.encode()).toEqual([0x43]);
        expect(term.encode({ deviceId: 1 })).toEqual([0x43]);
    });
    test('parse parametrized term', function () {
        var term = new Term_1.default('deviceId');
        expect(term.encode()).toEqual([0x00]);
        expect(term.encode({ deviceId: 3 })).toEqual([0x03]);
    });
    test('encode parametrized term with length', function () {
        var term = new Term_1.default('value[3]', { sentence: [], defaults: { value: [0x01, 0x02, 0x03] } });
        expect(term.encode()).toEqual([0x01, 0x02, 0x03]);
        expect(term.encode({ value: 3 })).toEqual([0x00, 0x00, 0x03]);
    });
    test('encode constant term with length', function () {
        var term = new Term_1.default('00[5]', '');
        expect(term.encode()).toEqual([0, 0, 0, 0, 0]);
    });
    test('decode wrong number of bytes', function () {
        var term = new Term_1.default('value[3]', '');
        expect(function () { return term.decode([0]); }).toThrow();
        expect(function () { return term.decode([0, 1, 2, 3]); }).toThrow();
        expect(function () { return term.decode([0, 1, 2]); }).not.toThrow();
    });
    test('shortcode for Ascii transcoder', function () {
        var term = new Term_1.default('name[4]*', '');
        expect(term.encode({ name: 'bass' })).toEqual([0x62, 0x61, 0x73, 0x73]);
    });
    test('shortcode for MostToLeast transcoder', function () {
        var term = new Term_1.default('freq[2]\\', '');
        expect(term.encode({ freq: 0xff })).toEqual([0x01, 0x7f]);
    });
    test('shortcode for LeastToMost transcoder', function () {
        var term = new Term_1.default('freq[2]/', '');
        expect(term.encode({ freq: 0xff })).toEqual([0x7f, 0x01]);
    });
});
//# sourceMappingURL=Term.spec.js.map