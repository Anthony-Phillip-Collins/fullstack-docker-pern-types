import { StatusCodes } from '../../errors.type';
import { ReadingCreation, ReadingQuery, ReadingUpdate } from '../../reading.type';
import getError from '../getError';
import { parseBoolean } from './common/boolean.parser';
import { parseNumber } from './common/number.parser';
import { isObject } from './common/object.parser';

const isReadingCreation = (object: unknown): object is ReadingCreation => {
  if (!isObject(object)) return false;
  const mandatory = ['userId', 'blogId'];
  return mandatory.filter((p) => p in object).length === mandatory.length;
};

export const parseReadingCreation = (object: unknown): ReadingCreation => {
  if (!isReadingCreation(object)) {
    throw getError({
      message: 'Some Reading data fields are missing. Needs userId and blogId.',
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const reading: ReadingCreation = {
    userId: parseNumber(object.userId, 'userId'),
    blogId: parseNumber(object.blogId, 'blogId'),
  };

  return reading;
};

const isReadingUpdate = (object: unknown): object is ReadingUpdate => {
  if (!isObject(object)) return false;
  const mandatory = ['read'];
  return mandatory.filter((p) => p in object).length === mandatory.length;
};

export const parseReadingUpdate = (object: unknown): ReadingUpdate => {
  if (!isReadingUpdate(object)) {
    throw getError({
      message: 'Only read can be updated.',
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const reading: ReadingUpdate = {
    read: parseBoolean(object.read, 'read'),
  };

  return reading;
};

export const isReadingQuery = (object: unknown): object is ReadingQuery => {
  if (!isObject(object)) return false;
  const optional = ['read'];
  return optional.filter((p) => p in object).length > 0;
};

export const parseReadingQuery = (object: unknown): ReadingQuery => {
  return isReadingQuery(object) ? object : {};
};
