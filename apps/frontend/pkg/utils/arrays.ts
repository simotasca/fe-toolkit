export function diffArrays<T>(a: T[], b: T[]) {
  const setA = new Set(a);
  const setB = new Set(b);

  const onlyInA = a.filter(x => !setB.has(x));
  const onlyInB = b.filter(x => !setA.has(x));

  return {
    onlyInA,
    onlyInB,
    full: [...onlyInA, ...onlyInB],
  } as const;
}