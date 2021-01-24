export class Transcoder {
  length: number

  constructor(length: number) {
    this.length = length
  }

  encode(input: any): number[] {
    return []
  }

  decode(bytes: number[]): any {
    return 0
  }
}

export type SentenceFormat = {
  sentence: string[]
  defaults?: Record<string, number[]>
  transcoders?: Record<string, typeof Transcoder>
}
