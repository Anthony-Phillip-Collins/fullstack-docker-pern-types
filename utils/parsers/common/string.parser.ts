import { StatusCodes } from '../../../errors.type';
import getError from '../../getError';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseString = (value: unknown, path?: string): string => {
  if (!value || !isString(value)) {
    let message = `The value provided is not a string`;
    if (path) {
      message = `The value of ${path} is invalid!`;
    }
    throw getError({ message, status: StatusCodes.BAD_REQUEST, path });
  }
  return value;
};
