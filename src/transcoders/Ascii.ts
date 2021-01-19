import { Transcoder } from '../types'

/*
 * Transcode a number as 7bit chunks right justified
 */
class Ascii implements Transcoder {
  length: number

  constructor(length: number) {
    this.length = length
  }

  encode(value?: string): number[] {
    if (!value) {
      return Array(this.length).fill(0)
    }

    const bytes = []

    const valueLength = Math.min(value.length, this.length)
    for (let i = 0; i < valueLength; i++) {
      bytes.push(value.charCodeAt(i))
    }

    while (bytes.length < this.length) {
      bytes.push(0)
    }

    return bytes
  }

  decode(bytes: number[]): string {
    if (bytes.length !== this.length) {
      throw `Decoder[${this.length}] called with ${bytes.length} bytes.`
    }

    return bytes.map(byte => String.fromCharCode(byte)).join('')
  }
}

export default Ascii
