export enum StatusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  NOT_MODIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  GONE = 410,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
}

export enum ErrorNames {
  Error = 'Error',
  NotFound = 'NotFound',
  CastError = 'CastError',
  ValidationError = 'ValidationError',
  JsonWebTokenError = 'JsonWebTokenError', // jwt error
  TokenExpiredError = 'TokenExpiredError', // jwt error
  NotBeforeError = 'NotBeforeError', // jwt error
  Unauthorized = 'Unauthorized',
  NotInTestMode = 'NotInTestMode',
  UserDisabled = 'UserDisabled',
}

export interface ErrorBody {
  message: string;
  status: number;
  name?: string | ErrorNames;
}
