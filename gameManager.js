class GameManager
{
  constructor()
  {
    this.standby = true;
    this.cellSelected = false;
    this.cellActive = false;
    this.turn = "A";
    this.current = -1;
  }

  createGame()
  {
    let idxStone = 0;
    let idxCell = 0;
    //* Player 2 (top) *//
    let cells  = [];
    let stones = [];
    let c = color(20,100,100);
    // Back row
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

    // Front row
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

    this.playerB = new Player(cells);

    //* Player 1 (bottom) *//
    cells = []; stones = [];
    c = color(210,100,100);

    // Back row
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

    // Front row
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

    this.playerA = new Player(cells);
  }

  show()
  {
    game.playerA.show();
    game.playerB.show();

    push();
    let c = color(210,100,100);
    fill(c);
    strokeWeight(5);
    stroke(300,0,0);
    rectMode(CENTER);
    textAlign(RIGHT, CENTER);
    textSize(32);
    text("Remaining moves: " + game.playerA.moves, 425, height/2);
    c = color(20,100,100);
    fill(c);
    textAlign(RIGHT, CENTER);
    text("Remaining moves: " + game.playerB.moves, width-130, height/2);
    pop();
  }

  changeTurn()
  {
    this.current = -1;

    if(this.turn == "A")
    {
      this.turn = "B";
    }
    else if(this.turn == "B")
    {
      this.turn = "A";
    }
  }

  gameOver(winner)
  {
    colorMode(RGB)
    fill(71,71,71,230);
    rect(0,0,width,height);
    fill(255);
    textAlign(CENTER,CENTER);
    textSize(72);
    text(winner,width/2,height/2);
  }

  checkClick(player,x,y,enemy)
  {
    for(let cell of player.cells)
    {
      if(cell.isClicked(x, y))
      {
        if(cell.state == "FULL")
        {
          if(this.current != -1)
          {
            player.cells[this.current].state = "FULL";
          }
          this.current = cell.index;
          cell.state = "SELECTED";
          this.cellSelected = true;
          this.standby = false;
          break;
        }
        else if(cell.state ==  "SELECTED")
        {
          this.cellSelected = false;
          this.cellActive   = true;

          player.passStones(cell.index,enemy);

          this.cellActive = false;
          this.standby = true;
          this.changeTurn();
          break;
        }
      }
    }
  }
}
