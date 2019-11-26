import AudioPlayer from './audioPlayerElement.js'
import Slider from '../tools/slider.js'
import Visualizer from '../visualisation/visualizer.js'
import TrackFilterElement from './trackFilterElement.js'

export default class Track extends HTMLElement {

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = this.render();

    this.context = new AudioContext();

    this.audioPlayer = this.shadow.querySelector('#audio-player');

    this.trackFilter = this.shadow.querySelector('#track-filter')
  }

  render() {
    return `
      <style>
        .container {
          background-color: white;
          padding: 2em;
          border-radius: 2em;
          box-shadow: 0px 8px 16px 8px rgba(0, 0, 0, 0.2);
        }
      </style>
      <div class="container">
        <audio-player id="audio-player"></audio-player>
        <track-filter id="track-filter"></track-filter>
      </div>
    `
  }

  /**
   * Draw the visualization
   */
  draw() {
    // acutal visualization
    visualizer.draw();
  }
}

customElements.define('audio-track', Track);