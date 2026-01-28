import Game from "./model/Game.js";
import GameView from "./view/GameView.js";
import GameController from "./controller/GameController.js";

const game = new Game();

const gameView = new GameView(game);

const gameController = new GameController(game, gameView);
