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