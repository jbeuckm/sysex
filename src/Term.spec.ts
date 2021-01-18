import Term from './Term'

describe('Term', () => {
  test('parse constant term', () => {
    const term = new Term('43')

    expect(term.encode()).toEqual([0x43])
    expect(term.encode({ deviceId: 1 })).toEqual([0x43])
  })

  test('parse parametrized term', () => {
    const term = new Term('deviceId')

    expect(term.encode()).toEqual([0x00])
    expect(term.encode({ deviceId: 3 })).toEqual([0x03])
  })

  test('parse parametrized term with length', () => {
    const term = new Term('value[3]', { sentence: [], defaults: { value: [0x01, 0x02, 0x03] } })

    expect(term.encode()).toEqual([0x01, 0x02, 0x03])
    // expect(term.encode({ value: 3 })).toEqual([0x00, 0x00, 0x03])
  })

  test('decode wrong number of bytes', () => {
    const term = new Term('value[3]', '')

    expect(() => term.decode([0])).toThrow()
    expect(() => term.decode([0, 1, 2, 3])).toThrow()
    expect(() => term.decode([0, 1, 2])).not.toThrow()
  })
})
