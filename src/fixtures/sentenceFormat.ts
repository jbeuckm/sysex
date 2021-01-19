import { SentenceFormat } from '../types'
import Ascii from '../transcoders/Ascii'

const format: SentenceFormat = {
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
    name: new Ascii(8),
  },
}

export default format
