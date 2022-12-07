import { Array2d } from '../models/array2d';

export const addRandom = (array2d: Array2d, randomValue: number) => {
  const emptyElements = array2d
    .map((row, x) => row.map((value, y) => ({ value, x, y })).filter(tile => tile.value === 0))
    .reduce((acc, el) => [...acc, ...el], [])

  const randomEmptyElementIndex = Math.max(Math.round(Math.random() * emptyElements.length) - 1, 0);
  const randomEmptyElement = emptyElements[randomEmptyElementIndex];
  array2d[randomEmptyElement.x][randomEmptyElement.y] = randomValue;
  return array2d;
};

export const rotateMultipleTimes = (array2d: Array2d, noRotations: number, clockwise: boolean): Array2d => {
  return  Array(Math.abs(noRotations)).fill(0).reduce(acc => rotate(acc, clockwise), array2d);
};

export const rotate = (array: Array2d, clockwise: boolean): Array2d => {
  const length = array.length;
  const rowLength = array[0].length;
  return Array.from(
      { length: rowLength },
      (_, j) => Array.from(
          { length: length },
          (__, i) => array[clockwise ? i: length - i - 1][clockwise ? rowLength - j - 1: j]
      )
  );
};

interface SumAccumulator { value: number; isMerged: boolean };

export const sumToLeft = (array2d: Array2d): Array2d => {
  return array2d.map(row => {
    return row
      .reduce((acc: SumAccumulator[], value: number) => {
        const lastElement: SumAccumulator = acc[acc.length - 1];
        if (value !== 0) {
          if (lastElement && !lastElement.isMerged && value === lastElement?.value) {
            lastElement.value *= 2;
            lastElement.isMerged = true;
          } else {
            acc.push({ value: value, isMerged: false });
          }
        }
        return acc;
    }, [])
    .map(el => el.value);
  });
};

export const fillEmptyElements = (array2d: Array2d, rowLength: number, fillValue: number = 0) => {
  return array2d.map(row => Array(rowLength).fill(fillValue).map((val, index) => row[index] ?? 0));
};