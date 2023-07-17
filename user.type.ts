import { BlogAttributes } from './blog.type';

export interface UserAttributes {
  id: number;
  username: string;
  name: string;
  hashedPassword: string;
  admin: boolean;
  disabled: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  blogs?: BlogAttributes[];
}

type Mandatory = Pick<UserAttributes, 'username' | 'name' | 'hashedPassword'>;
type Optional = Partial<Pick<UserAttributes, 'admin' | 'disabled'>>;

export type UserCreate = Mandatory & Optional;

export type UserCreateInput = Omit<UserCreate, 'hashedPassword'> & {
  password: string;
};

export type UserUpdateAsAdmin = Partial<Omit<UserCreate, 'username'>>;
export type UserUpdateAsAdminInput = Partial<Omit<UserUpdateAsAdmin, 'hashedPassword'>> & {
  password?: UserCreateInput['password'];
};

export type UserUpdateAsUser = Partial<Omit<UserUpdateAsAdmin, 'admin' | 'disabled'>>;
export type UserUpdateAsUserInput = Partial<Omit<UserUpdateAsUser, 'hashedPassword'>> & {
  password?: UserCreateInput['password'];
};

export type UserForToken = Pick<UserAttributes, 'username' | 'name'>;
export interface UserWithToken extends UserForToken {
  token: string;
}

export type UserLogin = Pick<UserCreateInput, 'username' | 'password'>;

export interface UserQuery {
  read?: string;
}
