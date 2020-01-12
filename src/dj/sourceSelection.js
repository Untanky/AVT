import {audioCtx} from '../globals/audioContext.js'
import { createElement, createStyle } from '../globals/shadowTreeHelper.js';
import { getInputStyle } from '../globals/inputStyles.js';

const sources = {
  file: 'File',
  sine: 'sine',
  triangle: 'triangle',
  sawtooth: 'sawtooth',
  square: 'square',
}

function getStyle() {
  return `
    .selection-container {
      padding: 0.5em 1em;
    }

    .file-container {
      padding: 0.5em 1em;
    }
  `
}

export default class SourceSelection extends HTMLElement {

  sourceFactory

  constructor() {

    super();

    this.sourceFactory = new SourceFactory();

    this.shadow = this.attachShadow({mode: 'closed'});

    createStyle(getStyle(), this.shadow);
    createStyle(getInputStyle(), this.shadow);

    this.selectionContainer = createElement('div', {class: 'selection-container'}, this.shadow);

    this.selectionLabel = createElement('label', {for: 'source-selection'}, this.selectionContainer, 'Select source: ');

    this.selection = createElement('select', {id: 'source-selection'}, this.selectionContainer);
    this.selection.addEventListener('change', () => this.onSelectionChanged(this.selection.value));

    for(let key in sources) {
      createElement('option', {}, this.selection, key);
    }

    this.fileContainer = createElement('div', {class: 'file-container'}, this.shadow);

    this.fileLabel = createElement('label', {for: 'file-input'}, this.fileContainer, 'Select an audio file: ');

    this.fileInput = createElement('input', {type: 'file', id: 'file-input'}, this.fileContainer);
    this.fileInput.addEventListener('input', () => this.onFileChanged());
  }

  onSelectionChanged(value) {

    if(value === 'file')
      this.fileContainer.style.display = 'block';
    else 
      this.fileContainer.style.display = 'none';

    this.sourceFactory.setType(sources[value]);
  }

  onFileChanged() {
    
    let reader = new FileReader();
    reader.onload = this.onLoadFile.bind(this);
    reader.readAsArrayBuffer(this.fileInput.files[0]);
  }

  onLoadFile(ev) {
    
    audioCtx.decodeAudioData(ev.target.result, this.onDecodeAudioData.bind(this));
  }

  onDecodeAudioData(buffer) {
    this.sourceFactory.setBuffer(buffer)
  }

  getSourceFactory() {

    return this.sourceFactory;
  }
}

customElements.define('source-selection', SourceSelection);

class SourceFactory {

  type
  buffer

  constructor() {

    this.type = 'sine';
  }

  setType(type) {
    this.type = type;
  }

  setBuffer(buffer) {
    this.buffer = buffer;
  }

  create() {

    switch(this.type) {
      case 'sine':
      case 'square':
      case 'triangle':
      case 'sawtooth':
        let oscillator = audioCtx.createOscillator();
        oscillator.type = this.type;
        return oscillator;
      case 'File':
        let bufferSource = audioCtx.createBufferSource()
        bufferSource.buffer = this.buffer;
        return bufferSource;
      default:
        throw new Error("Unknown type")
    }
  }
}