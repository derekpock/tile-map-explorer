export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.animationTimer = 0;
    this.animationDuration = 250;
    this.movementX = 0;
    this.movementY = 0;
  }

  update(deltaT, gameInfo) {
    if(this.animationTimer <= 0) {
      this.movementX = 0;
      this.movementY = 0;
      if(gameInfo.input.keyPressed("ArrowLeft")) {
        this.movementX = -1;
        this.x--;
        this.animationTimer = this.animationDuration;
      } else if (gameInfo.input.keyPressed("ArrowRight")) {
        this.movementX = 1;
        this.x++;
        this.animationTimer = this.animationDuration
      } else if (gameInfo.input.keyPressed("ArrowUp")) {
        this.movementY = -1;
        this.y--;
        this.animationTimer = this.animationDuration;
      } else if (gameInfo.input.keyPressed("ArrowDown")) {
        this.movementY = 1;
        this.y++;
        this.animationTimer = this.animationDuration;
      }
    }
    this.animationTimer -= deltaT;
  }

  render(deltaT, ctx) {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    let x = (this.x - (this.animationTimer / this.animationDuration) * this.movementX) * 32 + 16;
    let y = (this.y - (this.animationTimer / this.animationDuration) * this.movementY) * 32 + 16;
    ctx.arc(x, y, 16, 0, 2*Math.PI);
    ctx.fill();
  }

}
