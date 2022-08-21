const cache = new Map<number, number>();

function fib(index: number): number {
  console.log(`fib(${index})`);
  if (index < 2) return 1;
  if (cache.has(index)) return cache.get(index)!;
  const result = fib(index - 1) + fib(index - 2);
  cache.set(index, result);
  return result;
}

export default fib;
