import SourceSelection from './sourceSelection.js'
import { audioCtx } from '../globals/audioContext.js';

export default class SourceSelectionElement extends HTMLElement {

  constructor() {

    super();

    let shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.render();

    this.sourceSelection = new SourceSelection();

    this.setupElements();
  }

  setupElements() {
    /**
     * TODO: Extract elements from HTML
     * this.slider = this.shadowRoot.querySelector('#slider');
     */

    this.inputSelection = this.shadowRoot.querySelector('#input-selection');

    this.fileInput = this.shadowRoot.querySelector('#file-input');
    this.fileInputContainer = this.shadowRoot.querySelector('#file-input-container');

    /**
     * TODO: Bind event handlers
     * this.slider.addEventListener("change", (value) => onSliderChange(value), false);
     */
    this.inputSelection.addEventListener("change", () => this.onInputSelectionChange(), false);

    this.fileInput.addEventListener("change", () => this.onFileInputChange(), false);
  }

  /**
   * TODO: Create event handlers
   * onSliderClicked(value) { this.trackFilter.setBiquadFrequency(value); }
   */

  onInputSelectionChange() {

    const inputValue = this.inputSelection.value;

    if (inputValue !== 'File')
      this.fileInputContainer.style = "display: none;"
    else
      this.fileInputContainer.style = "display: inline;"

    switch (inputValue) {
      case 'sine':
      case 'square':
      case 'sawtooth':
      case 'triangle':
        this.sourceSelection.setSource(inputValue);
        break;
      case 'File':
        this.sourceSelection.setSourceAsFile();
        break;
    }
  }

  onFileInputChange() {
    console.log(this);
    let reader = new FileReader();
    reader.onload = this.onLoadFile.bind(this);
    reader.readAsArrayBuffer(this.fileInput.files[0]);
  }

  onLoadFile(ev) {
    audioCtx.decodeAudioData(ev.target.result, this.onDecodeAudioData.bind(this));
  }

  onDecodeAudioData(buffer) {
    this.sourceSelection.setBuffer(buffer)
  }

  render() {

    return `
      <div>
        <span>
          <label for="input-selection">Select input: </label>
          <select id="input-selection">
            <option>None</option>
            <option>sine</option>
            <option>square</option>
            <option>sawtooth</option>
            <option>sriangle</option>
            <option>File</option>
          </select>
        </span>
        <span id="file-input-container" style="display: none">
          <label for="file-input">Select file: </label>
          <input id="file-input" type="file"/>
        </span>
      </div>
    `;
  }

  getSourceSelection() {
    return this.sourceSelection;
  }
}

customElements.define('source-selection', SourceSelectionElement);