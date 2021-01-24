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
