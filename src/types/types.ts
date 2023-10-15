export type GenerationProperties = { lower: boolean, upper: boolean, number: boolean, symbol: boolean, length: number }
export interface RandomFunc {
  lower: () => string,
  upper: () => string,
  number: () => string,
  symbol: () => string,

  [index: string]: () => string,
}

export type PasswordMap = Map<string, string>
