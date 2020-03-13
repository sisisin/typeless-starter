export type Merge<T extends object, U extends object, V extends object> = { [K in keyof T]: T[K] } &
  { [K in keyof U]: U[K] } &
  { [K in keyof V]: V[K] };

export type ToUnion<T> = T extends readonly string[] ? T[number] : T;
export type ToStringObject<T> = T extends string ? { [P in T]: string } : never;
