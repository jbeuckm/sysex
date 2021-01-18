export type Encoder = 'constant' | 'byte' | 'ascii'

export type SegmentFormat = {
  name: string
  length: number
  encoder?: Encoder | ((value?: any) => number[])
  default?: number | number[]
}

export type MessageFormat = {
  name: string
  segments: SegmentFormat[]
}
