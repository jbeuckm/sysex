"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Ascii_1 = __importDefault(require("../transcoders/Ascii"));
var format = {
    sentence: [
        '43 device 7a 00 32',
        '4c 4d 20 20 30 30 34 30 53 41 00[15] sampleNumber name[8]',
        'hiKey[4] originalKey pitchCode[4] loopMode volCode[2] lowKey[4]',
    ],
    defaults: {
        hiKey: [0x00, 0x2a, 0x00, 0x00],
        originalKey: [0x3c],
        pitchCode: [0x00, 0x14, 0x00, 0x28],
        volCode: [0x00, 0x00],
        lowKey: [0x00, 0x00, 0x00, 0x00],
    },
    transcoders: {
        name: Ascii_1.default,
    },
};
exports.default = format;
//# sourceMappingURL=sentenceFormat.js.map