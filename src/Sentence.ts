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

  encode(params?: Record<string, number | string>): number[] {
    const bytes: number[] = []
    this.terms.forEach(term => {
      bytes.push(...term.encode(params))
    })

    return bytes
  }

  decode(bytes: number[]): Record<string, number | string> {
    const values: Record<string, number | string> = {}

    this.terms.forEach(term => {
      const termBytes = bytes.splice(0, term.length)

      if (term.name) {
        values[term.name] = term.decode(termBytes)
      }
    })

    return values
  }
}

export default Sentence
