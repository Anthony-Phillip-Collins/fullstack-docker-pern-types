import { StatusCodes } from '../../../errors.type';
import getError from '../../getError';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseString = (value: unknown, prop?: unknown): string => {
  if (!value || !isString(value)) {
    let message = `The value provided is not a string: "${value}"`;
    if (prop && isString(prop)) {
      message = `The value of ${prop} is invalid: "${value}"`;
    }
    throw getError({ message, status: StatusCodes.BAD_REQUEST });
  }
  return value;
};
