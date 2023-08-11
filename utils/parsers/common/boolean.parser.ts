import { StatusCodes } from '../../../errors.type';
import getError from '../../getError';

export const isBoolean = (value: unknown): value is boolean => {
  let isBoolean = typeof value === 'boolean';

  if (typeof value === 'string') {
    isBoolean = value === 'true' || value === 'false';
  }

  return isBoolean;
};

export const parseBoolean = (value: unknown, prop?: unknown, silent?: boolean): boolean => {
  const isBool = isBoolean(value);

  if (silent) return isBool;

  if (!isBool) {
    let message = `The value provided is not a boolean!`;
    if (prop) {
      message = `The value of ${prop} is invalid!`;
    }
    throw getError({ message, status: StatusCodes.BAD_REQUEST });
  }
  return value;
};
