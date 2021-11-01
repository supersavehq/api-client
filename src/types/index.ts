export type BaseEntity = {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type Collection = {
  name: string;
  namespace?: string;
};
