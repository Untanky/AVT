import VisualizerElement from '../visualisation/visualizerElement.js'
import AudioPlayerElement from './audioPlayer.js'
import SourceSelectionElement from './sourceSelection.js'
import SourceSelection from './sourceSelection.js';
import { audioCtx } from '../globals/audioContext.js';

export default class AudioTrack extends HTMLElement {

  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});

    // create and setup style
    let styleElement = this.createStyle();
    
    // create and setup container with title 
    let audioTrackContainer = this.createContainerWithTitle();
    
    // create custom visualizer element
    this.visualizerElement = new VisualizerElement();
    
    audioTrackContainer.appendChild(this.visualizerElement)

    // create custom source selection 
    this.sourceSelection = new SourceSelection();

    audioTrackContainer.appendChild(this.sourceSelection);

    // create custom audio player element
    this.audioPlayer = new AudioPlayerElement();
    this.audioPlayer.setSourceFactory(this.sourceSelection.getSourceFactory());
    this.audioPlayer.connect(audioCtx.destination);

    audioTrackContainer.appendChild(this.audioPlayer);

    // setup shadow tree
    this.shadowRoot.appendChild(styleElement)
    this.shadowRoot.appendChild(audioTrackContainer);
  }

  createStyle() {

    let styleElement = document.createElement('style');
    styleElement.textContent = `
      .audio-track-container {
        max-width: 800px;
        background-color: white;
        margin: 2em auto;
        border-radius: 24px;
        padding: 2em;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
      }
    `;
    return styleElement;
  }

  createContainerWithTitle() {
    let container = document.createElement('div');
    container.setAttribute('class', 'audio-track-container');

    let trackTitle = document.createElement('h1');
    trackTitle.setAttribute('class', 'track-title');
    trackTitle.textContent = "Track " + this.getAttribute('number');

    container.appendChild(trackTitle);

    return container;
  }
}

customElements.define('audio-track', AudioTrack);