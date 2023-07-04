import { BlogAttributes } from './blog.type';

export interface UserAttributes {
  id: number;
  username: string;
  name: string;
  hashedPassword: string;
  createdAt?: Date;
  updatedAt?: Date;
  blogs?: BlogAttributes[];
}
export type UserCreate = Omit<UserAttributes, 'id'>;
export type UserCreateInput = Pick<UserAttributes, 'username' | 'name'> & {
  password: string;
};
export type UserUpdate = Partial<Pick<UserCreate, 'name' | 'hashedPassword'>>;
export type UserUpdateInput = Partial<Pick<UserCreateInput, 'name' | 'password'>>;

export type UserNonSensitive = Omit<UserAttributes, 'hashedPassword'>;

export type UserForToken = Pick<UserAttributes, 'username' | 'name'>;
export interface UserWithToken extends UserForToken {
  token: string;
}

export type UserLogin = Pick<UserCreateInput, 'username' | 'password'>;
