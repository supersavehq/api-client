import { Axios } from 'axios';
import { BaseEntity, Collection } from '../types';
import { generatePath } from '../utils';

export async function update<T extends BaseEntity>(
  client: Axios,
  collection: Collection,
  item: Partial<T>
): Promise<T> {
  const response = await client.patch<{ data: T }>(
    `${generatePath(collection)}/${item.id}`,
    item
  );
  return response.data.data;
}
