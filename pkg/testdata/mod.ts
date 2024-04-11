export type Entry = { id: string, name: string };

const data = Array(1000)
  .fill(0)
  .map<Entry>((_, _i) => ({
    id: crypto.randomUUID(),
    name: crypto.randomUUID(),
  }));

export const testData = () => {
  return Promise.resolve(data);
};
