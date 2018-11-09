import GameInfo from './gameinfo';
import TestBackground from './testBackground';

export default class Game {

  constructor(width, height) {
    this.entities = [];

    this.gameInfo = new GameInfo(width, height);

    // Set up the back buffer
    this.backBuffer = document.createElement('canvas');
    this.backBuffer.width = width;
    this.backBuffer.height = height;
    this.backBufferCtx = this.backBuffer.getContext('2d');

    // Set up the screen buffer
    this.screenBuffer = document.createElement('canvas');
    this.screenBuffer.width = width;
    this.screenBuffer.height = height;
    this.screenBufferCtx = this.screenBuffer.getContext('2d');
    document.body.append(this.screenBuffer);
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  update(elapsedTime) {

    // Update game entities
    this.entities.forEach(entity => entity.update(elapsedTime, this.gameInfo));

    this.gameInfo.update(elapsedTime);
  }

  render(elapsedTime) {
    // Clear the back buffer
    this.backBufferCtx.fillStyle = "white";
    this.backBufferCtx.fillRect(0, 0, this.gameInfo.width, this.gameInfo.height);

    TestBackground.render(this.backBufferCtx, this.gameInfo.width, this.gameInfo.height);
    this.gameInfo.render(elapsedTime, this.backBufferCtx);

    // Render entities
    this.entities.forEach(entity => entity.render(elapsedTime, this.backBufferCtx));

    // Flip the back buffer
    this.screenBufferCtx.drawImage(this.backBuffer, 0, 0);
  }

  loop(timestamp) {
    var elapsedTime = this._frame_start ? timestamp - this._frame_start : 0;
    this.update(elapsedTime);
    this.render(elapsedTime);
    this._frame_start = timestamp;
    window.requestAnimationFrame((timestamp) => {this.loop(timestamp)});
  }
}
