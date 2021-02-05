import { Transcoder } from './Transcoder'

export class Options extends Transcoder {
  options: Record<string, number[]>

  constructor(length: number, options: Record<string, number[]>) {
    super(length)
    this.options = options
  }

  static withOptions(options: Record<string, number[]>): typeof Transcoder {
    // @ts-ignore
    return (length: number) => new Options(length, options)
  }

  encode(option: string): number[] {
    const bytes = this.options[option]

    if (!bytes) {
      throw `Options Transcoder can not encode unknown option \"${option}\".`
    }

    return bytes
  }

  decode(bytes: number[]): string {
    const byteString = JSON.stringify(bytes)
    const keys = Object.keys(this.options)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      if (JSON.stringify(this.options[key]) === byteString) {
        return key
      }
    }

    throw `Options Transcoder can not decode unknown value \"${bytes
      .map((n) => n.toString(16))
      .join(',')}\".`
  }
}
