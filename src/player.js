/// Defines a player class
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

    // Load player image.
    this.playerImage = new Image();
    this.ready = false;
    this.playerImage.onload = (() => {
      this.ready = true;
    });
    this.playerImage.src = "seth.png";
  }

  /// Update the player, moving them if necessary and calculating animations.
  update(deltaT, gameInfo) {
    if(this.movementTimer <= 0) {
      // Movement is only allowed when previous movement has finished
      this.movementX = 0;
      this.movementY = 0;

      // Check if the tile in the requested direction is passable, then set various animation and movement variables.
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

    // If we are standing in a tile marked with water properties, cut off the lower part of the character to make it
    // look like they are wading in the water.
    if(gameInfo.getTile(this.x, this.y)["water"]) {
      this.playerHeightToDraw = 24;
    } else {
      this.playerHeightToDraw = 32;
    }
  }

  /// Render the player.
  render(deltaT, ctx) {
    // Coordinates of the center of the tile the user is on.
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
