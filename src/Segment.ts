import { Encoder, SegmentFormat } from './types'

class Segment {
  format: SegmentFormat

  constructor(format: SegmentFormat) {
    this.format = format
  }

  getDefaultBytes(): number[] {
    if (typeof this.format.default === 'number') {
      return Array(this.format.length).fill(this.format.default)
    }

    return this.format.default || Array(this.format.length).fill(0x00)
  }

  encode(value?: number | string): number[] {
    if (typeof this.format.encoder === 'function') {
      return this.format.encoder(value)
    }

    switch (this.format.encoder) {
      case 'byte':
        if (value !== undefined) {
          return [Number(value)]
        } else {
          return [this.format.default as number]
        }
        break

      case 'ascii': {
        const bytes = this.getDefaultBytes()
        if (typeof value === 'string') {
          for (let i = 0; i < this.format.length; i++) {
            const charCode = value.charCodeAt(i)
            if (!isNaN(charCode)) {
              bytes[i] = charCode
            }
          }
        }
        return bytes
        break
      }

      case 'constant':
      default:
        return this.getDefaultBytes()
        break
    }
  }

  decode(bytes: number[]) {
    return 0
  }
}

export default Segment
