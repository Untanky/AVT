import AudioTrack from './dj/audioTrack.js'
import { audioCtx } from './globals/audioContext.js';

export default class App extends HTMLElement {

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    
    let styleElement = this.createStyle();

    let rootContainer = document.createElement('div');
    rootContainer.setAttribute('id', 'root-container');

    let title = document.createElement('h1');
    title.textContent = "DJ Tool";
    rootContainer.appendChild(title)

    let crossfaderLabel = document.createElement('label');
    crossfaderLabel.setAttribute('for', 'crossfader');
    crossfaderLabel.textContent = "Crossfader";
    rootContainer.appendChild(crossfaderLabel);

    this.crossfader = document.createElement('input');
    this.crossfader.setAttribute('type', 'range');
    this.crossfader.setAttribute('id', 'crossfader');
    this.crossfader.setAttribute('min', 0);
    this.crossfader.setAttribute('max', 1);
    this.crossfader.setAttribute('step', 0.01);
    this.crossfader.setAttribute('value', 0.5);
    this.crossfader.addEventListener('input', () => this.onCrossfaderChanged(this.crossfader.value))
    rootContainer.appendChild(this.crossfader);

    this.track1 = new AudioTrack();
    rootContainer.appendChild(this.track1);

    this.track2 = new AudioTrack();
    rootContainer.appendChild(this.track2);

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
        width: 1000px;
        margin: 0 auto;
      }

      #root-container h1 {
        text-align: center;
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
