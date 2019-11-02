const GAME_STATES = {standby:  "standby",
                selected: "selected",
                active:   "active",
                stealing: "stealing",
                gameOver: "gameOver"};
let RADIUS = 50;
let game;

function setup()
{
  createCanvas(1050,600);
  colorMode(HSB);

  game = new GameManager();
  game.createGame();
}

function draw()
{
  background(0,0,8);
  game.show();

  if (game.isGameOver())
  {
    game.endGame();
    noLoop();
  }
}

function mouseClicked()
{
  //if(game.standby || game.cellSelected)
  if (game.state == GAME_STATES.standby || game.state == GAME_STATES.selected)
  {
    game.checkClick(mouseX,mouseY);
  }
}
