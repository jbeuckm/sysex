import { SentenceFormat } from './types'

const LENGTH_REGEX = /\[(\d+)\]$/
const BYTE_REGEX = /^[0-9a-f]{2}$/

class Term {
  term: string
  name?: string
  length: number = 1
  constant?: number
  default?: number[]
  encoder(value: number): number[] {
    return [value]
  }

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

  constructor(term: string, format?: string | SentenceFormat) {
    this.term = term

    const core = this.extractLength(term)

    if (core.match(BYTE_REGEX)) {
      this.constant = parseInt(core, 16)
    } else {
      this.name = core
      if (typeof format === 'object') {
        this.default = format.defaults && format.defaults[this.name]
      }
    }
  }

  encode(params?: Record<string, any>): number[] {
    if (typeof this.constant !== 'undefined') {
      return [this.constant]
    }

    if (this.name) {
      const param = params && params[this.name]

      if (param) {
        return this.encoder(param)
      }

      if (this.default) {
        return this.default
      }
    }

    return Array(this.length).fill(0)
  }

  decode(bytes: number[]) {
    if (bytes.length !== this.length) {
      throw `Invalid input: ${bytes.map(b => b.toString(16)).join(',')}. Term "${
        this.term
      }" can only decode ${this.length} bytes.`
    }
  }
}

export default Term
