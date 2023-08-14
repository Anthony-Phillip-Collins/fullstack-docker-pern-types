import { ErrorNames } from '../errors.type';
import { getDefaultError, parseError } from './parsers/error.parser';

const getError = (error: Error | ErrorNames): Error => {
  let e = new Error();
  if (typeof error === 'string') {
    e.name = error;
  } else {
    e = parseError(error) || getDefaultError();
  }
  return e;
};

export default getError;
