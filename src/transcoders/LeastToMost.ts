import MostToLeast from './MostToLeast'

/*
 * Least to most significat 7bit chunks
 */
class LeastToMost extends MostToLeast {
  encode(value?: number): number[] {
    return super.encode(value).reverse()
  }

  decode(bytes: number[]): number {
    return super.decode(bytes.reverse())
  }
}

export default LeastToMost
