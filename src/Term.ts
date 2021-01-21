import { SentenceFormat, Transcoder } from './types'
import MostToLeast from './transcoders/MostToLeast'

const LENGTH_REGEX = /\[(\d+)\]$/
const BYTE_REGEX = /^[0-9a-f]{2}$/

class Term {
  term: string
  name?: string
  length: number = 1
  constant?: number
  default?: number[]
  Transcoder: typeof Transcoder

  constructor(term: string, format?: string | SentenceFormat) {
    this.term = term

    this.Transcoder = this.extractTranscoder(term)
    const root = this.extractLength(term)

    if (root.match(BYTE_REGEX)) {
      this.constant = parseInt(root, 16)
      return
    }

    this.name = root
    if (typeof format === 'object') {
      this.default = format.defaults && format.defaults[this.name]

      const transcoder = format.transcoders && format.transcoders[this.name]
      if (transcoder) {
        this.Transcoder = transcoder
      }
    }
  }

  extractTranscoder(term: string) {
    return MostToLeast
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
    const transcoder = new this.Transcoder(this.length)

    if (typeof this.constant !== 'undefined') {
      return Array(this.length).fill(this.constant)
    }

    if (this.name && params && typeof params[this.name] !== 'undefined') {
      return transcoder.encode(params[this.name])
    }

    if (this.default) {
      return this.default
    }

    return Array(this.length).fill(0)
  }

  decode(bytes: number[]) {
    const transcoder = new this.Transcoder(this.length)

    return transcoder.decode(bytes)
  }
}

export default Term
