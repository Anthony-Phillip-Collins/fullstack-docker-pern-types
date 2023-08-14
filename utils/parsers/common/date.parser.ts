import { StatusCodes } from '../../../errors.type';
import getError from '../../getError';
import { isString } from './string.parser';

const hasDateFormat = (value: string): boolean => {
  /* correct format: yyyy-mm-dd or yyyy-m-d */
  const year = { min: 4, max: 4 };
  const month = { min: 1, max: 2 };
  const day = month;
  const format = [year, month, day];
  const split = value.split('-');
  return (
    split.length === format.length &&
    split.reduce((result, v, i) => result && v.length <= format[i].max && v.length >= format[i].min, true)
  );
};

export const isDate = (value: string): boolean => {
  return !!value && Boolean(Date.parse(value)) && hasDateFormat(value);
};

export const parseDate = (value: unknown, path?: string): string => {
  if (!value || !isString(value) || !isDate(value)) {
    let message = `The value provided is not a date!`;
    if (path) {
      message = `The value of ${path} is invalid!`;
    }
    throw getError({ message, status: StatusCodes.BAD_REQUEST, path });
  }
  return value;
};
