import { MostToLeast } from './index'

/*
 * Least to most significat 7bit chunks
 */
export class LeastToMost extends MostToLeast {
  encode(value?: number): number[] {
    return super.encode(value).reverse()
  }

  decode(bytes: number[]): number {
    return super.decode(bytes.reverse())
  }
}
