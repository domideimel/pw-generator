interface RandomFunc {
  lower: () => string,
  upper: () => string,
  number: () => string,
  symbol: () => string,

  [index: string]: () => string,
}

export default RandomFunc
