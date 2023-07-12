import { getError } from '../../../util/middleware/errorHandler';
import { BlogCreation, BlogQuery, BlogUpdate } from '../../blog.type';
import { StatusCodes } from '../../errors.type';
import { parseNumber } from './common/number.parser';
import { parseString } from './common/string.parser';

export const isNewBlog = (object: unknown): object is BlogCreation => {
  if (!object || typeof object !== 'object') {
    throw getError({ message: 'Blog data is missing.', status: StatusCodes.BAD_REQUEST });
  }
  const mandatory = ['author', 'title', 'url', 'likes'];
  return mandatory.filter((p) => p in object).length === mandatory.length;
};

export const parseNewBlog = (object: unknown): BlogCreation => {
  if (!isNewBlog(object)) {
    throw getError({
      message: 'Some Blog data fields are missing. Needs author, title, url and likes.',
      status: StatusCodes.BAD_REQUEST,
    });
  }

  const newBlog: BlogCreation = {
    author: parseString(object.author, 'author'),
    title: parseString(object.title, 'title'),
    url: parseString(object.url, 'url'),
    likes: parseNumber(object.likes, 'likes'),
  };

  return newBlog;
};

export const isUpdateBlog = (object: unknown): object is BlogUpdate => {
  if (!object || typeof object !== 'object') {
    throw getError({ message: 'Blog data is missing.', status: StatusCodes.BAD_REQUEST });
  }
  const mandatory = ['likes'];
  const exact = Object.keys(object).length === mandatory.length;
  return mandatory.filter((p) => p in object).length === mandatory.length && exact;
};

export const parseUpdateBlog = (object: unknown): BlogUpdate => {
  if (!isUpdateBlog(object)) {
    throw getError({ message: 'Only likes can be updated.', status: StatusCodes.BAD_REQUEST });
  }

  const updateBlog: BlogUpdate = {
    likes: parseNumber(object.likes, 'likes'),
  };

  return updateBlog;
};

export const isBlogQuery = (object: unknown): object is BlogQuery => {
  if (!object || typeof object !== 'object') {
    return false;
  }
  const optional = ['search'];
  return optional.filter((p) => p in object).length > 0;
};

export const parseBlogQuery = (object: unknown): BlogQuery => {
  return isBlogQuery(object) ? object : {};
};
