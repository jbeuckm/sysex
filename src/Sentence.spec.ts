import Sentence from './Sentence'
import TEST_FORMAT from './fixtures/sentenceFormat'

describe('Sentence', () => {
  test('parse string format', () => {
    const sentence = new Sentence('43 deviceId 00')

    expect(sentence.encode()).toEqual([0x43, 0x00, 0x00])
    expect(sentence.encode({ deviceId: 1 })).toEqual([0x43, 0x01, 0x00])
  })

  test('parse parametrized format', () => {
    const sentence = new Sentence(TEST_FORMAT)
    // console.log(sentence)
  })
})
