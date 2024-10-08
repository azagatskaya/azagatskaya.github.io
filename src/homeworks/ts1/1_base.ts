/**
 * Нужно превратить файл в ts и указать типы аргументов и типы возвращаемого значения
 * */
export type RGB = [number, number, number];

export interface transformedCssString {
  x: number;
  y: number;
}

export interface NumberedArrElement {
  value: any;
  number: number;
}

export interface CustomerProps {
  name: string;
  age: number;
  isSubscribed: boolean;
}

export interface Customer extends CustomerProps {
  id: number;
}

export interface TransformedCustomers {
  [propName: number]: CustomerProps;
}

interface IToStringArr<T> {
  value: T;
  number: number;
}

export const removePlus = (string: string): string => string.replace(/^\+/, '');

export const addPlus = (string: string): string => `+${string}`;

export const removeFirstZeros = (value: string): string => value.replace(/^(-)?[0]+(-?\d+.*)$/, '$1$2');

export const getBeautifulNumber = (value: string, separator = ' '): string | never =>
  value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);

export const round = (value: number, accuracy = 2): number => {
  const d = 10 ** accuracy;
  return Math.round(value * d) / d;
};

const transformRegexp =
  /(matrix\(-?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, -?\d+(\.\d+)?, )(-?\d+(\.\d+)?), (-?\d+(\.\d+)?)\)/;

export const getTransformFromCss = (transformCssString: string): transformedCssString => {
  const data = transformCssString.match(transformRegexp);
  if (!data) return { x: 0, y: 0 };
  return {
    x: parseInt(data[6], 10),
    y: parseInt(data[8], 10),
  };
};

export const getColorContrastValue = ([red, green, blue]: RGB) =>
  // http://www.w3.org/TR/AERT#color-contrast
  Math.round((red * 299 + green * 587 + blue * 114) / 1000);

export const getContrastType = (contrastValue: number): 'black' | 'white' => (contrastValue > 125 ? 'black' : 'white');

export const shortColorRegExp = /^#[0-9a-f]{3}$/i;
export const longColorRegExp = /^#[0-9a-f]{6}$/i;

export const checkColor = (color: string): void | never => {
  if (!longColorRegExp.test(color) && !shortColorRegExp.test(color)) throw new Error(`invalid hex color: ${color}`);
};

export const hex2rgb = (color: string): RGB => {
  checkColor(color);
  if (shortColorRegExp.test(color)) {
    const red = parseInt(color.substring(1, 2), 16);
    const green = parseInt(color.substring(2, 3), 16);
    const blue = parseInt(color.substring(3, 4), 16);
    return [red, green, blue];
  }
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 8), 16);
  return [red, green, blue];
};

export const getNumberedArray = <T>(arr: Array<T>): Array<NumberedArrElement> =>
  arr.map((value, number) => ({ value, number }));
export const toStringArray = <T>(arr: Array<IToStringArr<T>>): Array<string> =>
  arr.map(({ value, number }) => `${value}_${number}`);

export const transformCustomers = (customers: [Customer]): TransformedCustomers => {
  return customers.reduce((acc: TransformedCustomers, customer: Customer) => {
    acc[customer.id] = { name: customer.name, age: customer.age, isSubscribed: customer.isSubscribed };
    return acc;
  }, {} as TransformedCustomers);
};
