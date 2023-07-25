import { ErrorBody, ErrorNames } from '../errors.type';
import { isObject } from './parsers/common/object.parser';

const getError = (error: ErrorBody | ErrorNames): Error => {
  const e = new Error();
  if (isObject(error)) {
    e.message = error.message;
    e.status = error.status;
  } else {
    e.name = error;
  }
  return e;
};

export default getError;
