import Sysex from './index'
import { Encoder, MessageFormat } from './types'

import sendSampleParams from './fixtures/sendSampleParams'

describe('Sysex', () => {
  test('encodes a constant message', () => {
    const sysex = new Sysex({
      name: 'test',
      segments: [{ name: 'test', encoder: 'constant', length: 3, default: [0x01, 0x02, 0x03] }],
    })

    expect(sysex.encode()).toEqual([0x01, 0x02, 0x03])
  })

  test('encodes multiple segments', () => {
    const sysex = new Sysex({
      name: 'test',
      segments: [
        { name: 'test', encoder: 'constant', length: 1, default: [0x01] },
        { name: 'test2', encoder: 'constant', length: 2, default: [0x02, 0x03] },
        { name: 'test3', encoder: 'constant', length: 3, default: [0x04, 0x05, 0x06] },
      ],
    })

    expect(sysex.encode()).toEqual([0x01, 0x02, 0x03, 0x04, 0x05, 0x06])
  })

  test('encodes sy99 sample params dump', () => {
    const sysex = new Sysex(sendSampleParams as MessageFormat)
  })
})
