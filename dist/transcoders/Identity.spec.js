"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Identity_1 = __importDefault(require("./Identity"));
describe('Identity Transcoder', function () {
    test('encode one byte', function () {
        var i = new Identity_1.default(1);
        expect(i.encode()).toEqual([0]);
        expect(i.encode(1)).toEqual([0x01]);
        expect(function () { return i.encode(0xff); }).toThrow();
    });
    test('encode two bytes', function () {
        var i = new Identity_1.default(2);
        expect(i.encode(0xff)).toEqual([0x01, 0x7f]);
        expect(function () { return i.encode(0xffff); }).toThrow();
    });
    test('decode one byte', function () {
        var i = new Identity_1.default(1);
        expect(i.decode([0x00])).toEqual(0);
        expect(i.decode([0x01])).toEqual(1);
        expect(i.decode([0x7f])).toEqual(0x7f);
    });
    test('decode two bytes', function () {
        var i = new Identity_1.default(2);
        expect(function () { return i.decode([0x00]); }).toThrow();
        expect(i.decode([0x00, 0x01])).toEqual(1);
        expect(i.decode([0x01, 0x7f])).toEqual(0xff);
        expect(i.decode([0x7f, 0x7f])).toEqual(0x3fff);
    });
});
//# sourceMappingURL=Identity.spec.js.map