import { UserCreateInput, UserLogin, UserUpdateInput } from '../../../types/user.type';
import { parsePassword } from './common/password.parser';
import { parseString } from './common/string.parser';

/* Create User */

export const isUserCreateInput = (object: unknown): object is UserCreateInput => {
  if (!object || typeof object !== 'object') {
    throw new Error('UserField data is missing.');
  }
  const mandatory = ['username', 'name', 'password'];
  return mandatory.filter((p) => p in object).length === mandatory.length;
};

export const parseUserCreateInput = (object: unknown): UserCreateInput => {
  if (!isUserCreateInput(object)) {
    throw new Error('Some UserFields are missing. Needs username, name and password.');
  }

  const newUser: UserCreateInput = {
    username: parseString(object.username, 'username'),
    name: parseString(object.name, 'name'),
    password: parsePassword(object.password),
  };

  return newUser;
};

/* Update User */

export const isUserUpdateInput = (object: unknown): object is UserUpdateInput => {
  if (!object || typeof object !== 'object') {
    throw new Error('User data is missing.');
  }
  const optional = ['name', 'password'];
  return optional.filter((p) => p in object).length > 0;
};

export const parseUserUpdateInput = (object: unknown): UserUpdateInput => {
  if (!isUserUpdateInput(object)) {
    throw new Error('Only name and password can be updated.');
  }

  const updateUser: UserUpdateInput = {};

  if ('name' in object) updateUser.name = parseString(object.name, 'name');
  if ('password' in object) updateUser.password = parsePassword(object.password);

  return updateUser;
};

/* Login */

export const isUserLogin = (object: unknown): object is UserLogin => {
  if (!object || typeof object !== 'object') {
    throw new Error('Login data is missing.');
  }
  const mandatory = ['username', 'password'];
  return mandatory.filter((p) => p in object).length === mandatory.length;
};

export const parseUserLogin = (object: unknown): UserLogin => {
  if (!isUserLogin(object)) {
    throw new Error('Provide username and password to log in.');
  }

  const loginFields: UserLogin = {
    username: parseString(object.username, 'username'),
    password: parsePassword(object.password),
  };

  return loginFields;
};
