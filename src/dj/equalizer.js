import AudioElement from "../audioElement.js";
import { audioCtx } from "../globals/audioContext.js";

const equalizerBandThresholds = [
  320, 3200
]

export default class EqualizerElement extends AudioElement {

  constructor() {

    super();

    this.shadow = this.attachShadow({mode: 'closed'});

    this.equalizer = new Equalizer();

    let style = this.createStyle();

    let container = document.createElement('div');
    container.setAttribute('class', 'container');

    for(let i = 0; i <= equalizerBandThresholds.length; i++) {
      let slider = document.createElement('input');
      slider.setAttribute('type', 'range');
      slider.setAttribute('min', -40);
      slider.setAttribute('max', 40);
      slider.setAttribute('step', 0.8);
      slider.setAttribute('value', 0);
      slider.addEventListener('input', () => this.onSliderChanged(i, slider.value))
      container.appendChild(slider);
    }

    this.shadow.appendChild(style);
    this.shadow.appendChild(container);
  }

  createStyle() {

    let style = document.createElement('style');
    style.textContent = `
      .container {
        transform: rotate(90deg)
      }
      
      input[type="range"] {
        display: block;
      }
    `;
    return style;
  }

  onSliderChanged(sliderId, value) {

    this.equalizer.setBandGain(sliderId, value);
  }

  getFirstNode() {
    return this.equalizer.getFirstNode();
  }

  getLastNode() {
    return this.equalizer.getLastNode();
  }
}

customElements.define('equalizer-element', EqualizerElement);

class Equalizer {

  constructor() {

    this.filters = []

    let lowShelf = audioCtx.createBiquadFilter();
    lowShelf.gain.value = 0
    lowShelf.frequency.value = equalizerBandThresholds[0];
    lowShelf.type = 'lowshelf';
    this.filters[0] = lowShelf;

    for(let i = 1; i < equalizerBandThresholds.length; i++) {
      let lowerThreshold = equalizerBandThresholds[i - 1];
      let higherThreshold = equalizerBandThresholds[i];
      
      let frequency = (lowerThreshold + higherThreshold) / 2;
      let q = Math.sqrt(lowerThreshold * higherThreshold) / (higherThreshold - lowerThreshold);

      let peakingFilter = audioCtx.createBiquadFilter();
      peakingFilter.gain.value = 0;
      peakingFilter.frequency.value = frequency;
      peakingFilter.Q.value = q;
      peakingFilter.type = 'peaking';

      this.filters[i - 1].connect(peakingFilter);
      this.filters[i] = peakingFilter;
    }
    
    let highShelf = audioCtx.createBiquadFilter();
    highShelf.gain.value = 0
    highShelf.frequency.value = equalizerBandThresholds[equalizerBandThresholds.length - 1];
    highShelf.type = 'highshelf';

    this.filters[this.filters.length - 1].connect(highShelf);
    this.filters[this.filters.length] = highShelf;
  }

  setBandGain(bandId, value) {

    this.filters[bandId].gain.value = value;
  }

  getFirstNode() {

    return this.filters[0];
  }

  getLastNode() {

    return this.filters[this.filters.length - 1];
  }
}