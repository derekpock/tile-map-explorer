export default class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.movementTimer = 0;
    this.movementDuration = 200;
    this.animationTimer = 0;
    this.animationDelayPerFrame = 50;
    this.movementX = 0;
    this.movementY = 0;
    this.faceDirection = 2;
    this.playerHeightToDraw = 32;
    this.playerImage = new Image();
    this.ready = false;
    this.playerImage.onload = ((ev) => {
      this.ready = true;
    });
    this.playerImage.src = "seth.png";
  }

  update(deltaT, gameInfo) {
    if(this.movementTimer <= 0) {
      this.movementX = 0;
      this.movementY = 0;
      if(gameInfo.input.keyPressed("ArrowLeft")) {
        if(gameInfo.getTile(this.x - 1, this.y)["passable"]) {
          this.movementX = -1;
          this.x--;
          this.movementTimer = this.movementDuration;
          this.faceDirection = 3;
          this.animationTimer = 0;
        }
      } else if (gameInfo.input.keyPressed("ArrowRight")) {
        if(gameInfo.getTile(this.x + 1, this.y)["passable"]) {
          this.movementX = 1;
          this.x++;
          this.movementTimer = this.movementDuration;
          this.faceDirection = 1;
          this.animationTimer = 0;
        }
      } else if (gameInfo.input.keyPressed("ArrowUp")) {
        if(gameInfo.getTile(this.x, this.y - 1)["passable"]) {
          this.movementY = -1;
          this.y--;
          this.movementTimer = this.movementDuration;
          this.faceDirection = 0;
          this.animationTimer = 0;
        }
      } else if (gameInfo.input.keyPressed("ArrowDown")) {
        if(gameInfo.getTile(this.x, this.y + 1)["passable"]) {
          this.movementY = 1;
          this.y++;
          this.movementTimer = this.movementDuration;
          this.faceDirection = 2;
          this.animationTimer = 0;
        }
      }
    }
    this.movementTimer -= deltaT;

    if(gameInfo.getTile(this.x, this.y)["water"]) {
      this.playerHeightToDraw = 24;
    } else {
      this.playerHeightToDraw = 32;
    }
  }

  render(deltaT, ctx) {
    let x = (this.x - (this.movementTimer / this.movementDuration) * this.movementX) * 32 + 16;
    let y = (this.y - (this.movementTimer / this.movementDuration) * this.movementY) * 32 + 16;

    // Debug player location with a blue circle.
    // ctx.fillStyle = "blue";
    // ctx.beginPath();
    // ctx.arc(x, y, 16, 0, 2*Math.PI);
    // ctx.fill();

    // Seth image is 24x32 pixels, so we have an additional 6 pixel offset to put him in the middle of the tile.
    // We also calculated x and y from above for center circle, so there's an offset there as well.

    let imageX;
    let imageY = 32 * this.faceDirection;
    if(this.movementTimer > 0) {
      this.animationTimer += deltaT;
      imageX = 24 * (Math.floor(this.animationTimer / this.animationDelayPerFrame) % 3);
    } else {
      imageX = 24;
    }

    ctx.drawImage(this.playerImage, imageX, imageY, 24, this.playerHeightToDraw, x - 12, y - 16, 24, this.playerHeightToDraw);
  }

}
