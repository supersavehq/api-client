import { Axios } from 'axios';
import * as methods from '../api';
import { BaseEntity, Collection } from '../types';

export default function <T extends BaseEntity>(
  client: Axios,
  collection: Collection
) {
  return {
    get: (filterSort: Record<string, string> = {}) =>
      methods.get<T>(client, collection, filterSort),
    getById: (id: string) => methods.getById<T>(client, collection, id),
    remove: (id: string) => methods.remove(client, collection, id),
    create: (item: Omit<T, 'id'>) => methods.create<T>(client, collection, item),
    update: (item: Partial<T>) => methods.update<T>(client, collection, item),
  };
}
