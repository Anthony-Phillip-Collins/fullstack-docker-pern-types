import { StatusCodes } from '../../errors.type';
import { LikeCreation } from '../../like.type';
import getError from '../getError';
import { parseNumber } from './common/number.parser';
import { isObject } from './common/object.parser';

const isLikeCreation = (object: unknown): object is LikeCreation => {
  if (!isObject(object)) return false;
  const mandatory = ['userId', 'blogId'];
  return mandatory.filter((p) => p in object).length === mandatory.length;
};

export const parseLikeCreation = (object: unknown): LikeCreation => {
  if (!isLikeCreation(object)) {
    throw getError({
      message: 'Some Like data fields are missing. Needs userId and blogId.',
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const reading: LikeCreation = {
    userId: parseNumber(object.userId, 'userId'),
    blogId: parseNumber(object.blogId, 'blogId'),
  };

  return reading;
};
