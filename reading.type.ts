import { BlogAttributes } from './blog.type';
import { UserAttributes } from './user.type';

export interface ReadingAttributes {
  id: number;
  userId: UserAttributes['id'];
  blogId: BlogAttributes['id'];
  read: boolean;
}
export type ReadingCreation = Pick<ReadingAttributes, 'userId' | 'blogId'>;
export type ReadingUpdate = Pick<ReadingAttributes, 'read'>;
