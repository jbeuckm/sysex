import { Ascii } from './Ascii'

const ASCII_A = 'a'.charCodeAt(0)
const ASCII_B = 'b'.charCodeAt(0)

describe('Ascii Transcoder', () => {
  test('encode one byte', () => {
    const tr = new Ascii(1)

    expect(tr.encode()).toEqual([0])
    expect(tr.encode('a')).toEqual([ASCII_A])
  })

  test('encode two bytes', () => {
    const tr = new Ascii(2)

    expect(tr.encode('ab')).toEqual([ASCII_A, ASCII_B])
  })

  test('decode one byte', () => {
    const tr = new Ascii(1)

    expect(tr.decode([ASCII_A])).toEqual('a')
  })

  test('decode two bytes', () => {
    const tr = new Ascii(2)

    expect(tr.decode([ASCII_A, ASCII_B])).toEqual('ab')
  })

  test('encode shorter string than spec length', () => {
    const tr = new Ascii(4)

    expect(tr.encode('ab')).toEqual([ASCII_A, ASCII_B, 0, 0])
  })
})
