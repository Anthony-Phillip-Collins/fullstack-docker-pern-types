import { ErrorNames } from '../../../errors.type';
import getError from '../../getError';

export const isNumber = (value: unknown): value is number => {
  const val = Number(value);
  return typeof val === 'number' || !isNaN(val);
};

export const parseNumber = (value: unknown, path?: string): number => {
  if (!isNumber(value) || (isNumber(value) && value < 0)) {
    let message = `The value provided is not a number!`;
    if (path) {
      message = `The value of ${path} is invalid!`;
    }

    throw getError({
      message,
      name: ErrorNames.ValidationError,
      path,
    });
  }
  return value;
};
