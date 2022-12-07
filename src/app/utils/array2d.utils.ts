import { Array2d } from '../models/array2d';

export const addRandom = (array2d: Array2d, randomValue: number) => {
  const emptyElements = getEmptyElements(array2d);
  if (emptyElements.length === 0) {
    return array2d;
  }
  const randomEmptyElementIndex = Math.max(Math.round(Math.random() * emptyElements.length) - 1, 0);
  const randomEmptyElement = emptyElements[randomEmptyElementIndex];
  const cloned = clone(array2d);
  cloned[randomEmptyElement.x][randomEmptyElement.y] = randomValue;
  return cloned;
};

export const getEmptyElements = (array2d: Array2d): { value: number, x: number, y: number }[] => {
  return array2d
    .map((row, x) => row.map((value, y) => ({ value, x, y })).filter(tile => tile.value === 0))
    .reduce((acc, el) => [...acc, ...el], []);
}

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

export const sumToLeft = (array2d: Array2d, obstacleValue: number): Array2d => {
  return array2d.map(row => {
    return row
      .reduce((acc: SumAccumulator[], value: number, index: number) => {
        const lastElement: SumAccumulator = acc[acc.length - 1];
        if (value > 0) {
          if (lastElement && !lastElement.isMerged && value === lastElement?.value) {
            lastElement.value *= 2;
            lastElement.isMerged = true;
          } else {
            acc.push({ value: value, isMerged: false });
          }
        } else if (value === obstacleValue) {
          const noEmptyElements = index - acc.length;
          acc.push(...Array(noEmptyElements).fill(0));
          acc.push({ value: value, isMerged: false });
        }
        return acc;
    }, [])
    .map(el => el.value);
  });
};

export const fillEmptyElements = (array2d: Array2d, noColumns: number, fillValue: number = 0) => {
  return array2d.map(row => Array(noColumns).fill(fillValue).map((val, index) => row[index] ?? 0));
};

export const generateEmpty = (noRows: number, noColumns: number): Array2d => {
  return Array(noRows).fill(0).map(() => Array(noColumns).fill(0));
}

export const clone = (array2d: Array2d): Array2d => {
  return array2d.map(row => row.map(value => value));
};

export const toArray = (array2d: Array2d): number[] => {
  return array2d.reduce((acc, el) => [...acc, ...el], []);
};