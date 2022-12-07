## 2048 Game

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## Demo

[Demo](https://krystiangw.github.io/2048-game/dist/v7-2048/index.html)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## App architecture

* App use `type Array2d = number[][];` to describe app state
* [Game component](src/app/game/game.component.ts) is a smart component that keeps game state
* [Board component](src/app/board/board.component.ts) is a dumb component that renders game board
* [Game Service](src/app/services/game.service.ts) is a class that generate initial game state and provide game results based on the user moves.
* Game grid size can be customized based on the user input. Game basic value ( default to 2 ) and win value ( default to 2048 ) can be configured through [Game Service](src/app/services/game.service.ts) constructor