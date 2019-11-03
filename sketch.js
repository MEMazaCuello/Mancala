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
  game.show();
  game.resolve();
}

function mouseClicked()
{
  if (game.isWaitingInput())
  {
    game.checkClick(mouseX,mouseY);
  }
}
