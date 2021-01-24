import { Transcoder } from '../types'

/*
 * Most to least significat 7bit chunks
 */
class MostToLeast extends Transcoder {
  encode(value?: number): number[] {
    const bytes = []

    let acc = value || 0
    while (acc > 0) {
      bytes.unshift(acc & 0x7f)
      acc >>>= 7
    }

    if (bytes.length > this.length) {
      throw `Value "${value}" too large to fit in ${this.length} bytes.`
    }

    while (bytes.length < this.length) {
      bytes.unshift(0)
    }

    return bytes
  }

  decode(bytes: number[]): number {
    if (bytes.length !== this.length) {
      throw `Decoder[${this.length}] called with ${bytes.length} bytes.`
    }

    let value = 0

    bytes.forEach((byte: number) => {
      value = (value << 7) | byte
    })

    return value
  }
}

export default MostToLeast
