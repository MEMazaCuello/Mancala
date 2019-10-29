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

  if(game.playerA.moves == 0)
  {
    game.gameOver('Red wins!');
    game.standby = false;
    noLoop();
  }
  if(game.playerB.moves == 0)
  {
    game.gameOver('Blue wins!');
    game.standby = false;
    noLoop();
  }
}

function mouseClicked()
{
  if(game.standby || game.cellSelected)
  {
    if(game.turn == "A")
    {
      game.checkClick(game.playerA,mouseX,mouseY,game.playerB);
    }
    else if (game.turn == "B")
    {
      game.checkClick(game.playerB,mouseX,mouseY,game.playerA);
    }
  }
}
