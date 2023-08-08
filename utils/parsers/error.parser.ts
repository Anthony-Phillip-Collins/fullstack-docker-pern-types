import { isNumber } from './common/number.parser';
import { isObject } from './common/object.parser';
import { isString } from './common/string.parser';

const hasErrorProps = (object: unknown): object is Error => {
  if (!isObject(object)) return false;
  return (
    'message' in object &&
    isString(object.message) &&
    (('name' in object && isString(object.name)) || ('status' in object && isNumber(object.status)))
  );
};

export const getDefaultError = () => {
  const error = new Error('Something went wrong');
  error.name = 'Error';
  error.status = 500;
  return error;
};

export const parseError = (error: unknown): Error | null => {
  let parsedError = getDefaultError();

  if (error instanceof Error) {
    error.name = error.name || parsedError.name;
    error.status = error.status || parsedError.status;
    parsedError = error;
  } else if (hasErrorProps(error)) {
    const e = new Error();
    e.message = error.message || parsedError.message;
    e.name = error.name || parsedError.name;
    e.status = error.status || parsedError.status;
    parsedError = e;
  } else if (typeof error === 'string') {
    const e = new Error();
    e.message = error;
    e.name = parsedError.name;
    e.status = parsedError.status;
    parsedError = e;
  } else if (!error) {
    return null;
  }

  return parsedError;
};
