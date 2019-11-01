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
    noLoop();
  }
}

function mouseClicked()
{
  if(game.standby || game.cellSelected)
  {
    game.checkClick(game.player,mouseX,mouseY,game.opponent);
  }
}
