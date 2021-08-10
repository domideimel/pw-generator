interface RandomFunc  {
  [index:string]: ()=>  string,
  lower: () => string,
  upper: () => string,
  number: () => string,
  symbol: () => string,
}

export default RandomFunc
