import AudioPlayerElement from './audioPlayerElement.js'
import TrackFilterElement from './trackFilterElement.js'
import SourceSelectionElement from './sourceSelectionElement.js'
import {audioCtx} from '../globals/audioContext.js';

export default class AudioTrack extends HTMLElement {

  constructor() {

    super();

    let shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.render();

    this.sourceSelectionElement = this.shadowRoot.querySelector('source-selection');
    this.audioPlayerElement = this.shadowRoot.querySelector('audio-player');
    this.trackFilterElement = this.shadowRoot.querySelector('track-filter');

    this.sourceSelection = this.sourceSelectionElement.getSourceSelection();
    this.audioPlayer = this.audioPlayerElement.getAudioPlayer();
    this.trackFilter = this.trackFilterElement.getTrackFilter();

    /**
     * TODO: figure out how to connect audio graph
     */
    this.audioPlayer.setDestination(audioCtx.destination);
    this.sourceSelection.subscribeLastNodeChanged((type, value) => this.audioPlayer.setSource(value))
  }

  render() {
    return `
      <div>
        <h2>Track</h2>
        <source-selection></source-selection>
        <audio-player></audio-player>
        <track-filter></track-filter>
      </div>
    `
  }
}

customElements.define('audio-track', AudioTrack);