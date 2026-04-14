export function Json({ children, val }: { children?: any; val?: any }) {
  return <pre>{JSON.stringify(val || children, null, 2)}</pre>;
}
