import * as Array2dUtils from './../utils/array2d.utils';
import { DirectionCode } from './../game/game.component';
import { Array2d } from '../models/array2d';

export enum GameStatus {
  InProgress,
  Won,
  Lost
};

export class GameService {
  constructor(
    private readonly initialValue: number = 2,
    private readonly basicValue: number = 2,
    private readonly valueToWin: number = 2048,
    private readonly obstacleValue: number = -1,
  ) {}

  getNewGame(noRows: number, noColumns: number, noObstacles: number): Array2d {
    const empty = Array2dUtils.generateEmpty(noRows, noColumns);
    // add basic value at a random place
    const array2dWithRandomValue = Array2dUtils.addRandom(empty, this.initialValue);
    // add obstacles at a random place
    const array2dWithObstacle = Array(noObstacles).fill(null).reduce((acc) => Array2dUtils.addRandom(acc, this.obstacleValue), array2dWithRandomValue);
    return array2dWithObstacle;
  }

  move(array2d: Array2d, direction: DirectionCode): Array2d {
    const array2dSummed: Array2d = this.sumToDirection(array2d, direction);
    // add basic value at a random place
    const array2dWithRandomValue: Array2d = Array2dUtils.addRandom(array2dSummed, this.basicValue);
    return array2dWithRandomValue;
  }

  getStatus(array2d: Array2d): GameStatus {
    const array = Array2dUtils.toArray(array2d);
    const valueToWinFound = !!array.find(value => value === this.valueToWin);
    if (valueToWinFound) {
      return GameStatus.Won;
    }

    const hasEmptyElements = Array2dUtils.getEmptyElements(array2d).length > 0;
    if (hasEmptyElements || this.hasEmptyElementsAfterMove(array2d)) {
      return GameStatus.InProgress;
    }

    return GameStatus.Lost;
  }

  private sumToDirection(array2d: Array2d, direction: DirectionCode): Array2d {
    const noRotations: number = direction - DirectionCode.ArrowLeft;
    // Rotate array2d so the merge direction is always to the left
    const array2dRotatedToLeftDirection: Array2d = Array2dUtils.rotateMultipleTimes(array2d, noRotations, true)

    const array2dSummedToLeft: Array2d = Array2dUtils.sumToLeft(array2dRotatedToLeftDirection, this.obstacleValue);

    const maxLength: number = Math.max(...array2dRotatedToLeftDirection.map(row => row.length));
    const array2dWithFilledEmptyElements: Array2d = Array2dUtils.fillEmptyElements(array2dSummedToLeft, maxLength);
    // Rotate it back
    return Array2dUtils.rotateMultipleTimes(array2dWithFilledEmptyElements, noRotations, false);
  }

  private hasEmptyElementsAfterMove(array2d: Array2d): boolean {
    return !![DirectionCode.ArrowLeft, DirectionCode.ArrowDown].find((directionCode: DirectionCode) => {
      const arraySummedToDirection = this.sumToDirection(array2d, directionCode );
      return Array2dUtils.getEmptyElements(arraySummedToDirection).length > 0;
    });
  }
}