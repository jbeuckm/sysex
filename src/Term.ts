import { SentenceFormat, Transcoder } from './types'
import { Ascii, LeastToMost, MostToLeast } from './transcoders'

const LENGTH_REGEX = /\[(\d+)\]$/
const BYTE_REGEX = /^[0-9a-f]{2}$/

const transcoders = [
  { suffix: '*', transcoder: Ascii },
  { suffix: '/', transcoder: LeastToMost },
  { suffix: '\\', transcoder: MostToLeast },
]

const escape = (char: string) => char.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

class Term {
  term: string
  name?: string
  length: number = 1
  constant?: number
  default?: number[]
  Transcoder!: typeof Transcoder

  constructor(term: string, format?: string | SentenceFormat) {
    this.term = term

    let root = this.extractTranscoder(term)
    root = this.extractLength(root)

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
    for (let i = 0; i < transcoders.length; i++) {
      const transcoder = transcoders[i]

      const suffixRegex = new RegExp(`${escape(transcoder.suffix)}$`)

      if (term.match(suffixRegex)) {
        this.Transcoder = transcoder.transcoder
        return term.replace(suffixRegex, '')
      }
    }

    this.Transcoder = MostToLeast
    return term
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
