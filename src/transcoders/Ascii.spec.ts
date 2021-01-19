import Ascii from './Ascii'

describe('Ascii Transcoder', () => {
  test('encode one byte', () => {
    const i = new Ascii(1)

    expect(i.encode()).toEqual([0])
    expect(i.encode('a')).toEqual(['a'.charCodeAt(0)])
  })

  test('encode two bytes', () => {
    const i = new Ascii(2)

    expect(i.encode('ab')).toEqual(['a'.charCodeAt(0), 'b'.charCodeAt(0)])
  })

  test('decode one byte', () => {
    const i = new Ascii(1)

    expect(i.decode(['a'.charCodeAt(0)])).toEqual('a')
  })

  test('decode two bytes', () => {
    const i = new Ascii(2)

    expect(i.decode(['a'.charCodeAt(0), 'b'.charCodeAt(0)])).toEqual('ab')
  })

  test('encode shorter string than spec length', () => {
    const i = new Ascii(4)

    expect(i.encode('ab')).toEqual(['a'.charCodeAt(0), 'b'.charCodeAt(0), 0, 0])
  })
})
