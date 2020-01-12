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
      border: 1px solid rgb(105, 105, 105);
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
        this.width = 620;
        this.height = 300;
        this.canvasCtx = this.canvas.getContext('2d')
        this.analyser = audioCtx.createAnalyser();
        this.analyser.fftSize = FFT_SIZE;
        this.bufferLength = this.analyser.frequencyBinCount
        this.dataArray = new Uint8Array(this.bufferLength)
        this.visualizers = {bar: this.barVisualizer, line: this.lineVisualizer}
        this.type = "bar"
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

      context.analyser.getByteFrequencyData(context.dataArray);

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
       
      var x = 24; 

      for (var i = 0; i < BAR_VIS_BUCKET_COUNT / 2; i++) {
          barHeight = buckets[i];
          context.graphics.beginFill(0xffa41c);
          context.graphics.drawRect(x, context.height, barWidth, -barHeight);

          x += barWidth + 1;
      }
      

      context.renderer.render(context.stage);
    }

    lineVisualizer(context) {
      
      context.analyser.getByteTimeDomainData(context.dataArray);

      context.graphics.lineStyle(2, 0xffa41c);
      context.graphics.position.set(0, -context.width/4);
      
      var sliceWidth = context.width * 1.0 / context.bufferLength;
      var x = 0;

      for(var i = 0; i < context.bufferLength; i++) {
   
        var v = context.dataArray[i] / 128.0;
        var y = v * context.width/2;

        if(i === 0) {
          context.graphics.moveTo(x, y);
        } else {
          context.graphics.lineTo(x, y);
        }

        x += sliceWidth;
      }
    }

    /**
     * Draws the visualization
     */
    draw(context) {

        context.analyser.getByteFrequencyData(context.dataArray);

        context.graphics.clear();

        context.graphics.beginFill(0x1E1E1E);
        context.graphics.drawRect(0, 0, context.width, context.height);

        context.visualizers[context.type](context);

        context.renderer.render(context.stage);
    };

    getAnalyserNode() {

        return this.analyser;
    }
}