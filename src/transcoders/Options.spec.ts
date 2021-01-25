import { Options } from './Options'

describe('Options Transcoder', () => {
  test('encode one byte', () => {
    const i = new Options(1, { a: [0x01] })

    expect(i.encode('a')).toEqual([0x01])
    expect(() => i.encode('b')).toThrow()
  })

  test('decode one byte', () => {
    const i = new Options(1, { a: [0x01] })

    expect(i.decode([0x01])).toEqual('a')
    expect(() => i.decode([0x00])).toThrow()
  })
})
