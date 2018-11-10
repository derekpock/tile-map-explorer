import Input from './input';

/// Information about the game's state, which is provided to each entity as their logic functions are called.
export default class GameInfo {

  /// Create the game info class, describing the canvas's width and height.
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.input = new Input();
    this.tilesetJson = require('./resources/DLZP-Custom.json'); // Imports JSON files into objects.
    this.tileImageWidth = Math.floor(this.tilesetJson.imagewidth / this.tilesetJson.tilewidth);

    /// Load the tileset. Create an array of properties for each tile type which can be easily queried.
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

    // Load the tilemap.
    this.tilemap = require('./resources/Map.json');
    this.numberOfTilesInMap = this.tilemap.width * this.tilemap.height;

    // Load the tileset image.
    this.tileImage = new Image();
    this.ready = false;
    this.tileImage.onload = (() => {
      this.ready = true;
    });
    this.tileImage.src = this.tilesetJson.image;
  }

  /// Update function for game info, if necessary.
  update(elapsed) {}

  /// Render the background of the world - the tilemap.
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

  /// Retrieve the tile object for a tile at the given coordinates.
  /// The y coordinate can be omitted if the tiles are being indexed by a single dimension.
  getTile(x, y) {
    if(y === undefined) {
      y = 0;
    }

    return this.tileset[
      this.tilemap.layers[0].data[x + (this.tilemap.width * y)] - 1];
  }
}