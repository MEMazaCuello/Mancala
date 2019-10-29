class FrontCell extends Cell {
  constructor(x, y, r, c, idx) {
    super(x, y, r, c, idx);
    this.enemy = 23 - idx;
    this.back  = 15 - idx; 
  }
}
