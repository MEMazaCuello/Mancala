const GAME_STATES = {standby:  "standby",
                selected: "selected",
                active:   "active",
                stealing: "stealing",
                gameOver: "gameOver",
                waiting: "waiting"};
let RADIUS = 50;
let game;

function setup()
{
  createCanvas(1050,600);
  colorMode(HSB);

  game = new GameManager();
  game.createGame();
  game.show();
}

function draw()
{
  background(0,0,8);

  if (game.hasBeenActivated())
  {
    game.moving();
  }

  game.resolve();
  game.show();
  if (game.isGameOver())
  {
    game.endGame();
    noLoop();
  }
}

function mouseClicked()
{
  if (game.isWaitingInput())
  {
    game.checkClick(mouseX,mouseY);
  }
}
