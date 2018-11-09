import Input from './input';

export default class GameInfo {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.input = new Input();
    this.tileset = require('./resources/DLZP-Custom.json');
    this.tilemap = require('./resources/Map.json');
    this.tileImageWidth = Math.floor(this.tileset.imagewidth / this.tileset.tilewidth);
    this.numberOfTilesInMap = this.tilemap.width * this.tilemap.height;

    this.tileImage = new Image();
    this.ready = false;
    let gameInfo = this;
    this.tileImage.onload = function() {
      gameInfo.ready = true;
    };
    this.tileImage.src = this.tileset.image;
  }

  update(elapsed) {

  }

  render(elapsed, ctx) {
    if(this.ready) {
      for(let i = 0; i < this.numberOfTilesInMap; i++) {
        let tile = this.tilemap.layers[0].data[i] - 1;
        ctx.drawImage(
          this.tileImage,
          (tile % this.tileImageWidth) * 32,
          (Math.floor(tile / this.tileImageWidth) * 32),
          32,
          32,
          (i % this.tilemap.width) * 32,
          Math.floor(i / this.tilemap.width) * 32,
          32,
          32);
      }
    }
  }
}