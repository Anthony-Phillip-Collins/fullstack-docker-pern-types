import { getError } from '../../../util/middleware/errorHandler';
import { StatusCodes } from '../../errors.type';
import { ReadingCreation, ReadingUpdate } from '../../reading.type';
import { parseBoolean } from './common/boolean.parser';
import { parseNumber } from './common/number.parser';

const isReadingCreation = (obj: unknown): obj is ReadingCreation => {
  if (!obj || typeof obj !== 'object') return false;
  const mandatory = ['userId', 'blogId'];
  return mandatory.filter((p) => p in obj).length === mandatory.length;
};

export const parseReadingCreation = (obj: unknown): ReadingCreation => {
  if (!isReadingCreation(obj)) {
    throw getError({
      message: 'Some Reading data fields are missing. Needs userId and blogId.',
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const reading: ReadingCreation = {
    userId: parseNumber(obj.userId, 'userId'),
    blogId: parseNumber(obj.blogId, 'blogId'),
  };

  return reading;
};

const isReadingUpdate = (obj: unknown): obj is ReadingUpdate => {
  if (!obj || typeof obj !== 'object') return false;
  const mandatory = ['read'];
  return mandatory.filter((p) => p in obj).length === mandatory.length;
};

export const parseReadingUpdate = (obj: unknown): ReadingUpdate => {
  if (!isReadingUpdate(obj)) {
    throw getError({
      message: 'Only read can be updated.',
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const reading: ReadingUpdate = {
    read: parseBoolean(obj.read, 'read'),
  };

  return reading;
};
