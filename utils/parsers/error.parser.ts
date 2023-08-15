import { ErrorResponse } from '../../errors.type';
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
  const error = new Error('Something went wrong!');
  error.name = 'Error';
  error.status = 500;
  return error;
};

/*
 * returns an instance of Error or null
 */
export const parseError = (error: unknown): Error | null => {
  let parsedError: Error | null = null;

  const merge = (target: Error, error: Error) => {
    const { message, name, status, path, errors } = error;
    if (message) target.message = message;
    if (name) target.name = name;
    if (status) target.status = status;
    if (path) target.path = path;
    if (errors) target.errors = errors;
    return target;
  };

  if (error instanceof Error) {
    parsedError = error;
  } else if (hasErrorProps(error)) {
    parsedError = merge(new Error(), error);
  } else if (typeof error === 'string') {
    parsedError = new Error(error);
  } else if (!error) {
    return null;
  }

  return parsedError;
};

/*
 * returns and object with the same properties as Error or null
 */
export const serializeError = (error: Error | null): Error | null => {
  const serialized = parseError(error);
  if (!serialized) return null;
  return { ...serialized };
};

export const isErrorResponse = (object: unknown): object is ErrorResponse => {
  if (!isObject(object)) return false;
  const mandatory = ['error'];
  return mandatory.filter((p) => p in object).length === mandatory.length;
};
