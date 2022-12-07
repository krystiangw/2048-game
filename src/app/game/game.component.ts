import { GameService } from './../services/game.service';
import { Array2d } from '../models/array2d';
import { Component, HostListener } from '@angular/core';

export enum DirectionCode {
  ArrowLeft = 37,
  ArrowUp = 38,
  ArrowRight = 39,
  ArrowDown = 40
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {
  tiles: Array2d = [
    [0, 0, 0, 0],
    [0, 0, 0, 2],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    if (Object.values(DirectionCode).includes(keyCode)) {
      this.tiles = this.gameService.move(this.tiles, keyCode);
    }
  }

  constructor (private gameService: GameService) {}
}
