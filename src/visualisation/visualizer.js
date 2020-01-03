import {audioCtx} from '../globals/audioContext.js'
import looper from '../globals/looper.js'
import AudioElement from '../audioElement.js';
import { createElement } from '../globals/shadowTreeHelper.js';

const MAXFREQ = 22050

const visualisations = [ 'bar', 'line' ];

export default class VisualizerElement extends AudioElement {

  constructor() {

    super()

    this.shadow = this.attachShadow({ mode: 'open' });

    let style = this.createStyle();

    const container = createElement('div', {class: 'visualizer-container'}, this.shadow);

    const canvasContainer = createElement('div', {class: 'canvas-container'}, container);

    const typeSelectorContainer = createElement('div', {class: 'type-selector-container'}, container);

    this.canvas = createElement('canvas', {class: 'visualization-canvas'}, canvasContainer);

    this.typeSelectorLabel = createElement('label', {for: 'type-selector'}, typeSelectorContainer, 'Select visualization: ');

    this.typeSelector = createElement('select', {id: 'type-selector'}, typeSelectorContainer)
    this.typeSelector.addEventListener('change', () => this.onTypeSelectorChange(this.typeSelector.value))

    for(let visualisation of visualisations) {
      createElement('option', {}, this.typeSelector, visualisation);
    }

    this.shadow.appendChild(style);

    this.visualizer = new Visualizer(this.canvas);
  }

  onTypeSelectorChange(value) {

    this.visualizer.setVisualizer(value);
  }

  createStyle() {

    let style = document.createElement('style');
    style.textContent = `
      .visualizer-container {
        width: 100%;
        max-width: 620px;
        margin: 0 auto;
      }

      .visualizer-container > .canvas-container > .visualization-canvas {
        width: 100%;
        border: 1px solid rgb(225, 225, 225);
        border-radius: 24px;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
      }
    `
    return style;
  }

  getFirstNode() {
    return this.visualizer.getAnalyserNode();
  }

  getLastNode() {
    return this.visualizer.getAnalyserNode();
  }

  getVisualizer() {
    return this.visualizer;
  }
}

customElements.define('visualizer-element', VisualizerElement);

/**
 * An audio visualizer
 */
class Visualizer {

    /**
     * canvas
     */
    canvas
    /**
     * canvas context, for drawing
     */
    canvasCtx
    /**
     * analyser of which the analytical data of the sound comes from
     */
    analyser
    /**
     * length of the analyser output
     */
    bufferLength
    /**
     * array for the analyser output
     */
    dataArray
    /**
     * width of the canvas
     */
    width
    /**
     * height of the canvas
     */
    height
    /**
     * options for the visualizer
     */
    options

    /**
     * Creates a new Visualizer
     * 
     * @param {HTMLElement} id the id of the canvas used for drawing
     */
    constructor(canvas) {
        this.canvas = canvas
        this.width = this.canvas.width
        this.height = this.canvas.height
        this.canvasCtx = this.canvas.getContext('2d')
        this.analyser = audioCtx.createAnalyser();
        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)
        this.visualizers = {bars: this.barVisualizer}
        this.type = "bars"
        looper.addLoopedMethod(this.draw, this);
    }

    setVisualizer(type) {
        this.type = type;
    }

    barVisualizer(context) {

        var barWidth = (context.width / context.dataArray.length);
        var barHeight;

        var x = 0; 
        for (var i = 0; i < context.dataArray.length; i++) {
            barHeight = context.dataArray[i];
            if(i === 0)
                context.canvasCtx.fillStyle = 'rgb(255,0,0)';
            if(i === 1)
                context.canvasCtx.fillStyle = 'rgb(0,255,0)';
            if(i === 2)
                context.canvasCtx.fillStyle = 'rgb(0,0,255)';
            context.canvasCtx.fillRect(x, context.height - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    /**
     * Draws the visualization
     */
    draw(context) {

        context.analyser.getByteFrequencyData(context.dataArray);

        context.canvasCtx.fillStyle = 'rgb(245, 245, 245)';
        context.canvasCtx.fillRect(0, 0, context.width, context.height);

        context.visualizers[context.type](context);
    };

    getAnalyserNode() {

        return this.analyser;
    }
}