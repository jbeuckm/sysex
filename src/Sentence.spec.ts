import Sentence from './Sentence'
import { Options } from './transcoders'
import TEST_FORMAT from './fixtures/sentenceFormat'

describe('Sentence', () => {
  test('parse string format', () => {
    const sentence = new Sentence('43 deviceId 00')

    expect(sentence.encode()).toEqual([0x43, 0x00, 0x00])
    expect(sentence.encode({ deviceId: 1 })).toEqual([0x43, 0x01, 0x00])
  })

  test('with defaults', () => {
    const sentence = new Sentence({
      sentence: ['12 paramValue 34'],
      defaults: {
        paramValue: [0x55],
      },
    })

    expect(sentence.encode()).toEqual([0x12, 0x55, 0x34])
    expect(sentence.encode({ paramValue: 1 })).toEqual([0x12, 0x01, 0x34])
  })

  test('parse parametrized format', () => {
    const sentence = new Sentence(TEST_FORMAT)

    // @todo test a string with length < term.length
    const bytes = sentence.encode({ name: 'testcase' })
    const values = sentence.decode(bytes)

    expect(values.name).toEqual('testcase')
  })

  test('transcode an Options term', () => {
    const sentence = new Sentence({
      sentence: ['loopType'],
      transcoders: {
        loopType: Options.withOptions({
          forward: [0x00],
          'backward/forward': [0x01],
          none: [0x7f],
        }),
      },
    })

    expect(sentence.encode({ loopType: 'forward' })).toEqual([0x00])
    expect(sentence.encode({ loopType: 'backward/forward' })).toEqual([0x01])
    expect(sentence.encode({ loopType: 'none' })).toEqual([0x7f])
    expect(() => sentence.encode({ loopType: '💥' })).toThrow()

    expect(sentence.decode([0x00])).toEqual({ loopType: 'forward' })
    expect(sentence.decode([0x01])).toEqual({ loopType: 'backward/forward' })
    expect(sentence.decode([0x7f])).toEqual({ loopType: 'none' })
    expect(() => sentence.decode([0x02])).toThrow()
  })
})
