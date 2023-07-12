import { getError } from '../../../../util/middleware/errorHandler';
import { StatusCodes } from '../../../errors.type';

export const isNumber = (value: unknown): value is number => {
  const val = Number(value);
  return typeof val === 'number' || !isNaN(val);
};

export const parseNumber = (value: unknown, prop?: unknown): number => {
  if (!isNumber(value) || (isNumber(value) && value < 0)) {
    let message = `The value provided is not a number: "${value}"`;
    if (prop && isNumber(prop)) {
      message = `The value of ${prop} is invalid: "${value}"`;
    }
    throw getError({ message, status: StatusCodes.BAD_REQUEST });
  }
  return value;
};
