<<<<<<< HEAD
import AudioPlayer from './audioPlayer.js'

export default class AudioPlayerElement extends HTMLElement {

  constructor() {

    super();

    let shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.render();

    this.audioPlayer = new AudioPlayer();

    this.setupElements();
  }

  setupElements() {
    /**
     * TODO: Extract elements from HTML
     */
    this.playButton = this.shadowRoot.querySelector('#play-button');

    /**
     * TODO: Bind event handlers
     */
    this.playButton.addEventListener("click", () => this.onPlayClicked(), false);
  }

  /**
   * TODO: Create event handlers
   */
  onPlayClicked() {
    this.audioPlayer.play(); 
  }

  render() {
    /**
     * TODO: Create and style HTML element needed
     */

    return `
      <div>
        <h3>Audio Player</h3>
        <input id="play-button" type="button" value="Play"/>
      </div>
    `;
  }

  getAudioPlayer() {
    return this.audioPlayer;
  }
}

customElements.define('audio-player', AudioPlayerElement);
=======
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
>>>>>>> 61b4d31e80276a31f99ac8d912eb3f24646d3b90
