class Cell
{
  // Cell()
  constructor(x, y, r, c, idx)
  {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c; // color
    this.index = idx;
    this.state = "FULL";
    this.stones = [];
  } // end Cell()

  // Cell.show
  show()
  {
    // Different colours depending on cell state
    if (this.state == "SELECTED")
    {
      push();
      fill(120,100,100);
      strokeWeight(10);
      stroke(120,50,50);
      ellipseMode(CENTER);
      ellipse(this.x, this.y, 2*this.r);
      pop();

      for (let stone of this.stones)
      {
        //stone.shake(this.x, this.y, this.r);
        stone.update();
      }

      push();
      fill(300,0,100);
      strokeWeight(5);
      stroke(300,0,0);
      rectMode(CENTER);
      textAlign(CENTER, CENTER);
      textSize(48);
      text(this.stones.length, this.x, this.y);
      pop();

    }
    else
    {
      push();
      fill(this.c);
      stroke(0);
      strokeWeight(2)
      ellipseMode(CENTER);
      ellipse(this.x, this.y, 2*this.r);
      pop();

      for (let stone of this.stones)
      {
        stone.update();
      }
    }
  } // end Cell.show

  // Cell.isClicked
  isClicked(x,y)
  {
    // Mouse position projection
    return sq(this.x - x) + sq(this.y - y) < this.r*this.r;
  } // end Cell.isClicked

  isNowFull()
  {
    if (this.state == "EMPTY" && this.stones.length > 1)
    {
      this.state = "FULL";
      return true;
    }
    return false;
  }

}
