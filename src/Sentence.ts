import { SentenceFormat } from './types'
import Term from './Term'

class Sentence {
  terms: Term[]

  constructor(format: string | SentenceFormat) {
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

  encode(params?: Record<string, any>) {
    const bytes: number[] = []
    this.terms.forEach(term => {
      bytes.push(...term.encode(params))
    })

    return bytes
  }

  decode(bytes: number[]) {}
}

export default Sentence
