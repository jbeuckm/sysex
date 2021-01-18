"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Sentence_1 = __importDefault(require("./Sentence"));
var sentenceFormat_1 = __importDefault(require("./fixtures/sentenceFormat"));
describe('Sentence', function () {
    test('parse string format', function () {
        var sentence = new Sentence_1.default('43 deviceId 00');
        expect(sentence.encode()).toEqual([0x43, 0x00, 0x00]);
        expect(sentence.encode({ deviceId: 1 })).toEqual([0x43, 0x01, 0x00]);
    });
    test('with defaults', function () {
        var sentence = new Sentence_1.default({
            sentence: ['12 paramValue 34'],
            defaults: {
                paramValue: [0x55],
            },
        });
        expect(sentence.encode()).toEqual([0x12, 0x55, 0x34]);
        expect(sentence.encode({ paramValue: 1 })).toEqual([0x12, 0x01, 0x34]);
    });
    test('parse parametrized format', function () {
        var sentence = new Sentence_1.default(sentenceFormat_1.default);
        // console.log(sentence)
    });
});
//# sourceMappingURL=Sentence.spec.js.map