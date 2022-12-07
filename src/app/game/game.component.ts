import { GameService, GameStatus } from './../services/game.service';
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
  tiles: Array2d;

  noRows: number = 6;
  noColumns: number = 6;

  gameStatus: GameStatus = GameStatus.InProgress;

  private gameService = new GameService();

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    if (Object.values(DirectionCode).includes(keyCode) && this.gameStatus === GameStatus.InProgress) {
      this.tiles = this.gameService.move(this.tiles, keyCode);
      this.gameStatus = this.gameService.getStatus(this.tiles);
    }
  }

  constructor () {
    this.newGame();
  }

  newGame() {
    this.tiles = this.gameService.getNewGame(this.noRows, this.noColumns);
    this.gameStatus = this.gameService.getStatus(this.tiles);
  }

  get gameStatusText(): string {
    switch (this.gameStatus) {
      case GameStatus.Won:
        return 'Congratulations! You win!';
      case GameStatus.Lost:
        return 'Game lost';
      default:
        return 'In progress';
    }
  }
}
