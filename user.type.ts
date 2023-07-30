import { BlogAttributes } from './blog.type';
import { ReadingAttributes } from './reading.type';

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
  readings?: Readings[];
}

type Mandatory = Pick<UserAttributes, 'username' | 'name' | 'hashedPassword'>;
type Optional = Partial<Pick<UserAttributes, 'admin' | 'disabled'>>;

type Readings = Pick<BlogAttributes, 'id' | 'title' | 'author' | 'url' | 'likes'> & {
  reading: Pick<ReadingAttributes, 'read' | 'id'>;
};

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

export type UserForToken = Pick<UserAttributes, 'username' | 'name' | 'id'>;
export interface UserWithToken extends UserForToken {
  accessToken: string;
  refreshToken: string;
}

export type UserLogin = Pick<UserCreateInput, 'username' | 'password'>;

export interface UserQuery {
  read?: string;
}
