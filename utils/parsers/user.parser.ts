import {
  UserCreateInput,
  UserForToken,
  UserLogin,
  UserQuery,
  UserUpdateAsAdminInput,
  UserUpdateAsUserInput,
} from '../../../types/user.type';
import { StatusCodes } from '../../errors.type';
import getError from '../getError';
import { parseBatch } from './batch.parser';
import { parseBoolean } from './common/boolean.parser';
import { parseNumber } from './common/number.parser';
import { isObject } from './common/object.parser';
import { parsePassword } from './common/password.parser';
import { parseString } from './common/string.parser';

/* Create User */

export const isUserCreateInput = (object: unknown): object is UserCreateInput => {
  if (!isObject(object)) return false;
  const mandatory = ['username', 'name', 'password'];
  return mandatory.filter((p) => p in object).length === mandatory.length;
};

export const parseUserCreateInput = (object: unknown): UserCreateInput => {
  if (!isUserCreateInput(object)) {
    throw getError({
      message: 'Some UserFields are missing. Needs username, name, password. Fields admin and disabled are optional.',
      status: StatusCodes.BAD_REQUEST,
    });
  }

  parseBatch(
    [
      () => parseString(object.username, 'username'),
      () => parseString(object.name, 'name'),
      () => parsePassword(object.password),
      () => parseBoolean(object.admin, 'admin', true),
      () => parseBoolean(object.disabled, 'disabled', true),
    ],
    { message: 'Some UserFields are invalid.', name: 'UserFieldsError' }
  );

  return object;
};

/* Update User as User */

export const isUserUpdateAsUserInput = (object: unknown): object is UserUpdateAsUserInput => {
  if (!isObject(object)) return false;
  const optional = ['name', 'password'];
  return optional.filter((p) => p in object).length > 0;
};

export const parseUserUpdateAsUserInput = (object: unknown): UserUpdateAsUserInput => {
  if (!isUserUpdateAsUserInput(object)) {
    throw getError({ message: 'Only name and password can be updated.', status: StatusCodes.BAD_REQUEST });
  }

  const updateUser: UserUpdateAsUserInput = {};

  if ('name' in object) updateUser.name = parseString(object.name, 'name');
  if ('password' in object) updateUser.password = parsePassword(object.password);

  return updateUser;
};

/* Update User as Admin */

export const isUserUpdateAsAdminInput = (object: unknown): object is UserUpdateAsAdminInput => {
  if (!isObject(object)) return false;
  const optional = ['name', 'password', 'admin', 'disabled'];
  return optional.filter((p) => p in object).length > 0;
};

export const parseUserUpdateAsAdminInput = (object: unknown): UserUpdateAsAdminInput => {
  if (!isUserUpdateAsAdminInput(object)) {
    throw getError({
      message: 'Only name, password, admin and disabled can be updated.',
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const updateUser: UserUpdateAsAdminInput = {};

  if ('name' in object) updateUser.name = parseString(object.name, 'name');
  if ('password' in object) updateUser.password = parsePassword(object.password);
  if ('admin' in object) updateUser.admin = parseBoolean(object.admin, 'admin');
  if ('disabled' in object) updateUser.disabled = parseBoolean(object.disabled, 'disabled');

  return updateUser;
};

/* Login */

export const isUserLogin = (object: unknown): object is UserLogin => {
  if (!isObject(object)) return false;
  const mandatory = ['username', 'password'];
  return mandatory.filter((p) => p in object).length === mandatory.length;
};

export const parseUserLogin = (object: unknown): UserLogin => {
  if (!isUserLogin(object)) {
    throw getError({ message: 'Provide username and password to log in.', status: StatusCodes.BAD_REQUEST });
  }

  const loginFields: UserLogin = {
    username: parseString(object.username, 'username'),
    password: parsePassword(object.password),
  };

  return loginFields;
};

export const isUserQuery = (object: unknown): object is UserQuery => {
  if (!isObject(object)) return false;
  const optional = ['read'];
  return optional.filter((p) => p in object).length > 0;
};

export const parseUserQuery = (object: unknown): UserQuery => {
  return isUserQuery(object) ? object : {};
};

export const isUserForToken = (object: unknown): object is UserForToken => {
  if (!isObject(object)) return false;
  const mandatory = ['username', 'name', 'id'];
  return mandatory.filter((p) => p in object).length === mandatory.length;
};

export const parseUserForToken = (object: unknown): UserForToken => {
  if (!isUserForToken(object)) {
    throw getError({ message: 'UserForToken data is missing.', status: StatusCodes.BAD_REQUEST });
  }

  const userForToken: UserForToken = {
    username: parseString(object.username, 'username'),
    name: parseString(object.name, 'name'),
    id: parseNumber(object.id, 'id'),
  };

  return userForToken;
};
