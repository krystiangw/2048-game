import * as Array2dUtils from './../utils/array2d.utils';
import { DirectionCode } from './../game/game.component';
import { Array2d } from '../models/array2d';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  move(array2d: Array2d, direction: DirectionCode): Array2d {
    const noRotations = direction - DirectionCode.ArrowLeft;
    const tilesRotatedToLeftDirection: Array2d = Array2dUtils.rotateMultipleTimes(array2d, noRotations, true)

    const maxLength = Math.max(...tilesRotatedToLeftDirection.map(row => row.length));
    const moved = Array2dUtils.sumToLeft(tilesRotatedToLeftDirection);
    const filled = Array2dUtils.fillEmptyElements(moved, maxLength);
    Array2dUtils.addRandom(filled, 2);
    return Array2dUtils.rotateMultipleTimes(filled, noRotations, false)
  }
}