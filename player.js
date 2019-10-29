class Player {
  constructor(cells) {
    this.cells = cells;
    this.moves = 12;
  }

  show(){
    for(let cell of this.cells)
    {
      cell.show();
    }
  }

  passStones(idx,enemy)
  {
    let cell = this.cells[idx];
    cell.state = "ACTIVE";
    let i = 0;
    let nextIdx = 0;
    while(cell.stones.length > 0)
    {
      i++;

      let stone = cell.stones.pop();
      nextIdx = (idx+i)%16;
      // set target destination
      stone.setTarget(this.cells[nextIdx].x,this.cells[nextIdx].y);
      this.cells[nextIdx].stones.push(stone);

      if(this.cells[nextIdx].state == "EMPTY" && this.cells[nextIdx].stones.length > 1)
      {
        this.cells[nextIdx].state = "FULL";
        this.moves++;
      }
    }
    cell.state = "EMPTY";
    this.moves--;

    if(this.cells[nextIdx].state == "FULL")
    {
      if(nextIdx > 7)
      {
        this.stealStones(nextIdx,enemy);
      }
      this.passStones(nextIdx,enemy);
    }
  }

  stealStones(index,enemy)
  {
    let cell = enemy.cells[this.cells[index].enemy];
    if(cell.stones.length > 0)
    {
      while(cell.stones.length > 0)
      {
        let stone = cell.stones.pop();
        stone.setTarget(this.cells[index].x,this.cells[index].y);
        this.cells[index].stones.push(stone);
      }
      if(cell.state != "EMPTY")
      {
        cell.state = "EMPTY";
        enemy.moves--;
      }

      cell = enemy.cells[cell.back];
      while(cell.stones.length > 0)
      {
        let stone = cell.stones.pop();
        stone.setTarget(this.cells[index].x,this.cells[index].y);
        this.cells[index].stones.push(stone);
      }
      if(cell.state != "EMPTY")
      {
        cell.state = "EMPTY";
        enemy.moves--;
      }
    }
  }
}
