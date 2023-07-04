import { UserAttributes } from './user.type';

export interface BlogAttributes {
  id: number;
  title: string;
  author: string;
  url: string;
  likes: number;
  createdAt?: Date;
  updatedAt?: Date;
  ownerId?: UserAttributes['id'];
}
export type BlogCreation = Omit<BlogAttributes, 'id'>;
export type BlogUpdate = Pick<BlogAttributes, 'likes'>;
