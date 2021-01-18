import { SentenceFormat } from './types'
import Term from './Term'

class Sentence {
  terms: string[]

  constructor(format: strring | SentenceFormat) {
    let fullTerms

    if (typeof format === 'string') {
      fullTerms = format
    } else {
      fullTerms = format.sentence.join(' ')
    }

    this.terms = fullTerms
      .split(' ')
      .filter(term => term !== '')
      .map(term => new Term(term, format))
  }

  encode(params: Record<string, any>) {}
  decode(bytes: number[]) {}
}

export default Sentence
