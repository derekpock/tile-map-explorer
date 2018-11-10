/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _gameinfo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameinfo */ \"./src/gameinfo.js\");\n\r\n\r\nclass Game {\r\n\r\n  constructor(width, height) {\r\n    this.entities = [];\r\n\r\n    this.gameInfo = new _gameinfo__WEBPACK_IMPORTED_MODULE_0__[\"default\"](width, height);\r\n\r\n    // Set up the back buffer\r\n    this.backBuffer = document.createElement('canvas');\r\n    this.backBuffer.width = width;\r\n    this.backBuffer.height = height;\r\n    this.backBufferCtx = this.backBuffer.getContext('2d');\r\n\r\n    // Set up the screen buffer\r\n    this.screenBuffer = document.createElement('canvas');\r\n    this.screenBuffer.width = width;\r\n    this.screenBuffer.height = height;\r\n    this.screenBufferCtx = this.screenBuffer.getContext('2d');\r\n    document.body.append(this.screenBuffer);\r\n  }\r\n\r\n  addEntity(entity) {\r\n    this.entities.push(entity);\r\n  }\r\n\r\n  update(elapsedTime) {\r\n\r\n    // Update game entities\r\n    this.entities.forEach(entity => entity.update(elapsedTime, this.gameInfo));\r\n\r\n    this.gameInfo.update(elapsedTime);\r\n  }\r\n\r\n  render(elapsedTime) {\r\n    // Clear the back buffer\r\n    this.backBufferCtx.fillStyle = \"white\";\r\n    this.backBufferCtx.fillRect(0, 0, this.gameInfo.width, this.gameInfo.height);\r\n\r\n    this.gameInfo.render(elapsedTime, this.backBufferCtx);\r\n\r\n    // Render entities\r\n    this.entities.forEach(entity => entity.render(elapsedTime, this.backBufferCtx));\r\n\r\n    // Flip the back buffer\r\n    this.screenBufferCtx.drawImage(this.backBuffer, 0, 0);\r\n  }\r\n\r\n  loop(timestamp) {\r\n    var elapsedTime = this._frame_start ? timestamp - this._frame_start : 0;\r\n    this.update(elapsedTime);\r\n    this.render(elapsedTime);\r\n    this._frame_start = timestamp;\r\n    window.requestAnimationFrame((timestamp) => {this.loop(timestamp)});\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/gameinfo.js":
/*!*************************!*\
  !*** ./src/gameinfo.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return GameInfo; });\n/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ \"./src/input.js\");\n\r\n\r\n/// Information about the game's state, which is provided to each entity as their logic functions are called.\r\nclass GameInfo {\r\n\r\n  /// Create the game info class, describing the canvas's width and height.\r\n  constructor(width, height) {\r\n    this.width = width;\r\n    this.height = height;\r\n    this.input = new _input__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    this.tilesetJson = __webpack_require__(/*! ./resources/DLZP-Custom.json */ \"./src/resources/DLZP-Custom.json\"); // Imports JSON files into objects.\r\n    this.tileImageWidth = Math.floor(this.tilesetJson.imagewidth / this.tilesetJson.tilewidth);\r\n\r\n    /// Load the tileset. Create an array of properties for each tile type which can be easily queried.\r\n    this.tileset = [];\r\n    for(let i = 0; i < this.tilesetJson.tiles.length; i++) {\r\n      let properties = [];\r\n      properties[\"id\"] = i;\r\n      let jsonProperties = this.tilesetJson.tiles[i].properties;\r\n      for(let j = 0; j < jsonProperties.length; j++) {\r\n        properties[jsonProperties[j].name] = jsonProperties[j].value;\r\n      }\r\n      properties[\"imageX\"] = (i % this.tileImageWidth) * 32;\r\n      properties[\"imageY\"] = Math.floor(i / this.tileImageWidth) * 32;\r\n      this.tileset[i] = properties;\r\n    }\r\n\r\n    // Load the tilemap.\r\n    this.tilemap = __webpack_require__(/*! ./resources/Map.json */ \"./src/resources/Map.json\");\r\n    this.numberOfTilesInMap = this.tilemap.width * this.tilemap.height;\r\n\r\n    // Load the tileset image.\r\n    this.tileImage = new Image();\r\n    this.ready = false;\r\n    this.tileImage.onload = (() => {\r\n      this.ready = true;\r\n    });\r\n    this.tileImage.src = this.tilesetJson.image;\r\n  }\r\n\r\n  /// Update function for game info, if necessary.\r\n  update(elapsed) {}\r\n\r\n  /// Render the background of the world - the tilemap.\r\n  render(elapsed, ctx) {\r\n    if(this.ready) {\r\n      for(let i = 0; i < this.numberOfTilesInMap; i++) {\r\n        let tile = this.getTile(i);\r\n        ctx.drawImage(\r\n          this.tileImage,\r\n          tile[\"imageX\"],\r\n          tile[\"imageY\"],\r\n          32,\r\n          32,\r\n          (i % this.tilemap.width) * 32,\r\n          Math.floor(i / this.tilemap.width) * 32,\r\n          32,\r\n          32);\r\n      }\r\n    }\r\n  }\r\n\r\n  /// Retrieve the tile object for a tile at the given coordinates.\r\n  /// The y coordinate can be omitted if the tiles are being indexed by a single dimension.\r\n  getTile(x, y) {\r\n    if(y === undefined) {\r\n      y = 0;\r\n    }\r\n\r\n    return this.tileset[\r\n      this.tilemap.layers[0].data[x + (this.tilemap.width * y)] - 1];\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/gameinfo.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n\r\n\r\n\r\n// Create the game\r\nvar game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](1024, 768);\r\n\r\n// Create the player and add it to the game\r\ngame.addEntity(new _player__WEBPACK_IMPORTED_MODULE_1__[\"default\"](10, 10));\r\n\r\n// Start the main game loop\r\ngame.loop();\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Input; });\n\r\n/// Takes and keeps track of user input.\r\nclass Input {\r\n\r\n  constructor() {\r\n    this.oldState = [];\r\n    this.newState = [];\r\n\r\n    window.addEventListener('keydown', (event) => {\r\n      event.preventDefault();\r\n      this.newState[event.key] = true;\r\n    });\r\n\r\n    window.addEventListener('keyup', (event) => {\r\n      event.preventDefault();\r\n      this.newState[event.key] = false;\r\n    });\r\n\r\n  }\r\n\r\n  update() {\r\n    this.oldState = this.newState.slice();\r\n  }\r\n\r\n  keyPressed(key) {\r\n    return this.newState[key];\r\n  }\r\n\r\n  keyDown(key) {\r\n    return this.newState[key] && !this.oldState[key];\r\n  }\r\n\r\n  keyUp(key) {\r\n    return !this.newState[key] && this.oldState[key];\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/input.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\n/// Defines a player class\r\nclass Player {\r\n  constructor(x, y) {\r\n    this.x = x;\r\n    this.y = y;\r\n    this.movementTimer = 0;\r\n    this.movementDuration = 200;\r\n    this.animationTimer = 0;\r\n    this.animationDelayPerFrame = 50;\r\n    this.movementX = 0;\r\n    this.movementY = 0;\r\n    this.faceDirection = 2;\r\n    this.playerHeightToDraw = 32;\r\n\r\n    // Load player image.\r\n    this.playerImage = new Image();\r\n    this.ready = false;\r\n    this.playerImage.onload = (() => {\r\n      this.ready = true;\r\n    });\r\n    this.playerImage.src = \"seth.png\";\r\n  }\r\n\r\n  /// Update the player, moving them if necessary and calculating animations.\r\n  update(deltaT, gameInfo) {\r\n    if(this.movementTimer <= 0) {\r\n      // Movement is only allowed when previous movement has finished\r\n      this.movementX = 0;\r\n      this.movementY = 0;\r\n\r\n      // Check if the tile in the requested direction is passable, then set various animation and movement variables.\r\n      if(gameInfo.input.keyPressed(\"ArrowLeft\")) {\r\n        if(gameInfo.getTile(this.x - 1, this.y)[\"passable\"]) {\r\n          this.movementX = -1;\r\n          this.x--;\r\n          this.movementTimer = this.movementDuration;\r\n          this.faceDirection = 3;\r\n          this.animationTimer = 0;\r\n        }\r\n      } else if (gameInfo.input.keyPressed(\"ArrowRight\")) {\r\n        if(gameInfo.getTile(this.x + 1, this.y)[\"passable\"]) {\r\n          this.movementX = 1;\r\n          this.x++;\r\n          this.movementTimer = this.movementDuration;\r\n          this.faceDirection = 1;\r\n          this.animationTimer = 0;\r\n        }\r\n      } else if (gameInfo.input.keyPressed(\"ArrowUp\")) {\r\n        if(gameInfo.getTile(this.x, this.y - 1)[\"passable\"]) {\r\n          this.movementY = -1;\r\n          this.y--;\r\n          this.movementTimer = this.movementDuration;\r\n          this.faceDirection = 0;\r\n          this.animationTimer = 0;\r\n        }\r\n      } else if (gameInfo.input.keyPressed(\"ArrowDown\")) {\r\n        if(gameInfo.getTile(this.x, this.y + 1)[\"passable\"]) {\r\n          this.movementY = 1;\r\n          this.y++;\r\n          this.movementTimer = this.movementDuration;\r\n          this.faceDirection = 2;\r\n          this.animationTimer = 0;\r\n        }\r\n      }\r\n    }\r\n    this.movementTimer -= deltaT;\r\n\r\n    // If we are standing in a tile marked with water properties, cut off the lower part of the character to make it\r\n    // look like they are wading in the water.\r\n    if(gameInfo.getTile(this.x, this.y)[\"water\"]) {\r\n      this.playerHeightToDraw = 24;\r\n    } else {\r\n      this.playerHeightToDraw = 32;\r\n    }\r\n  }\r\n\r\n  /// Render the player.\r\n  render(deltaT, ctx) {\r\n    // Coordinates of the center of the tile the user is on.\r\n    let x = (this.x - (this.movementTimer / this.movementDuration) * this.movementX) * 32 + 16;\r\n    let y = (this.y - (this.movementTimer / this.movementDuration) * this.movementY) * 32 + 16;\r\n\r\n    // Debug player location with a blue circle.\r\n    // ctx.fillStyle = \"blue\";\r\n    // ctx.beginPath();\r\n    // ctx.arc(x, y, 16, 0, 2*Math.PI);\r\n    // ctx.fill();\r\n\r\n    // Seth image is 24x32 pixels, so we have an additional 6 pixel offset to put him in the middle of the tile.\r\n    // We also calculated x and y from above for center circle, so there's an offset there as well.\r\n    let imageX;\r\n    let imageY = 32 * this.faceDirection;\r\n    if(this.movementTimer > 0) {\r\n      this.animationTimer += deltaT;\r\n      imageX = 24 * (Math.floor(this.animationTimer / this.animationDelayPerFrame) % 3);\r\n    } else {\r\n      imageX = 24;\r\n    }\r\n\r\n    ctx.drawImage(this.playerImage, imageX, imageY, 24, this.playerHeightToDraw, x - 12, y - 16, 24, this.playerHeightToDraw);\r\n  }\r\n\r\n}\r\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/resources/DLZP-Custom.json":
