export default class AudioElement extends HTMLElement {

  constructor() {

    super();
  }

  connect(node) {
    
    if(node instanceof AudioElement)
      this.getLastNode().connect(node.getFirstNode());
    else if(node instanceof AudioNode)
      this.getLastNode().connect(node);
    else 
      throw new Error("Node " + node + " cannot be connected!");
  }

  disconnect() {

    this.getLastNode.disconnect();
  }
}