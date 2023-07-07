import { getError } from '../../../../utils/middleware/errorHandler';
import { StatusCodes } from '../../../errors.type';
import { isString } from './string.parser';

export const isPassword = (text: unknown): text is string => {
  return isString(text) && text.length >= 3;
};

export const parsePassword = (value: unknown): string => {
  if (!value || !isPassword(value)) {
    throw getError({
      message: 'Password not accepted. It has to be at least 3 characters long!',
      status: StatusCodes.BAD_REQUEST,
    });
  }
  return value;
};
