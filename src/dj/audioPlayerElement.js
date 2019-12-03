import AudioPlayerNode from "./audioPlayerNode.js";


export default class AudioPlayer extends HTMLElement {
  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = this.render();

    this.audioPlayerNode = new AudioPlayerNode();
    
    this.setupInputElement();
  }
  
  setupInputElement() {
    /**
     * TODO: Extract input elements from html
     * 
     * this.playButton = this.shadow.querySelector('#play-button');
     * 
     * etc.
     */

     /**
      * TODO: Bind event listeners
      * 
      * this.playButton.addEventListener("click", onPlayClicked(), false);
      */
  }

  /**
   * TODO: Create Event Listeners for the controll element in the html
   * 
   * onPlayClick() { audioPlayerNode.play(); }
   */

  render() {
    /**
     * TODO: Create input element in html
     */
    return `
      <h2>Player</h2>
      `
  }

  getNode() {
    return this.audioPlayerNode;
  }
}

customElements.define('audio-player', AudioPlayer);