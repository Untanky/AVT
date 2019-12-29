import {audioCtx} from '../globals/audioContext.js'

const sources = {
  sine: 'sine',
  triangle: 'triangle',
  sawtooth: 'sawtooth',
  square: 'square',
  file: 'File'
}

export default class SourceSelection extends HTMLElement {

  sourceFactory

  constructor() {

    super();

    this.sourceFactory = new SourceFactory();

    this.shadow = this.attachShadow({mode: 'closed'});

    let styleElement = this.createStyle();

    this.selectionContainer = document.createElement('div');
    this.selectionContainer.setAttribute('class', 'selection-container')

    this.fileContainer = document.createElement('div');
    this.fileContainer.setAttribute('class', 'file-container')

    this.selectionLabel = document.createElement('label');
    this.selectionLabel.setAttribute('for', 'source-selection');
    this.selectionLabel.textContent = "Select source: ";

    this.selectionContainer.appendChild(this.selectionLabel);

    this.selection = document.createElement('select');
    this.selection.setAttribute('id', 'source-selection');
    this.selection.addEventListener('change', () => this.onSelectionChanged(this.selection.value));

    this.selectionContainer.appendChild(this.selection);

    for(let key in sources) {
      let option = document.createElement('option');
      option.textContent = key;
      this.selection.appendChild(option);
    }

    this.fileLabel = document.createElement('label');
    this.fileLabel.setAttribute('for', 'file-input');
    this.fileLabel.textContent = "Select a audio file: ";

    this.fileContainer.appendChild(this.fileLabel);

    this.fileInput = document.createElement('input');
    this.fileInput.setAttribute('type', 'file');
    this.fileInput.setAttribute('id', 'file-input');
    this.fileInput.addEventListener('input', () => this.onFileChanged());

    this.fileContainer.appendChild(this.fileInput);

    this.shadow.appendChild(styleElement);
    this.shadow.appendChild(this.selectionContainer);
    this.shadow.appendChild(this.fileContainer);
  }

  createStyle() {

    let style = document.createElement('style');
    style.textContent = `
      .file-container {
        display: none;
      }
    `
    return style;
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