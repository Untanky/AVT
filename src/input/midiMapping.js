class MidiMapping {

  constructor(){
    this.map = []
  }

  put(btnId, callback) {
    this.map[btnId] = callback
  }

  containsKey(btnId) {
    return this.map[btnId] !== undefined && this.map[btnId] !== null;
  }

  delete(btnId) {
    this.map[btnId] = undefined;
  }
 
  get(btnId) {
    this.map[btnId]
  }
}