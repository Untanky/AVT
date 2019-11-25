import AudioPlayer from './audioPlayer.js'
import Slider from './slider.js'
import Visualizer from './visualizer.js'

// Thresholds of the 3-band-equalizer
//
// Please use these variables for an 
// easier review on my part
const lowerBandThreshold = 320;
const higherBandThreshold = 3200;

/*
    INSERT YOUR CODE HERE
 */

/**
 * audio context
 */
const context = new AudioContext();

/**
 * analyser node for visualizing audio data
 */
const analyser = context.createAnalyser();
analyser.fftSize = 2048;
analyser.connect(context.destination);

/**
 * the low shelf filter for increasing/reducing the volume of low tones
 */
const low = context.createBiquadFilter();
low.type = "lowshelf";
low.frequency.value = lowerBandThreshold;
low.gain.value = 0.0;
low.connect(analyser);

/**
 * the peaking filter for increasing/reducing the volume of mid tones
 */
const mid = context.createBiquadFilter();
mid.type = "peaking";
mid.frequency.value = (higherBandThreshold + lowerBandThreshold) / 2;
mid.gain.value = 0.0;
mid.connect(low);

/**
 * the high shelf filter for increasing/reducing the volume of high tones
 */
const high = context.createBiquadFilter();
high.type = "highshelf";
high.frequency.value = higherBandThreshold;
high.gain.value = 0.0;
high.connect(mid);

/**
 * the master gain node for increasing/reducing the volume of the sound
 */
const gainNode = context.createGain();
gainNode.connect(high);

/**
 * input elements
 */
const fileInput = document.querySelector('#file-input');
const playButton = document.querySelector('#play-button');
const stopButton = document.querySelector('#stop-button');
const volumeSlider = new Slider('#volume-slider', (value) => { gainNode.gain.value = value ** 2; }, 0.2);
const lowSlider = new Slider('#low-slider', (value) => { low.gain.value = value; }, 0);
const midSlider = new Slider('#mid-slider', (value) => { mid.gain.value = value; }, 0);
const highSlider = new Slider('#high-slider', (value) => { high.gain.value = value; }, 0);

/**
 * Visualizer for visualizing audio data
 */
const visualizer = new Visualizer('#canvas', analyser, { lowerBandThreshold: lowerBandThreshold, higherBandThreshold: higherBandThreshold })

/**
 * Audio Player for playing/stopping the audio output
 */
const audioPlayer = new AudioPlayer(context, gainNode);

/**
 * Read audio source
 */
fileInput.addEventListener("change", function() {
	var reader = new FileReader();
	reader.onload = function(ev) {
		context.decodeAudioData(ev.target.result, function(buffer) {
      audioPlayer.stop();
      audioPlayer.setAudioBuffer(buffer);
		});
	};
  reader.readAsArrayBuffer(this.files[0]);
}, false);

/**
 * Play/pause sound
 */
playButton.addEventListener("click", () => {
  if(audioPlayer.getIsPlaying()) {
    audioPlayer.pause();
    playButton.value = "Play"
  }
  else {
    audioPlayer.play();
    playButton.value = "Pause"
  }
});

/**
 * Stop sound
 */
stopButton.addEventListener("click", () => {
  audioPlayer.stop();
})

/**
 * Draw the visualization
 */
function draw() {
  // to refresh the frame
  var drawVisual = requestAnimationFrame(draw);

  // acutal visualization
  visualizer.draw();
}

draw();