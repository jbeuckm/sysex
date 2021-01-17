import { Encoding, SegmentFormat, MessageFormat } from './types'
import Segment from './Segment'

type Values = Record<string, number>

class Sysex {
  name: string
  segments: Segment[]

  constructor(format: MessageFormat) {
    this.name = name
    this.segments = format.segments.map(format => new Segment(format))
  }

  encode(values: Values = {}): number[] {
    const bytes: number[] = []

    this.segments.forEach(segment => {
      const segmentBytes = segment.encode(values[segment.format.name])

      segmentBytes.forEach(byte => bytes.push(byte))
    })

    return bytes
  }

  parse(bytes: number[]) {}
}

export default Sysex
