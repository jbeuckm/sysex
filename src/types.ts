import { Transcoder } from './transcoders'

export type SentenceFormat = {
  sentence: string[]
  defaults?: Record<string, number[]>
  transcoders?: Record<string, typeof Transcoder>
}
