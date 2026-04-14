export function map<T, R>(val: T, mapper: (v: T) => R): R {
  return mapper(val)
}