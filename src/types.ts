export type Encoder = 'constant' | 'byte' | 'ascii'

export type SegmentFormat = {
  name: string
  length: number
  encoder?: Encoder | ((value?: any) => number[])
  default?: number | number[]
}

export type LiteralSegment = number[]

export type MessageFormat = {
  name: string
  segments: (SegmentFormat | LiteralSegment)[]
}

export type Transcoder = {
  encode(input: any): number[]
  decode(bytes: number[]): any
}

export type SentenceFormat = {
  sentence: string[]
  defaults?: Record<string, number[]>
  transcoders?: Record<string, Transcoder>
}
