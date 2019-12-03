export default class TrackFilterNode extends AudioNode {

  firstNode
  lastNode
  connectedNode = null

  constructor() {

    this.setupAudioGraph()
    this.setLastNode(/* TODO: set the last node of the graph */);
  }

  setupAudioGraph() {
    // TODO: setup audio graph
  }

  connect(audioNode) {
    this.lastNode.connect(audioNode);
    this.connectedNode = audioNode;
  }

  disconnect() {
    this.lastNode.disconnect();
    this.connectedNode = null;
  }

  /**
   * TODO: Setter for the changeable values of the audio Graph
   * 
   * setLowFilterGain(value) { ... }
   * 
   * setMidFilterGain(value) { ... }
   * 
   * setHighFilterGain(value) { ... }
   * 
   * etc
   */

  getFirstNode() {
    return this.firstNode;
  }

  setLastNode(audioNode) {
    this.lastNode.disconnect();
    this.lastNode = audioNode;
    if(isConnected()) {
      this.lastNode.connect(this.connectedNode)
    }
  }
}