/*!****************************************!*\
  !*** ./src/resources/DLZP-Custom.json ***!
  \****************************************/
/*! exports provided: columns, image, imageheight, imagewidth, margin, name, spacing, tilecount, tiledversion, tileheight, tiles, tilewidth, type, version, default */
/***/ (function(module) {

eval("module.exports = {\"columns\":4,\"image\":\"tiles.png\",\"imageheight\":128,\"imagewidth\":128,\"margin\":0,\"name\":\"DLZP-Custom\",\"spacing\":0,\"tilecount\":16,\"tiledversion\":\"1.2.0\",\"tileheight\":32,\"tiles\":[{\"id\":0,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":true},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":1,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":true},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":2,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":true},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":3,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":4,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":true}]},{\"id\":5,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":true},{\"name\":\"water\",\"type\":\"bool\",\"value\":true}]},{\"id\":6,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":7,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":8,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":9,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":10,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":11,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":12,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":13,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":14,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":15,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]}],\"tilewidth\":32,\"type\":\"tileset\",\"version\":1.2};\n\n//# sourceURL=webpack:///./src/resources/DLZP-Custom.json?");

/***/ }),

/***/ "./src/resources/Map.json":
/*!********************************!*\
  !*** ./src/resources/Map.json ***!
  \********************************/
