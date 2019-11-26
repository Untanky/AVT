import AudioPlayer from './audioPlayer.js'
import Slider from '../tools/slider.js'
import Visualizer from '../visualisation/visualizer.js'


export default class Track extends HTMLElement {

  shadow

  lowerBandThreshold = 320;
  higherBandThreshold = 3200;

  /**
   * audio context
   */
  context

  /**
   * analyser node for visualizing audio data
   */
  analyser

  /**
   * the low shelf filter for increasing/reducing the volume of low tones
   */
  lowFilter

  /**
   * the peaking filter for increasing/reducing the volume of mid tones
   */
  midFilter

  /**
   * the high shelf filter for increasing/reducing the volume of high tones
   */
  highFilter

  /**
   * the master gain node for increasing/reducing the volume of the sound
   */
  gainNode

  /**
   * input elements
   */
  fileInput
  playButton
  stopButton
  volumeSlider
  lowSlider
  midSlider
  highSlider

  /**
   * Visualizer for visualizing audio data
   */
  visualizer

  /**
    * Audio Player for playing/stopping the audio output
    */
  audioPlayer

  constructor() {
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = this.render();

    this.context = new AudioContext();

    this.setupAudioGraph();

    this.fileInput = this.shadow.querySelector('#file-input');
    this.playButton = this.shadow.querySelector('#play-button');
    this.stopButton = this.shadow.querySelector('#stop-button');
    this.volumeSlider = new Slider(this.shadow.querySelector('#volume-slider'), (value) => { this.gainNode.gain.value = value ** 2; }, 0.2);
    this.lowSlider = new Slider(this.shadow.querySelector('#low-slider'), (value) => { this.low.gain.value = value; }, 0);
    this.midSlider = new Slider(this.shadow.querySelector('#mid-slider'), (value) => { this.mid.gain.value = value; }, 0);
    this.highSlider = new Slider(this.shadow.querySelector('#high-slider'), (value) => { this.high.gain.value = value; }, 0);

    this.visualizer = new Visualizer(this.shadow.querySelector('#canvas'), this.analyser, { lowerBandThreshold: this.lowerBandThreshold, higherBandThreshold: this.higherBandThreshold })

    this.audioPlayer = new AudioPlayer(this.context, this.gainNode);

    this.fileInput.onchange = () => {
      var reader = new FileReader();
      reader.onload = function (ev) {
        this.context.decodeAudioData(ev.target.result, function (buffer) {
          this.audioPlayer.stop();
          this.audioPlayer.setAudioBuffer(buffer);
        });
      };
      console.log(this.fileInput.value)
      reader.readAsArrayBuffer(this.fileInput[0]);
    }

    this.playButton.addEventListener("click", () => {
      if (this.audioPlayer.getIsPlaying()) {
        this.audioPlayer.pause();
        this.playButton.value = "Play"
      }
      else {
        this.audioPlayer.play();
        this.playButton.value = "Pause"
      }
    });

    this.stopButton.addEventListener("click", () => {
      this.audioPlayer.stop();
    })
  }

  setupAudioGraph() {
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.connect(this.context.destination);

    this.low = this.context.createBiquadFilter();
    this.low.type = "lowshelf";
    this.low.frequency.value = this.lowerBandThreshold;
    this.low.gain.value = 0.0;
    this.low.connect(this.analyser);

    this.mid = this.context.createBiquadFilter();
    this.mid.type = "peaking";
    this.mid.frequency.value = (this.higherBandThreshold + this.lowerBandThreshold) / 2;
    this.mid.gain.value = 0.0;
    this.mid.connect(this.low);

    this.high = this.context.createBiquadFilter();
    this.high.type = "highshelf";
    this.high.frequency.value = this.higherBandThreshold;
    this.high.gain.value = 0.0;
    this.high.connect(this.mid);

    this.gainNode = this.context.createGain();
    this.gainNode.connect(this.high);
  }

  render() {
    return `
      <style>
        .container {
          background-color: white;
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(0, 3fr) minmax(0, 5fr);
          gap: 1em;
          justify-content: center;
          padding: 2em;
          border-radius: 2em;
          box-shadow: 0px 8px 16px 8px rgba(0, 0, 0, 0.2);
        }
        
        .container #canvas {
          grid-column: 1 / span 3;
          margin: 0 auto;
          border: 1px solid rgb(225, 225, 225);
          border-radius: 16px;
        }
        
        .container label {
          grid-column: 1 / span 1;
        }
        
        .container #file-input {
          grid-column: 2 / span 2;
        }
        
        .container #play-button {
          grid-column: 1 / span 2;
        }
        
        .container #stop-button {
          grid-column: 3 / span 1;
        }
        
        .container .slider {
          grid-column: 2 / span 2;
        }
        
        input[type="button"] {
          background-color: rgb(92, 236, 92);
          font-size: 16px;
          padding: 0.5em 1em;
          border: none;
          border-radius: 32px;
        }
      </style>
      <div class="container">
              <canvas width="400" height="400" id="canvas"></canvas>
              <label for="file-input">Audio File:</label>
              <input type="file" id="file-input" />
              <input type="button" id="play-button" value="Play" />
              <input type="button" id="stop-button" value="Stop" />
              <label for="volume-slider">Volume: </label>
              <input type="range" id="volume-slider" class="slider" min="0" max="1" step="0.01" orient="" />
              <label for="low-slider">Low: </label>
              <input type="range" id="low-slider" class="slider" min="-40" max="40" step="0.04" />
              <label for="mid-slider">Mid: </label>
              <input type="range" id="mid-slider" class="slider" min="-40" max="40" step="0.04" />
              <label for="high-slider">High: </label>
              <input type="range" id="high-slider" class="slider" min="-40" max="40" step="0.04" />
      </div>
    `
  }


  /**
   * Draw the visualization
   */
  draw() {
    // acutal visualization
    visualizer.draw();
  }
}

customElements.define('my-track', Track);