import { isEmpty, omitBy, random, sample } from 'lodash-es'
import RandomFunc from '../types/RandomFunc'
import { GenerationProperties } from '../types/GenerationProperties'

/**
 * Create an array and fill it with a range of numbers
 */
const range = (start: number, end: number): number[] => {
  return Array(end - start + 1)
    .fill(null)
    .map((_, idx) => start + idx)
}

/**
 * Create a string of special Chars
 */
const createSymbolString = (): string[] => {
  const asciiCharsRanges: number[] = [...range(33, 47), ...range(58, 64), ...range(91, 96), ...range(123, 126)]
  return asciiCharsRanges.map(char => String.fromCharCode(char))
}

/**
 * Generates Random Lowercase Letter
 */
const getRandomLower = (): string => String.fromCharCode(random(97, 122))

/**
 * Generates Random Uppercase Letter
 */
const getRandomUpper = (): string => String.fromCharCode(random(65, 90))

/**
 * Generates Random Number
 */
const getRandomNumber = (): string => String.fromCharCode(random(48, 57))

/**
 * Generates Random Symbol
 */
const getRandomSymbol = (symbols: string [] = createSymbolString()): string => symbols[random(0, symbols.length - 1)]

/**
 * Generate Password
 */

const randomFunc: RandomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

const generatePassword = ({ length, ...args }: GenerationProperties): string => {
  type FilteredTypes = Omit<GenerationProperties, 'length'>
  const filteredTypes = omitBy<FilteredTypes>(args, (value) => !Boolean(value))
  if (isEmpty(filteredTypes)) return ''
  const typesArray = Object.entries(filteredTypes as FilteredTypes)

  return Array.from({ length }, () => {
    const [type] = sample(typesArray) as [keyof FilteredTypes, boolean]
    return randomFunc[type as keyof RandomFunc]()
  }).join('')
}

export {
  getRandomLower, getRandomNumber, getRandomSymbol, getRandomUpper, generatePassword
}
