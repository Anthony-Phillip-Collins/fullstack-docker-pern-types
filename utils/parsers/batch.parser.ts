import { ErrorNames, StatusCodes } from '../../errors.type';
import { parseError } from './error.parser';

export const parseBatch = (parsers: Array<() => void>, error: Error): void => {
  const errorResponse: Error = new Error();
  errorResponse.name = error.name || ErrorNames.ValidationError;
  errorResponse.message = 'Some Fields are invalid.';
  errorResponse.status = StatusCodes.BAD_REQUEST;
  errorResponse.errors = [];

  parsers.forEach((parse) => {
    try {
      parse();
    } catch (error) {
      const err = parseError(error);
      if (err && errorResponse.errors) {
        errorResponse.errors.push({ ...err });
      }
    }
  });

  if (errorResponse.errors && errorResponse.errors.length > 0) {
    throw errorResponse;
  }
};
