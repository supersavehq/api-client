import pluralize from 'pluralize';
import { Collection } from '../types';

export function generatePath(collection: Collection): string {
  if (!collection.namespace) {
    return `/${pluralize(collection.name)}`;
  }

  return `/${collection.namespace}/${pluralize(collection.name)}`;
}
