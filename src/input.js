
/// Takes and keeps track of user input.
export default class Input {

  constructor() {
    this.oldState = [];
    this.newState = [];

    window.addEventListener('keydown', (event) => {
      event.preventDefault();
      this.newState[event.key] = true;
    });

    window.addEventListener('keyup', (event) => {
      event.preventDefault();
      this.newState[event.key] = false;
    });

  }

  update() {
    this.oldState = this.newState.slice();
  }

  keyPressed(key) {
    return this.newState[key];
  }

  keyDown(key) {
    return this.newState[key] && !this.oldState[key];
  }

  keyUp(key) {
    return !this.newState[key] && this.oldState[key];
  }
}
