export const chunkArray = (array: any[], parts: number) => {
  const result = [];
  const partSize = Math.ceil(array.length / parts);

  let index = 0;

  for (let i = 0; i < parts; i++) {
    const chunk = array.slice(index, index + partSize);
    result.push(chunk);
    index += partSize;
    if (index >= array.length) break;
  }

  return result;
}
