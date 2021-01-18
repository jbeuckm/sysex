import Segment from './Segment'
import { Encoder } from './types'

describe('Segment', () => {
  test('encodes a literal segment', () => {
    const segment = new Segment([0x01, 0x02, 0x03])

    expect(segment.encode()).toEqual([0x01, 0x02, 0x03])
  })

  test('encodes a constant segment', () => {
    const segment = new Segment({
      name: 'test',
      encoder: 'constant',
      length: 3,
      default: [0x01, 0x02, 0x03],
    })

    expect(segment.encode()).toEqual([0x01, 0x02, 0x03])
  })

  test('uses a single default value as fill', () => {
    const segment = new Segment({
      name: 'test',
      encoder: 'constant',
      length: 3,
      default: 0x11,
    })

    expect(segment.encode()).toEqual([0x11, 0x11, 0x11])
  })

  test('encodes a byte segment', () => {
    const segment = new Segment({
      name: 'test',
      encoder: 'byte',
      length: 1,
      default: 0x11,
    })

    expect(segment.encode()).toEqual([0x11])
    expect(segment.encode(0x55)).toEqual([0x55])
  })

  test('encodes an ascii segment', () => {
    const segment = new Segment({
      name: 'test',
      encoder: 'ascii',
      length: 8,
      default: 0x08,
    })

    expect(segment.encode()).toEqual([0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08, 0x08])
    expect(segment.encode('bass drums')).toEqual([0x62, 0x61, 0x73, 0x73, 0x20, 0x64, 0x72, 0x75])
    expect(segment.encode('bass')).toEqual([0x62, 0x61, 0x73, 0x73, 0x08, 0x08, 0x08, 0x08])
  })

  test('encodes with custom function', () => {
    const segment = new Segment({
      name: 'test',
      encoder: (value?: number) => {
        const addend = value || 0
        return [0x76 + addend, 0x77 + addend]
      },
      length: 2,
    })

    expect(segment.encode()).toEqual([0x76, 0x77])
    expect(segment.encode(1)).toEqual([0x77, 0x78])
  })
})
