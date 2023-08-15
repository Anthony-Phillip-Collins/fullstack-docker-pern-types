import { BlogCreation, BlogQuery, BlogUpdate } from '../../blog.type';
import { StatusCodes } from '../../errors.type';
import getError from '../getError';
import { parseBatch } from './batch.parser';
import { parseNumber } from './common/number.parser';
import { isObject } from './common/object.parser';
import { parseString } from './common/string.parser';

export const isNewBlog = (object: unknown): object is BlogCreation => {
  if (!isObject(object)) return false;
  const mandatory = ['author', 'title', 'url', 'likes', 'year'];
  return mandatory.filter((p) => p in object).length === mandatory.length;
};

export const isBlog = isNewBlog;

export const parseNewBlog = (object: unknown): BlogCreation => {
  if (!isNewBlog(object)) {
    throw getError({
      message: 'Some Blog data fields are missing. Needs author, title, url, likes and year.',
      status: StatusCodes.BAD_REQUEST,
    });
  }

  parseBatch(
    [
      () => parseString(object.author, 'author'),
      () => parseString(object.title, 'title'),
      () => parseString(object.url, 'url'),
      () => parseNumber(object.likes, 'likes'),
      () => parseNumber(object.year, 'year'),
    ],
    { message: 'Some BlogFields are invalid.', name: 'BlogFieldsError' },
  );

  return object;
};

export const isUpdateBlog = (object: unknown): object is BlogUpdate => {
  if (!isObject(object)) return false;
  const optional = ['title', 'author', 'url'];
  return optional.filter((p) => p in object).length >= 1;
};

export const parseUpdateBlog = (object: unknown): BlogUpdate => {
  if (!isUpdateBlog(object)) {
    throw getError({
      message: 'Update data is missing. Provide at least one of the following: title, author, url.',
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const updateBlog: BlogUpdate = {
    // likes: parseNumber(object.likes, 'likes'),
    title: parseString(object.title, 'title'),
    author: parseString(object.author, 'author'),
    url: parseString(object.url, 'url'),
  };

  return updateBlog;
};

export const isBlogQuery = (object: unknown): object is BlogQuery => {
  if (!isObject(object)) return false;
  const optional = ['search'];
  return optional.filter((p) => p in object).length > 0;
};

export const parseBlogQuery = (object: unknown): BlogQuery => {
  return isBlogQuery(object) ? object : {};
};
