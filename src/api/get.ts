import { Axios } from 'axios';
import { BaseEntity, Collection } from '../types';
import { generatePath } from '../utils';

export async function get<T extends BaseEntity>(
  client: Axios,
  collection: Collection,
  filterSort: Record<string, string> = {}
): Promise<T[]> {
  const response = await client.get(generatePath(collection), {
    params: filterSort,
  });
  return response.data.data as T[];
}
