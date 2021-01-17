import { Encoding, SegmentFormat } from './types'

class Segment {
  format: SegmentFormat

  constructor(format: SegmentFormat) {
    this.format = format
  }

  encode(values: Values) {
    return this.format.default
  }

  decode(bytes: number[]) {
    return 0
  }
}

export default Segment
