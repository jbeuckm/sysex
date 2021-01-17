export enum Encoding {
  CONSTANT = 'constant',
}

export type SegmentFormat = {
  name: string
  length: number
  encoding: Encoding
  default?: number[]
}

export type MessageFormat = {
  name: string
  segments: SegmentFormat[]
}
