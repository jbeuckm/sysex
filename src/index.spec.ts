import Sysex from './index'
import { Encoding } from './types'

describe('Sysex', () => {
  test('encodes a constant message', () => {
    const sysex = new Sysex({
      name: 'test',
      segments: [
        { name: 'test', encoding: Encoding.CONSTANT, length: 3, default: [0x01, 0x02, 0x03] },
      ],
    })

    expect(sysex.encode()).toEqual([0x01, 0x02, 0x03])
  })
})
