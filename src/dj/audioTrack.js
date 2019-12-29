import AudioPlayerElement from './audioPlayerElement.js'
import TrackFilterElement from './trackFilterElement.js'
import SourceSelectionElement from './sourceSelectionElement.js'
import VisualizerElement from '../visualisation/visualizerElement.js'
import {audioCtx} from '../globals/audioContext.js';

export default class AudioTrack extends HTMLElement {

  constructor() {

    super();

    let shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.render();

    // get the child elements
    this.sourceNameDisplay = this.shadowRoot.querySelector('.song-display')
    this.visualizerElement = this.shadowRoot.querySelector('visualizer-element');
    this.sourceSelectionElement = this.shadowRoot.querySelector('source-selection');
    this.audioPlayerElement = this.shadowRoot.querySelector('audio-player');
    this.trackFilterElement = this.shadowRoot.querySelector('track-filter');

    // get the audio nodes
    this.visualizer = this.visualizerElement.getVisualizer();
    this.sourceSelection = this.sourceSelectionElement.getSourceSelection();
    this.audioPlayer = this.audioPlayerElement.getAudioPlayer();
    this.trackFilter = this.trackFilterElement.getTrackFilter();

    /**
     * TODO: figure out how to connect audio graph
     */
    this.visualizer.getAnalyserNode().connect(audioCtx.destination);
    this.audioPlayer.setDestination(this.visualizer.getAnalyserNode());
    this.sourceSelection.subscribeLastNodeChanged((type, value) => this.audioPlayer.setSource(value))
  }

  render() {
    return `
      <style>
        .track-container {
          padding: 2em;
          border-radius: 1em;
          margin: 1em 0;
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        }

        .track-container > h1 {
          text-align: left;
        }

        .track-container > h3 {
          text-align: left
        }
      </style>
      <div class="track-container">
        <h1>Track</h1>
        <h3>Currently playing: <span class="song-display"></span></h3>
        <visualizer-element></visualizer-element>
        <source-selection></source-selection>
        <audio-player></audio-player>
        <track-filter></track-filter>
      </div>
    `
  }
}

customElements.define('audio-track', AudioTrack);