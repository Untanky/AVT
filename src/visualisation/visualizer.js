import {audioCtx} from '../globals/audioContext.js'
import looper from '../globals/looper.js'
import AudioElement from '../audioElement.js';
import { createElement, createStyle } from '../globals/shadowTreeHelper.js';
import { getInputStyle } from '../globals/inputStyles.js';

const MAXFREQ = 22050
const FFT_SIZE = 2048;
const BAR_VIS_BUCKET_COUNT = 50;

const visualisations = [ 'bar', 'line' ];

function getStyle() {
  
  return `
    .visualizer-container {
      box-sizing: border-box;
      width: 100%;
      max-width: 620px;
      margin: 0 auto;
    }

    .visualizer-container > .type-selector-container {
      padding: 0.5em 1em;
    }

    .visualizer-container > .canvas-container > .visualization-canvas {
      width: 100%;
      border: 1px solid rgb(225, 225, 225);
      border-radius: 24px;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    }
  `
}

export default class VisualizerElement extends AudioElement {

  constructor() {

    super()

    this.shadow = this.attachShadow({ mode: 'open' });

    createStyle(getStyle(), this.shadow);
    createStyle(getInputStyle(), this.shadow);

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

    this.visualizer = new Visualizer(this.canvas);
  }

  onTypeSelectorChange(value) {

    this.visualizer.setVisualizer(value);
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
        this.analyser.fftSize = FFT_SIZE;
        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)
        this.visualizers = {bars: this.barVisualizer}
        this.type = "bars"
        looper.addLoopedMethod(this.draw, this);

        this.stage = new PIXI.Container(0x333333);
        this.renderer = new PIXI.CanvasRenderer(this.width, this.height, {view: canvas, autoResize: true});
        this.graphics = new PIXI.Graphics();
        this.stage.addChild(this.graphics);
    }

    setVisualizer(type) {
        this.type = type;
    }

    barVisualizer(context) {

      context.graphics.clear();

      var barWidth = ((context.width - 20) / (BAR_VIS_BUCKET_COUNT)) * 2;
      var barHeight = 10;

      let buckets = []

      for (let i = 0; i < context.dataArray.length; i++) {
        const element = context.dataArray[i];
        const bucketIndex = Math.floor(i/context.dataArray.length * BAR_VIS_BUCKET_COUNT);
        if(buckets[bucketIndex] === undefined || buckets[bucketIndex] === NaN)
          buckets[bucketIndex] = 0;
        buckets[bucketIndex] = Math.max(buckets[bucketIndex], element);
      }
       
      var x = 10; 

      context.graphics.beginFill(0xEB7979);
      context.graphics.drawRect(x, 150, barWidth, barHeight);
      for (var i = 0; i < BAR_VIS_BUCKET_COUNT / 2; i++) {
          barHeight = buckets[i] / 2;
          context.graphics.beginFill(0xEB7979);
          context.graphics.drawRect(x, 150, barWidth, -barHeight);
          //context.canvasCtx.fillStyle = 'hsl(0, 75%, 70%)';
          //context.canvasCtx.fillRect(x, context.height - barHeight, barWidth, barHeight);

          x += barWidth + 1;
      }
      

      context.renderer.render(context.stage);
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