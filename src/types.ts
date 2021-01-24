export class Transcoder {
  length: number

  constructor(length: number) {
    this.length = length
  }

  encode(input?: number | string): number[] {
    return []
  }

  decode(bytes: number[]): number | string {
    return 0
  }
}

export type SentenceFormat = {
  sentence: string[]
  defaults?: Record<string, number[]>
  transcoders?: Record<string, typeof Transcoder>
}
