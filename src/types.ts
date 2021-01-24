export class Transcoder {
  length: number

  constructor(length: number) {
    this.length = length
  }

  encode(input: any): number[] {
    return []
  }

  decode(bytes: number[]): any {}
}

export type SentenceFormat = {
  sentence: string[]
  defaults?: Record<string, number[]>
  transcoders?: Record<string, typeof Transcoder>
}
