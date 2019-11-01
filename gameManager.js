class GameManager
{
  // GameManager()
  constructor()
  {
    this.standby = true;
    this.cellSelected = false;
    this.cellActive   = false;
    this.selectedCell = null;
    this.state = GAME_STATES.standby;
    this.clickableCells = []; // array of indexes
  } // end GameManager()

  // GameManager.createGame
  createGame()
  {
    // Hard-coded position of Cells for each Player
    let idxStone = 0;
    let idxCell = 0;
    //* Player B (page top) *//
    let cells  = [];
    let stones = [];
    let c = color(20,100,100);
    // Back row: all Cells have two Stones
    for(let i = 0; i < 8 ; i++)
    {
      idxCell = i;
      let x = 75 + (7-i)*(2*RADIUS+25);
      let y = 85;
      cells.push(new Cell(x,y,RADIUS,c,idxCell));
      cells[idxCell].stones.push(new Stone(x,y,0.3*RADIUS,idxStone));
      idxStone++;
      cells[idxCell].stones.push(new Stone(x,y,0.3*RADIUS,idxStone));
      idxStone++;
    }

    // Front row: first four Cells have two Stones
    for(let i = 0; i < 8 ; i++)
    {
      idxCell = 8+i;
      let x =  75 + i*(2*RADIUS+25);
      let y = 110 + 2*RADIUS;
      cells.push(new FrontCell(x,y,RADIUS,c,idxCell));
      if( i < 4 )
      {
        cells[idxCell].stones.push(new Stone(x,y,0.3*RADIUS,idxStone));
        idxStone++;
        cells[idxCell].stones.push(new Stone(x,y,0.3*RADIUS,idxStone));
        idxStone++;
      }
      else {
        cells[idxCell].state = "EMPTY";
      }
    }
    // Create Player B
    this.opponent = new Player(cells,"RED");

    //* Player A (page bottom) *//
    cells = []; stones = [];
    c = color(210,100,100);

    // Back row: all Cells have two Stones
    for(let i = 0; i < 8 ; i++)
    {
      idxCell = i;
      let x =  75 + i*(2*RADIUS+25);
      let y = 410 + 2*RADIUS;
      cells.push(new Cell(x,y,RADIUS,c,idxCell));
      cells[idxCell].stones.push(new Stone(x,y,0.3*RADIUS,idxStone));
      idxStone++;
      cells[idxCell].stones.push(new Stone(x,y,0.3*RADIUS,idxStone));
      idxStone++;
    }

    // Front row: first four Cells have two Stones
    for(let i = 0; i < 8 ; i++)
    {
      idxCell = 8+i;
      let x = 75 + (7-i)*(2*RADIUS+25);
      let y = 385;
      cells.push(new FrontCell(x,y,RADIUS,c,idxCell));
      if( i < 4 )
      {
        cells[idxCell].stones.push(new Stone(x,y,0.3*RADIUS,idxStone));
        idxStone++;
        cells[idxCell].stones.push(new Stone(x,y,0.3*RADIUS,idxStone));
        idxStone++;
      }
      else
      {
        cells[idxCell].state = "EMPTY";
      }
    }
    // Create Player A
    this.player = new Player(cells,"BLUE");

    this.clickableCells = this.player.getFullCellsIdxs();
  } // end GameManager.createGame

  // GameManager.show
  show()
  {
    // Show Player status
    game.player.show();
    game.opponent.show();

    // Show remaining moves of each Player
    let blueMoves = game.player.moves;
    let redMoves  = game.opponent.moves;
    if (game.player.color == "RED")
    {
      blueMoves = game.opponent.moves;
      redMoves  = game.player.moves;
    }

    push();
    strokeWeight(5);
    stroke(300,0,0);
    rectMode(CENTER);
    textAlign(RIGHT, CENTER);
    textSize(32);
    fill(color(210,100,100)); // Bluish
    text("Remaining moves: " + blueMoves, 425, height/2);
    fill(color(20,100,100)); // Redish
    text("Remaining moves: " + redMoves, width-130, height/2);
    pop();
  } // end GameManager.show

  // GameManager.changeTurn
  changeTurn()
  {
    this.selectedCell = null;

    let temp = this.player;
    this.player   = this.opponent;
    this.opponent = temp;

    this.clickableCells = this.player.getFullCellsIdxs();
  } // end GameManager.changeTurn

  // GameManager.gameOverScreen
  gameOverScreen(winner)
  {
    // Game Over screen
    colorMode(RGB)
    fill(71,71,71,230);
    rect(0,0,width,height);
    fill(255);
    textAlign(CENTER,CENTER);
    textSize(72);
    text(winner,width/2,height/2);
  } // end GameManager.gameOverScreen

  // GameManager.checkClick
  checkClick(x,y)
  {
    // Check if Cell of current Player has been clicked
    // and do pertinent action if needed
    for(let cell of this.player.cells)
    {
      if(cell.isClicked(x, y))
      {
        if(cell.state == "FULL")
        {
          if(this.selectedCell != null)
          {
            this.player.cells[this.selectedCell].state = "FULL";
          }
          this.selectedCell = cell.index;
          cell.state = "SELECTED";
          this.cellSelected = true;
          this.standby = false;
          break;
        }
        else if(cell.state ==  "SELECTED")
        {
          this.cellSelected = false;
          this.cellActive   = true;

          let nextAction = this.player.passStones(cell.index,this.opponent);
          while (nextAction.isActive)
          {
            if(nextAction.isToSteal)
            {
              this.player.stealStones(nextAction.onIndex,this.opponent);
            }
            nextAction = this.player.passStones(nextAction.onIndex,this.opponent);
          }

          this.cellActive = false;
          this.standby = true;
          this.changeTurn();
          break;
        }
      }
    }
  } // end GameManager.checkClick

  // GameManager.isGameOver
  isGameOver()
  {
    if (this.player.moves == 0)
    {
      this.gameOverScreen(this.opponent.color+' wins!');
      this.standby = false;
      return true;
    }
    if (this.opponent.moves == 0)
    {
      this.gameOverScreen(this.player.color+' wins!');
      this.standby = false;
      return true;
    }
    return false;
  } // end GameManager.isGameOver
}
