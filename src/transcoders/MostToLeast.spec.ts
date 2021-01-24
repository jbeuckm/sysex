import { MostToLeast } from './MostToLeast'

describe('MostToLeast Transcoder', () => {
  test('encode one byte', () => {
    const i = new MostToLeast(1)

    expect(i.encode()).toEqual([0])
    expect(i.encode(1)).toEqual([0x01])
    expect(() => i.encode(0xff)).toThrow()
  })

  test('encode two bytes', () => {
    const i = new MostToLeast(2)

    expect(i.encode(0xff)).toEqual([0x01, 0x7f])
    expect(() => i.encode(0xffff)).toThrow()
  })

  test('decode one byte', () => {
    const i = new MostToLeast(1)

    expect(i.decode([0x00])).toEqual(0)
    expect(i.decode([0x01])).toEqual(1)
    expect(i.decode([0x7f])).toEqual(0x7f)
  })

  test('decode two bytes', () => {
    const i = new MostToLeast(2)

    expect(() => i.decode([0x00])).toThrow()
    expect(i.decode([0x00, 0x01])).toEqual(1)
    expect(i.decode([0x01, 0x7f])).toEqual(0xff)
    expect(i.decode([0x7f, 0x7f])).toEqual(0x3fff)
  })
})
