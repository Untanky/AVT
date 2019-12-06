import Visualizer from './visualizer.js'

export default class VisualizerElement extends HTMLElement {

  constructor() {

    super()

    let shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.render();

    this.setupElements();

    this.visualizer = new Visualizer(this.canvas);
    console.log(this.visualizer);
  }

  setupElements() {

    this.canvas = this.shadowRoot.querySelector('#canvas');
    this.typeSelector = this.shadowRoot.querySelector('#type-selector');
    this.typeSelector.addEventListener('change', () => this.onTypeSelectorChange(), false)
  }

  onTypeSelectorChange() {

    this.visualizer.setVisualizer(this.typeSelector.value);
  }

  render() {
    return `
      <div>
        <canvas id="canvas"></canvas>
        <select id="type-selector">
          <option>bars</option>
          <option>line</option>
        </select>
      </div>
    `
  }

  getVisualizer() {
    return this.visualizer;
  }
}

customElements.define('visualizer-element', VisualizerElement);