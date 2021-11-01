import axios, { Axios } from 'axios';
import { BaseEntity, Collection } from '../types';
import { generatePath } from '../utils';

export async function getById<T extends BaseEntity>(
  client: Axios,
  collection: Collection,
  id: string
): Promise<T | null> {
  try {
    const response = await client.get<{ data: T }>(
      `${generatePath(collection)}/${id}`
    );
    return response.data.data;
  } catch (error: unknown) {
    if (!axios.isAxiosError(error)) {
      throw error;
    }

    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}
