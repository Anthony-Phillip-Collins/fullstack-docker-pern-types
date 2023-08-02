import { isAxiosError } from 'axios';
import { isObject } from './common/object.parser';

export const parseError = (error: unknown): Error | null => {
  if (isAxiosError(error)) {
    const responseError = error.response?.data.error;
    return responseError.message ? responseError : error;
  } else if (error instanceof Error) {
    return error;
  } else if (typeof error === 'string') {
    return new Error(error);
  } else if (isObject(error) && 'message' in error && typeof error.message === 'string') {
    return new Error(error.message);
  } else if (!error) {
    return null;
  }

  return new Error('Something went wrong');
};
