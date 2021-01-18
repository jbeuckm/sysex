import { SentenceFormat } from './types'

class Sentence {
  terms: string[]

  constructor(format: SentenceFormat) {
    this.terms = format.sentence.join(' ').split(' ')
  }
}

export default Sentence
