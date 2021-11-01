import { Axios } from 'axios';
import { Collection } from '../types';
import { generatePath } from '../utils';

export async function remove(
  client: Axios,
  collection: Collection,
  id: string
): Promise<void> {
  await client.delete(`${generatePath(collection)}/${id}`);
}
