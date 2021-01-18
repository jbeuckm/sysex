import { SentenceFormat, Transcoder } from './types'
import Identity from './transcoders/Identity'

const LENGTH_REGEX = /\[(\d+)\]$/
const BYTE_REGEX = /^[0-9a-f]{2}$/

class Term {
  term: string
  name?: string
  length: number = 1
  constant?: number
  default?: number[]
  transcoder: Transcoder

  constructor(term: string, format?: string | SentenceFormat) {
    this.term = term

    const root = this.extractLength(term)
    this.transcoder = new Identity(this.length)

    if (root.match(BYTE_REGEX)) {
      this.constant = parseInt(root, 16)
      return
    }

    this.name = root
    if (typeof format === 'object') {
      this.default = format.defaults && format.defaults[this.name]

      const transcoder = format.transcoders && format.transcoders[this.name]
      if (transcoder) {
        this.transcoder = transcoder
      }
    }
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

  encode(params?: Record<string, any>): number[] {
    if (typeof this.constant !== 'undefined') {
      return [this.constant]
    }

    if (this.name) {
      const param = params && params[this.name]

      if (param) {
        return this.transcoder.encode(param)
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

    return this.transcoder.decode(bytes)
  }
}

export default Term
