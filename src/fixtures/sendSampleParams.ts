import { MessageFormat } from '../types'

const format: MessageFormat = {
  name: 'sendSampleParams',
  segments: [
    [0x43, 0x00, 0x7a],
    [0x00, 0x32],
    [0x4c, 0x4d, 0x20, 0x20, 0x30, 0x30, 0x34, 0x30, 0x53, 0x41],

    { name: 'zeroBody', length: 15, default: [0x00] },
    { name: 'sampleNumber', length: 1, encoder: 'byte', default: 0x00 },
    { name: 'sampleName', length: 8, encoder: 'ascii', default: 0x00 },
    { name: 'hiKeyCode', length: 4, default: [0x00, 0x2a, 0x00, 0x00] },
    { name: 'originalKey', length: 1, default: 0x3c },
    { name: 'pitchCode', length: 4, default: [0x00, 0x14, 0x00, 0x28] },
    { name: 'loopMode', length: 1, encoder: 'byte', default: 0x00 },
    { name: 'volCode', length: 2, default: [0x00, 0x00] },
    { name: 'lowKeyCode', length: 4, default: [0x00, 0x00, 0x00, 0x00] },
  ],
}

export default format
