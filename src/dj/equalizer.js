import AudioElement from "../audioElement.js";
import { audioCtx } from "../globals/audioContext.js";
import { createElement } from '../globals/shadowTreeHelper.js';

const equalizerBandThresholds = [
  100, 250, 800, 5000, 8000, 12000
]

export default class EqualizerElement extends AudioElement {

  constructor() {

    super();

    this.shadow = this.attachShadow({mode: 'closed'});

    this.equalizer = new Equalizer();

    let style = this.createStyle();

    let container = createElement('div', {class: 'container'}, this.shadow)

    for(let i = 0; i <= equalizerBandThresholds.length; i++) {
      let labelText = this.generateHertzLabelContent(i) +  " Hz:"
      createElement('label', {for: 'slider-' + i}, container, labelText);

      let slider = createElement('input', { type: 'range', min: -40, max: 40, step: 0.8, value: 0, id: 'slider-' + i}, container);
      slider.addEventListener('input', () => this.onSliderChanged(i, slider.value))
    }

    this.shadow.appendChild(style);
  }

  generateHertzLabelContent(i) {
    if(i === 0)
      return equalizerBandThresholds[i];
    else if(i === equalizerBandThresholds.length) 
      return equalizerBandThresholds[i - 1]
    else 
      return equalizerBandThresholds[i - 1] + " - " + equalizerBandThresholds[i];
  }

  createStyle() {

    let style = document.createElement('style');
    style.textContent = `
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