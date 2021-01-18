import Sentence from './Sentence'
import TEST_FORMAT from './fixtures/sentenceFormat'

describe('Sentence', () => {
  test('parse string format', () => {
    const sentence = new Sentence('42 device 00')
    console.log(sentence)
  })

  test('parse parametrized format', () => {
    const sentence = new Sentence(TEST_FORMAT)
    console.log(sentence)
  })
})
