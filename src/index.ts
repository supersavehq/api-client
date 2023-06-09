import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import collectionWrapper from './collection';
import * as methods from './api';
import { BaseEntity, Collection } from './types';

export { BaseEntity, Collection } from './types';

export default function (prefix: string) {
  let setPrefix = prefix;
  if (setPrefix.substring(prefix.length - 1) === '/') {
    setPrefix = prefix.substring(0, prefix.length - 1);
  }

  const client = axios.create({
    baseURL: prefix,
  });

  type RequestInterceptor =
    | ((
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: AxiosRequestConfig<any>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => AxiosRequestConfig<any> | Promise<AxiosRequestConfig<any>>)
    | undefined;
  type ResponseInterceptor =
    | ((
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: AxiosResponse<any, any>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>)
    | undefined;

  return {
    collection: <T extends BaseEntity>(collection: Collection) =>
      collectionWrapper<T>(client, collection),
    requestInterceptorAdd: (interceptor: RequestInterceptor) =>
      client.interceptors.request.use(interceptor),
    requestInterceptorRemove: (interceptor: number) => {
      client.interceptors.request.eject(interceptor);
    },
    responseInterceptorAdd: (interceptor: ResponseInterceptor) =>
      client.interceptors.response.use(interceptor),

    // methods
    get: <T extends BaseEntity>(
      collection: Collection,
      filterSort: Record<string, string>
    ) => methods.get<T>(client, collection, filterSort),
    getById: <T extends BaseEntity>(collection: Collection, id: string) =>
      methods.getById<T>(client, collection, id),
    create: <T extends BaseEntity>(
      collection: Collection,
      item: Omit<T, 'id'>
    ) => methods.create<T>(client, collection, item),
    update: <T extends BaseEntity>(collection: Collection, item: Partial<T>) =>
      methods.update(client, collection, item),
    getClient: () => client,
  };
}
