export default class TrackAudioNode extends AudioNode, HTMLElement {

  connectedNode = null
  lastNode

  constructor() {
    super();

    this.setupAudioGraph
    // TODO: set last node of audio graph
    // lastNode = ...
  }

  setupAudioGraph() {
    // TODO: sets up the audio graph
  }

  connect(audioNode) {
    this.lastNode.connect(audioNode);
    this.isConnected = true;
  }

  disconnect() {
    this.lastNode.disconnect();
    this.isConnected = false;
  }

  idConnected() {
    return this.connectedNode === null;
  }

  render
}