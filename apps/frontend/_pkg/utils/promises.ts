export async function sleep(ms: number = 1000) {
  await new Promise((r) => setTimeout(r, ms));
}

export async function withMinDuration<T extends Promise<any>>(promise: T, ms: number = 0): Promise<Awaited<T>> {
  return Promise.all([sleep(ms), promise]).then(([, awaited]) => awaited) as Promise<Awaited<T>>;
}