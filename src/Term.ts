import { SentenceFormat } from './types'

const LENGTH_REGEX = /\[(\d+)\]$/
const BYTE_REGEX = /^[0-9a-f]{2}$/

class Term {
  name?: string
  length: number
  constant?: number
  default?: number[]

  extractLength(term: string) {
    const length = term.match(LENGTH_REGEX)

    if (length && length[1]) {
      this.length = Number(length[1])
      return term.replace(LENGTH_REGEX, '')
    } else {
      this.length = 1
      return term
    }
  }

  constructor(term: string, format: SentenceFormat) {
    const core = this.extractLength(term)

    if (core.match(BYTE_REGEX)) {
      this.constant = parseInt(core, 16)
    } else {
      this.name = core
      this.default = format.defaults && format.defaults[this.name]
    }

    console.log({ term })
  }
}

export default Term
