"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __importDefault(require("./index"));
var types_1 = require("./types");
describe('Sysex', function () {
    test('encodes a constant message', function () {
        var sysex = new index_1.default({
            name: 'test',
            segments: [
                { name: 'test', encoding: types_1.Encoding.CONSTANT, length: 3, default: [0x01, 0x02, 0x03] },
            ],
        });
        expect(sysex.encode()).toEqual([0x01, 0x02, 0x03]);
    });
    test('encodes multiple segments', function () {
        var sysex = new index_1.default({
            name: 'test',
            segments: [
                { name: 'test', encoding: types_1.Encoding.CONSTANT, length: 1, default: [0x01] },
                { name: 'test2', encoding: types_1.Encoding.CONSTANT, length: 2, default: [0x02, 0x03] },
                { name: 'test3', encoding: types_1.Encoding.CONSTANT, length: 3, default: [0x04, 0x05, 0x06] },
            ],
        });
        expect(sysex.encode()).toEqual([0x01, 0x02, 0x03, 0x04, 0x05, 0x06]);
    });
});
//# sourceMappingURL=index.spec.js.map