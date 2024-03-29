class Stone
{
  // Stone()
  constructor(x, y, r, idx)
  {
    this.target = createVector(x+random(-r,r),y+random(-r,r));
    this.pos = createVector(x,y);
    this.vel = createVector(); //velocity
    this.acc = createVector(); //acceleration
    this.r   = r; // radius
    this.dA  = 2*r+random(8); // ellipse diameter A
    this.dB  = 2*r+random(8); // ellipse diameter B
    this.idx = idx; //index
    this.c   = color(random(0,359),100,100); // color HSB
    this.maxSpeed = 20;
    this.maxForce = 7;
    this.moving = false;
  } // end Stone()

  // Stone.show
  show()
  {
    colorMode(HSB);
    fill(this.c);
    stroke(0);
    strokeWeight(1.5);
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.dA, this.dB);
  } // Stone.show

  // Stone.shake
  shake(xCell, yCell, rCell)
  {
    let disp = 0.05*this.r;
    let rbuf = 0.6*rCell;
    // This may be rewritten with Vector.limit
    this.pos.x = constrain(this.pos.x+random(-disp,disp),xCell-rbuf,xCell+rbuf);
    this.pos.y = constrain(this.pos.y+random(-disp,disp),yCell-rbuf,yCell+rbuf);
  } // end Stone.shake

  // Stone.setTarget
  setTarget(targetx,targety)
  {
    this.target.set(targetx+random(-this.r,this.r),targety+random(-this.r,this.r));
  } // end Stone.setTarget

  // Stone.move
  move(targetx,targety)
  {
    let force = this.arrive();
    this.acc.add(force);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  } // end Stone.move

  // Stone.applyForce
  applyForce(force)
  {
    this.acc.add(force);
  } // end Stone.applyForce

  // Stone.arrive
  arrive()
  {
    let diff = p5.Vector.sub(this.target, this.pos);
    let d = diff.mag();
    let speed = this.maxSpeed;
    if (d < this.r)
    {
      this.moving = false;
      speed = map(d,0,this.r,0,this.maxSpeed);
    }
    diff.setMag(speed);
    let steer = p5.Vector.sub(diff, this.vel);
    steer.limit(this.maxForce);
    return steer;
  } // end Stone.arrive

  // Stone.update
  update()
  {
    this.move();
    this.show();
  } // end Stone.update
}
