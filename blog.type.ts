import { ReadingAttributes } from './reading.type';
import { UserAttributes } from './user.type';

export interface BlogAttributes {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
  year: number;
  createdAt?: Date;
  updatedAt?: Date;
  ownerId?: UserAttributes['id'];
  owner?: OwnerAttributes;
  readers?: ReadersAttributes[];
  likers?: LikersAttributes[];
}

export type LikersAttributes = Pick<UserAttributes, 'name' | 'id'>;

export type ReadersAttributes = Pick<UserAttributes, 'name' | 'id'> & {
  reading: Pick<ReadingAttributes, 'read'>;
};

export type OwnerAttributes = Pick<UserAttributes, 'name' | 'username' | 'id'>;

export type BlogCreation = Omit<BlogAttributes, 'id' | 'owner'>;
export type BlogUpdate = Partial<Pick<BlogAttributes, 'title' | 'author' | 'url'>>;

export interface BlogQuery {
  search?: string;
}
