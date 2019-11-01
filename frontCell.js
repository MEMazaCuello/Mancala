class FrontCell extends Cell {
  // FrontCell()
  constructor(x, y, r, c, idx) {
    // FrontCell is just a Cell that
    // knows which Cell it has in front
    // (the enemy Cell) and which is back
    super(x, y, r, c, idx);
    this.enemy = 23 - idx;
    this.back  = 15 - idx;
  } // end FrontCell()
}
