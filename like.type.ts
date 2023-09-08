import { BlogAttributes } from './blog.type';
import { UserAttributes } from './user.type';

export interface LikeAttributes {
  id: number;
  userId: UserAttributes['id'];
  blogId: BlogAttributes['id'];
}

export type LikeCreation = Pick<LikeAttributes, 'userId' | 'blogId'>;
