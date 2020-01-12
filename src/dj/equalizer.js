import AudioElement from "../audioElement.js";
import { audioCtx } from "../globals/audioContext.js";
import { createElement, createStyle } from '../globals/shadowTreeHelper.js';
import { getInputStyle } from "../globals/inputStyles.js";

const equalizerBandThresholds = [
  100, 250, 800, 5000, 8000, 12000
]

function getStyle() {
  return `    
    .container {
      box-sizing: border-box;
      max-width: 620px;
      display: grid;
      background-color: rgb(30, 30, 30);
      grid-template-columns: repeat(` + (equalizerBandThresholds.length + 1) + `, minmax(` + (580 / (equalizerBandThresholds.length + 1)) + `px, 1fr));
      grid-template-rows: 5fr 1fr;
      margin: 0 auto;
      border: 1px solid rgb(105, 105, 105);
      border-radius: 24px;
      padding: 20px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }

    .container > label {
      text-align: center;
      grid-row: 2 / span 1;
    }

    .container input[type="range"] {
      width: 200px;
      background: transparent;
      grid-row: 1 / span 1;
      transform-origin: top center;
      transform: rotate(-90deg) translate(-100px, -60px);
    }
  `
} 

export default class EqualizerElement extends AudioElement {

  constructor() {

    super();

    this.shadow = this.attachShadow({mode: 'closed'});

    this.equalizer = new Equalizer();

    createStyle(getStyle(), this.shadow);
    createStyle(getInputStyle(), this.shadow);

    let container = createElement('div', {class: 'container'}, this.shadow)

    this.sliders = [];
    for(let i = 0; i <= equalizerBandThresholds.length; i++) {
      let labelText = this.generateHertzLabelContent(i) +  " Hz"
      createElement('label', {for: 'slider-' + i}, container, labelText);

      let rangeContainer = createElement('div', {}, container);

      let slider = createElement('input', { type: 'range', class: 'vertical-range', min: -40, max: 40, step: 0.8, value: 0, id: 'slider-' + i}, rangeContainer);
      slider.addEventListener('input', () => this.onSliderChanged(i, slider.value))
      this.sliders[i] = slider;
    }
  }

  generateHertzLabelContent(i) {
    if(i === 0)
      return equalizerBandThresholds[i];
    else if(i === equalizerBandThresholds.length) 
      return equalizerBandThresholds[i - 1]
    else 
      return equalizerBandThresholds[i - 1] + " - " + equalizerBandThresholds[i];
  }

  onSliderChanged(sliderId, value) {

    this.equalizer.setBandGain(sliderId, value);
    this.sliders[sliderId].value = value;
  
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