import { audioCtx } from '../globals/audioContext.js';

export default class SourceSelection {

  constructor() {

    this.sourceNode = null;

    this.lastNodeChangedListeners = []

    this.bufferSource = audioCtx.createBufferSource();
    this.bufferSource.buffer = null;
  }

  setSource(type) {

    if (this.sourceNode != null)
      this.sourceNode.stop();
      
    this.type = "oscillator"
    this.sourceNode = audioCtx.createOscillator();
    this.sourceNode.frequency.value = 800;
    this.sourceNode.type = type;

    this.onLastNodeChanged();
  }

  setSourceAsFile() {

    try {
      this.sourceNode.stop();
    }
    catch(error) {
      console.log(error)
    }

    this.type = "buffer"
    this.sourceNode = audioCtx.createBufferSource();
    this.bufferSource.buffer = null;

    this.onLastNodeChanged();
  }

  setBuffer(audioBuffer) {
    this.sourceNode.buffer = audioBuffer;
  }

  canPlay() {
    return ((this.type === "buffer" && this.bufferSource.buffer !== null) || this.type === "oscillator")
  }

  getLastNode() {
    return this.sourceNode;
  }

  subscribeLastNodeChanged(listener) {
    this.lastNodeChangedListeners[this.lastNodeChangedListeners.length] = listener;
  }

  onLastNodeChanged(type) {
    for(let i = 0; i < this.lastNodeChangedListeners.length; i++) {
      this.lastNodeChangedListeners[i](type, this.sourceNode);
    }
  }
}