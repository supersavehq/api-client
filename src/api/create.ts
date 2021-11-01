import { Axios } from 'axios';
import { BaseEntity, Collection } from '../types';
import { generatePath } from '../utils';

export async function create<T extends BaseEntity>(
  client: Axios,
  collection: Collection,
  item: Omit<T, 'id'>
): Promise<T> {
  const response = await client.post<{ data: T }>(
    generatePath(collection),
    item
  );
  return response.data.data;
}
