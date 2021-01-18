import Sentence from './Sentence'
import TEST_FORMAT from './fixtures/sentenceFormat'

describe('Sentence', () => {
  test('parse sentence format', () => {
    const sentence = new Sentence(TEST_FORMAT)
    console.log(sentence)
  })
})
