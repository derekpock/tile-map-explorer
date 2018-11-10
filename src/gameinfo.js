import Input from './input';

export default class GameInfo {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.input = new Input();
    this.tilesetJson = require('./resources/DLZP-Custom.json');
    this.tileImageWidth = Math.floor(this.tilesetJson.imagewidth / this.tilesetJson.tilewidth);

    this.tileset = [];
    for(let i = 0; i < this.tilesetJson.tiles.length; i++) {
      let properties = [];
      properties["id"] = i;
      let jsonProperties = this.tilesetJson.tiles[i].properties;
      for(let j = 0; j < jsonProperties.length; j++) {
        properties[jsonProperties[j].name] = jsonProperties[j].value;
      }
      properties["imageX"] = (i % this.tileImageWidth) * 32;
      properties["imageY"] = Math.floor(i / this.tileImageWidth) * 32;
      this.tileset[i] = properties;
    }

    this.tilemap = require('./resources/Map.json');
    this.numberOfTilesInMap = this.tilemap.width * this.tilemap.height;

    this.tileImage = new Image();
    this.ready = false;
    let gameInfo = this;
    this.tileImage.onload = function() {
      gameInfo.ready = true;
    };
    this.tileImage.src = this.tilesetJson.image;
  }

  update(elapsed) {

  }

  render(elapsed, ctx) {
    if(this.ready) {
      for(let i = 0; i < this.numberOfTilesInMap; i++) {
        let tile = this.getTile(i);
        ctx.drawImage(
          this.tileImage,
          tile["imageX"],
          tile["imageY"],
          32,
          32,
          (i % this.tilemap.width) * 32,
          Math.floor(i / this.tilemap.width) * 32,
          32,
          32);
      }
    }
  }

  getTile(x, y) {
    if(y === undefined) {
      y = 0;
    }

    return this.tileset[
      this.tilemap.layers[0].data[x + (this.tilemap.width * y)] - 1];
  }
}