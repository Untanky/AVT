export default class AudioElements extends HTMLElement {

  constructor() {

    super();
  }

  connect(node) {
    
    if(node instanceof AudioElements)
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