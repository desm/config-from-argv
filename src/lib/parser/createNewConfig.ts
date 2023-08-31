export const createNewConfig = <T extends object>(config: T, changes: Partial<T>): T => {
  const copy = { ...changes };
  for (const k in copy) {
    const _k = k as keyof T;
    if (changes[_k] === null || changes[_k] === undefined || !(_k in config)) {
      delete copy[_k];
    }
  }
  return { ...config, ...copy };
};
