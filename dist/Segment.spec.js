"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Segment_1 = __importDefault(require("./Segment"));
var types_1 = require("./types");
describe('Segment', function () {
    test('encodes a constant segment', function () {
        var segment = new Segment_1.default({
            name: 'test',
            encoding: types_1.Encoding.CONSTANT,
            length: 3,
            default: [0x01, 0x02, 0x03],
        });
        expect(segment.encode()).toEqual([0x01, 0x02, 0x03]);
    });
    test('uses a single default value as fill', function () {
        var segment = new Segment_1.default({
            name: 'test',
            encoding: types_1.Encoding.CONSTANT,
            length: 3,
            default: 0x11,
        });
        expect(segment.encode()).toEqual([0x11, 0x11, 0x11]);
    });
    test('encodes a byte segment', function () {
        var segment = new Segment_1.default({
            name: 'test',
            encoding: types_1.Encoding.BYTE,
            length: 1,
            default: 0x11,
        });
        expect(segment.encode()).toEqual([0x11]);
        expect(segment.encode(0x55)).toEqual([0x55]);
    });
    test('encodes an ascii segment', function () {
        var segment = new Segment_1.default({
            name: 'test',
            encoding: types_1.Encoding.ASCII,
            length: 8,
            default: 0x08,
        });
        expect(segment.encode()).toEqual([0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08]);
        expect(segment.encode('bass drums')).toEqual([0x62, 0x61, 0x73, 0x73, 0x20, 0x64, 0x72, 0x75]);
        expect(segment.encode('bass')).toEqual([0x62, 0x61, 0x73, 0x73, 0x08, 0x08, 0x08, 0x08]);
    });
});
//# sourceMappingURL=Segment.spec.js.map