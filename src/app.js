import AudioTrack from './dj/audioTrack.js'
import { audioCtx } from './globals/audioContext.js';
import { createElement, createStyle } from './globals/shadowTreeHelper.js';
import { getInputStyle } from './globals/inputStyles.js';

export default class App extends HTMLElement {

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    
    let styleElement = this.createStyle();
    createStyle(getInputStyle(), this.shadow);

    let rootContainer = document.createElement('div');
    rootContainer.setAttribute('id', 'root-container');

    let title = document.createElement('h1');
    title.textContent = "DJ Tool";
    rootContainer.appendChild(title)

    const crossfaderLabel = createElement('label', {for: 'crossfader'}, rootContainer, "Crossfader: ");

    this.crossfader = createElement('input', {type: 'range', id: 'crossfader', min: 0, max: 1, step: 0.01, value: 0.5}, rootContainer);
    this.crossfader.addEventListener('input', () => this.onCrossfaderChanged(this.crossfader.value));

    const trackContainer = createElement('div', {class: 'track-container'}, rootContainer);

    this.track1 = new AudioTrack();
    trackContainer.appendChild(this.track1);

    this.track2 = new AudioTrack();
    trackContainer.appendChild(this.track2);

    this.shadow.appendChild(styleElement);
    this.shadow.appendChild(rootContainer);

    this.gain1 = audioCtx.createGain();
    this.gain1.gain.value = 0.707;
    this.track1.connect(this.gain1);
    this.gain1.connect(audioCtx.destination);

    this.gain2 = audioCtx.createGain();
    this.gain2.gain.value = 0.707;
    this.track2.connect(this.gain2);
    this.gain2.connect(audioCtx.destination);
  }

  createStyle() {
    let style = document.createElement('style');
    style.textContent = `
      #root-container {
        width: 1500px;
        margin: 0 auto;
      }

      #root-container h1 {
        text-align: center;
      }

      #root-container h1 {
        text-align: center;
      }

      #crossfader {
        display: block;
      }

      .track-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-content: space-evenly;
      }

      audio-track {
        height: 100%;
        display: inline-block;
      }
    `;
    return style;
  }

  onCrossfaderChanged(value) {
    this.gain1.gain.value = Math.cos(value * 0.5*Math.PI);
    this.gain2.gain.value = Math.cos((1.0 - value) * 0.5*Math.PI);
  }
}

customElements.define('avt-app', App);
