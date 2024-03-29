class GameManager
{
  // GameManager()
  constructor()
  {
    this.selectedCell = null;
    this.state = GAME_STATES.standby;
    this.clickableCells = []; // array of indexes
    this.stones = []; // array of stones
    this.nextAction = null;
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
    for (let i = 0; i < 8 ; i++)
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
    for (let i = 0; i < 8 ; i++)
    {
      idxCell = 8+i;
      let x =  75 + i*(2*RADIUS+25);
      let y = 110 + 2*RADIUS;
      cells.push(new FrontCell(x,y,RADIUS,c,idxCell));
      if ( i < 4 )
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
    for (let i = 0; i < 8 ; i++)
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
    for (let i = 0; i < 8 ; i++)
    {
      idxCell = 8+i;
      let x = 75 + (7-i)*(2*RADIUS+25);
      let y = 385;
      cells.push(new FrontCell(x,y,RADIUS,c,idxCell));
      if ( i < 4 )
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
    this.player.show();
    this.opponent.show();
    this.showMoves();
  } // end GameManager.show

  // GameManager.showMoves
  showMoves()
  {
    // Show remaining moves of each Player
    let blueMoves = this.player.moves;
    let redMoves  = this.opponent.moves;
    if (this.player.color == "RED")
    {
      blueMoves = this.opponent.moves;
      redMoves  = this.player.moves;
    }
    // Draw
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
  } // end GameManager.showMoves

  // GameManager.changeTurn
  changeTurn()
  {
    // Empty
    this.selectedCell = null;
    this.nextAction   = null;
    this.stones       = [];
    // Swap players
    let temp = this.player;
    this.player   = this.opponent;
    this.opponent = temp;
    // Set player
    this.clickableCells = this.player.getFullCellsIdxs();
    this.state = GAME_STATES.standby;
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
    text(winner+' wins!',width/2,height/2);
  } // end GameManager.gameOverScreen

  // GameManager.checkClick
  checkClick(x,y)
  {
    // Check if Cell of current Player has been clicked
    for (const cellIdx of this.clickableCells)
    {
      if (this.player.cells[cellIdx].isClicked(x, y))
      {
        this.select(cellIdx);
        break;
      }
    }
  } // end GameManager.checkClick

  // GameManager.isGameOver
  isGameOver()
  {
    return (this.player.moves == 0 || this.opponent.moves == 0);
  } // end GameManager.isGameOver

  // GameManager.endGame
  endGame()
  {
    this.state = GAME_STATES.gameOver;
    this.clickableCells = [];
    let winner = (this.player.moves == 0)? this.opponent.color : this.player.color;
    this.gameOverScreen(winner);
  }// end GameManager.endGame

  // GameManager.select
  select(index)
  {
    // Select / activate clicked Cell
    if (this.selectedCell == null)
    {
      this.selectedCell = index;
      this.player.cells[index].state = "SELECTED";
      this.state = GAME_STATES.selected;
    } else if (index != this.selectedCell) {
      this.player.cells[this.selectedCell].state = "FULL"; // deselect previous
      this.selectedCell = index;
      this.player.cells[index].state = "SELECTED";
    } else {
      this.state = GAME_STATES.active;
    }
  } // end GameManager.select

  // GameManager.moving
  moving()
  {
    this.state = GAME_STATES.waiting;
    this.nextAction = this.player.passStones(this.selectedCell,this.opponent);
    this.selectedCell = this.nextAction.onIndex;
  } // end GameManager.moving

  // GameManager.stealing
  stealing()
  {
    this.state = GAME_STATES.stealing;
    this.nextAction.stones = this.player.stealStones(this.nextAction.onIndex,this.opponent);
    this.nextAction.isToSteal = false;
  } // end GameManager.stealing

  // GameManager.activating
  activating()
  {
    this.selectedCell = this.nextAction.onIndex;
    this.state = GAME_STATES.active;
  } // end GameManager.activating

  // GameManager.resolve
  resolve()
  {
    // Activate player's move
    if (this.hasBeenActivated())
    {
      this.moving();
      return;
    }
    // Resolve next action
    if (this.nextAction != null)
    {
      // Don't resolve if some stone keeps moving
      for (let stone of this.nextAction.stones)
      {
        if (stone.moving)
        {
          return; // Wait until animation is done
        }
      }
      // Launch next step: steal / move / game over / change turn
      if (this.nextAction.isActive)
      {
        if (this.nextAction.isToSteal)
        {
          this.stealing(); // Steal
          return;
        }
        this.activating(); // Move
      } else if (this.isWaiting()) {
        if (this.isGameOver())
        {
          this.endGame();  // Game Over
          noLoop();
        }
        this.changeTurn(); // Change turn
      }
    }
  } // end GameManager.resolve

  // GameManager.hasBeenActivated
  hasBeenActivated()
  {
    return (this.state == GAME_STATES.active);
  } // end GameManager.hasBeenActivated

  // GameManager.isWaitingInput
  isWaitingInput()
  {
    return (this.state == GAME_STATES.standby || this.state == GAME_STATES.selected);
  } // end GameManager.isWaitingInput

  // GameManager.isWaiting
  isWaiting()
  {
    return (this.state == GAME_STATES.waiting);
  } // end GameManager.isWaiting
}
