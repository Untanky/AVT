import AudioPlayer from './audioPlayer.js'
import Slider from '../tools/slider.js'
import Visualizer from '../visualisation/visualizer.js'


export default class Track extends HTMLElement {

  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.render();
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
}

customElements.define('my-track', Track);
// /*
//     INSERT YOUR CODE HERE
//  */
// const lowerBandThreshold = 320;
// const higherBandThreshold = 3200;


// /**
//  * audio context
//  */
// const context = new AudioContext();

// /**
//  * analyser node for visualizing audio data
//  */
// const analyser = context.createAnalyser();
// analyser.fftSize = 2048;
// analyser.connect(context.destination);

// /**
//  * the low shelf filter for increasing/reducing the volume of low tones
//  */
// const low = context.createBiquadFilter();
// low.type = "lowshelf";
// low.frequency.value = lowerBandThreshold;
// low.gain.value = 0.0;
// low.connect(analyser);

// /**
//  * the peaking filter for increasing/reducing the volume of mid tones
//  */
// const mid = context.createBiquadFilter();
// mid.type = "peaking";
// mid.frequency.value = (higherBandThreshold + lowerBandThreshold) / 2;
// mid.gain.value = 0.0;
// mid.connect(low);

// /**
//  * the high shelf filter for increasing/reducing the volume of high tones
//  */
// const high = context.createBiquadFilter();
// high.type = "highshelf";
// high.frequency.value = higherBandThreshold;
// high.gain.value = 0.0;
// high.connect(mid);

// /**
//  * the master gain node for increasing/reducing the volume of the sound
//  */
// const gainNode = context.createGain();
// gainNode.connect(high);

// /**
//  * input elements
//  */
// const fileInput = document.querySelector('#file-input');
// const playButton = document.querySelector('#play-button');
// const stopButton = document.querySelector('#stop-button');
// const volumeSlider = new Slider('#volume-slider', (value) => { gainNode.gain.value = value ** 2; }, 0.2);
// const lowSlider = new Slider('#low-slider', (value) => { low.gain.value = value; }, 0);
// const midSlider = new Slider('#mid-slider', (value) => { mid.gain.value = value; }, 0);
// const highSlider = new Slider('#high-slider', (value) => { high.gain.value = value; }, 0);

// /**
//  * Visualizer for visualizing audio data
//  */
// const visualizer = new Visualizer('#canvas', analyser, { lowerBandThreshold: lowerBandThreshold, higherBandThreshold: higherBandThreshold })

// /**
//  * Audio Player for playing/stopping the audio output
//  */
// const audioPlayer = new AudioPlayer(context, gainNode);

// /**
//  * Read audio source
//  */
// fileInput.addEventListener("change", function() {
// 	var reader = new FileReader();
// 	reader.onload = function(ev) {
// 		context.decodeAudioData(ev.target.result, function(buffer) {
//       audioPlayer.stop();
//       audioPlayer.setAudioBuffer(buffer);
// 		});
// 	};
//   reader.readAsArrayBuffer(this.files[0]);
// }, false);

// /**
//  * Play/pause sound
//  */
// playButton.addEventListener("click", () => {
//   if(audioPlayer.getIsPlaying()) {
//     audioPlayer.pause();
//     playButton.value = "Play"
//   }
//   else {
//     audioPlayer.play();
//     playButton.value = "Pause"
//   }
// });

// /**
//  * Stop sound
//  */
// stopButton.addEventListener("click", () => {
//   audioPlayer.stop();
// })

// /**
//  * Draw the visualization
//  */
// function draw() {
//   // to refresh the frame
//   var drawVisual = requestAnimationFrame(draw);

//   // acutal visualization
//   visualizer.draw();
// }

// draw();