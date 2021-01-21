export abstract class Transcoder {
  length: number

  constructor(length: number) {
    this.length = length
  }

  abstract encode(input: any): number[]

  abstract decode(bytes: number[]): any
}

export type SentenceFormat = {
  sentence: string[]
  defaults?: Record<string, number[]>
  transcoders?: Record<string, typeof Transcoder>
}
