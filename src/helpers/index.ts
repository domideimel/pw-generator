import { random } from 'lodash-es'
import TypesArray from '../types/TypesArray'
import RandomFunc from '../types/RandomFunc'

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
};

const generatePassword = (lower: boolean, upper: boolean, number: boolean, symbol: boolean, length: number): string => {
  let pwString: string = '';
  const typesArray: TypesArray = [{ lower }, { upper }, { number }, { symbol }].filter((item) => Object.values(item)[0]);

  if (typesArray.length === 0) return '';
  for (let i = 0; i < length; i += typesArray.length) {
    typesArray.forEach((type) => {
      const funcName = Object.keys(type)[0]
      pwString += randomFunc[funcName]()
    });
  }

  return pwString.slice(0, length);
};

const copyToClipboard = (string: string) => {
  const textArea = document.createElement('textarea');

  if (!string.length) return;

  textArea.value = string

  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  textArea.remove();

  textArea.value = '';
};
export {
  getRandomLower, getRandomNumber, getRandomSymbol, getRandomUpper, generatePassword, copyToClipboard
};
