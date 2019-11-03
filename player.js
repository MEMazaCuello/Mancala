class Player {
  // Player()
  constructor(cells, sColor) {
    this.cells = cells;
    this.color = sColor; // String
    this.moves = 12;
  } // end Player()

  // Player.show
  show(){
    for (let cell of this.cells)
    {
      cell.show();
    }
  } // end Player.show

  // Player.passStones
  passStones(idx,enemy)
  {
    let movingStones = [];
    let cell = this.cells[idx];
    cell.state = "ACTIVE";
    let i = 0;
    let nextIdx = 0;
    // Move one Stone to each next Cell
    while (cell.stones.length > 0)
    {
      i++;
      nextIdx = (idx+i)%16;
      // Pop Stone from current Cell and push it into target Cell
      let stone = this.moveStone(cell,nextIdx) // cellFrom, indexTo
      movingStones.push(stone);
      // Update target Cell state
      if(this.cells[nextIdx].state == "EMPTY" && this.cells[nextIdx].stones.length > 1)
      {
        this.cells[nextIdx].state = "FULL";
        this.moves++;
      }
    }
    // Current Cell is now Empty, thus the Player loses a move
    cell.state = "EMPTY";
    this.moves--;
    // Recursive call if last target Cell is Full
    let nextAction = {isToSteal: false, isActive: false, onIndex: nextIdx, stones: movingStones};
    if (this.cells[nextIdx].state == "FULL")
    {
      if (nextIdx > 7)
      {
        if (enemy.cells[this.cells[nextIdx].enemy].stones.length > 0)
        {
          nextAction.isToSteal = true;
        }
      }
      nextAction.isActive = true;
    }
    return nextAction;
  } // end Player.passStones

  // Player.stealStones
  stealStones(index,enemy)
  {
    // Steal Stones from enemy Cell
    let movingStones = [];
    let cell = enemy.cells[this.cells[index].enemy];
    if (cell.stones.length > 0)
    {
      while (cell.stones.length > 0)
      {
        let stone = this.moveStone(cell,index) // cellFrom, indexTo
        movingStones.push(stone);
      }
      // This check is necessary for the cases
      // when the Cell has only 1 (one) Stone
      if (cell.state != "EMPTY")
      {
        cell.state = "EMPTY";
        enemy.moves--;  // Loses one move iff 2 or more Stones
      }
      // Steal also from back row as well, if needed
      cell = enemy.cells[cell.back];
      while (cell.stones.length > 0)
      {
        let stone = this.moveStone(cell,index) // cellFrom, indexTo
        movingStones.push(stone);
      }
      // This check is necessary for the cases
      // when the Cell has only 1 (one) Stone
      if (cell.state != "EMPTY")
      {
        cell.state = "EMPTY";
        enemy.moves--;  // Loses one move iff 2 or more Stones
      }
      return movingStones;
    }
  } // end Player.stealStones

  // Player.moveStone
  moveStone(cellFrom,indexTo)
  {
    // Pop Stone from Cell and push it into target Cell
    let stone = cellFrom.stones.pop();
    stone.setTarget(this.cells[indexTo].x,this.cells[indexTo].y);
    stone.moving = true;
    this.cells[indexTo].stones.push(stone);
    return stone;
  } // end Player.moveStone

  // Player.getFullCellsIdxs()
  getFullCellsIdxs()
  {
    let indexes = [];
    for (let cell of this.cells)
    {
      if (cell.state == "FULL")
      {
        indexes.push(cell.index);
      }
    }
    return indexes;
  } // end Player.getFullCellsIdxs()
}