/*! exports provided: height, infinite, layers, nextlayerid, nextobjectid, orientation, renderorder, tiledversion, tileheight, tilesets, tilewidth, type, version, width, default */
/***/ (function(module) {

eval("module.exports = {\"height\":24,\"infinite\":false,\"layers\":[{\"data\":[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,6,6,6,6,6,6,6,2,2,2,2,2,2,2,6,6,6,6,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,6,2,2,6,6,6,6,6,6,5,5,5,5,5,6,2,2,2,2,2,2,2,2,2,3,3,3,3,3,2,2,2,2,2,2,2,2,2,6,6,6,6,5,5,5,6,6,2,2,3,3,3,3,3,3,3,3,1,1,3,3,3,3,3,3,3,4,2,2,2,2,2,6,6,5,5,5,6,6,2,2,3,3,3,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,6,6,5,5,6,6,2,2,3,3,1,4,4,1,1,3,3,2,2,2,2,2,2,2,3,3,3,1,1,3,2,2,6,6,5,5,6,2,2,2,3,1,1,4,4,3,3,3,2,2,6,6,6,6,6,2,2,3,1,4,1,1,3,2,2,6,5,5,6,2,2,2,3,1,1,3,3,2,2,2,2,6,6,6,6,6,6,6,2,3,1,1,1,1,3,2,2,6,5,5,6,2,2,2,3,4,1,3,3,2,2,6,6,6,6,2,2,2,6,6,6,2,3,1,1,1,3,2,2,6,5,5,6,6,2,2,3,3,3,2,2,2,6,6,6,6,2,2,3,2,2,2,2,2,3,1,4,4,3,2,2,6,5,5,6,6,2,2,2,2,2,2,6,6,6,6,6,6,2,3,3,3,3,2,2,3,3,1,4,4,3,3,2,6,5,5,5,6,2,2,2,2,2,2,6,6,6,6,6,2,2,3,3,1,3,3,3,3,1,1,1,1,3,2,2,6,5,5,5,6,6,2,2,4,2,2,2,6,6,6,6,2,3,3,3,4,4,1,1,1,1,1,3,3,3,2,2,6,5,5,6,6,6,2,2,2,2,2,2,6,6,6,6,2,2,3,3,4,4,1,1,1,1,3,3,3,2,2,6,6,5,5,6,6,6,6,2,2,2,2,6,6,6,6,6,2,2,3,3,1,3,3,3,3,3,3,3,2,2,6,6,6,5,5,5,5,5,6,6,2,2,6,6,6,5,6,6,6,2,2,3,3,3,2,2,2,2,2,2,2,6,6,6,5,5,5,5,5,5,6,6,6,6,6,5,5,5,5,6,6,6,2,2,2,2,2,2,2,2,2,6,6,6,6,5,5,5,5,5,5,5,5,5,5,6,6,5,5,5,5,6,6,6,6,6,2,6,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],\"height\":24,\"id\":1,\"name\":\"Tile Layer 1\",\"opacity\":1,\"type\":\"tilelayer\",\"visible\":true,\"width\":32,\"x\":0,\"y\":0}],\"nextlayerid\":2,\"nextobjectid\":1,\"orientation\":\"orthogonal\",\"renderorder\":\"right-down\",\"tiledversion\":\"1.2.0\",\"tileheight\":32,\"tilesets\":[{\"firstgid\":1,\"source\":\"DLZP-Custom.tsx\"}],\"tilewidth\":32,\"type\":\"map\",\"version\":1.2,\"width\":32};\n\n//# sourceURL=webpack:///./src/resources/Map.json?");

/***/ })

/******/ });