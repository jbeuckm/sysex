export type Transcoder = {
  encode(input: any): number[]
  decode(bytes: number[]): any
}

export type SentenceFormat = {
  sentence: string[]
  defaults?: Record<string, number[]>
  transcoders?: Record<string, Transcoder>
}
