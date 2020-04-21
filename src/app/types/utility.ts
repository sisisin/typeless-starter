export type ToUnion<T> = T extends readonly string[] ? T[number] : T;
export type ToStringObject<T> = T extends readonly string[] ? { [P in T[number]]: string } : never;
