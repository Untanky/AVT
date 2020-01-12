class MidiMapping {

  constructor(){
    this.map = new Map();
  }

  put(btnId, callback) {
    this.map.set(btnId,callback);
    //this.map[btnId] = callback
  }

  containsKey(btnId) {
    return this.map.has(btnId);
    //return this.map[btnId] !== undefined && this.map[btnId] !== null;
  }

  delete(btnId) {
    this.map[btnId] = undefined;
  }
 
  get(btnId) {
    return this.map.get(btnId);
  }
}

export default MidiMapping;