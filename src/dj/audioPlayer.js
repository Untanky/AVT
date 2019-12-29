import AudioElement from '../audioElement.js'
import { audioCtx } from '../globals/audioContext.js';

export default class AudioPlayerElement extends AudioElement {

  shadow
  audioPlayer
  playButton
  stopButton
  volumeSlider

  constructor() {
    super();

    this.audioPlayer = new AudioPlayer();

    this.shadow = this.attachShadow({mode: 'open'});

    let styleElement = this.createStyle();

    let container = document.createElement('div');
    container.setAttribute('class', 'audio-player-container');

    this.playButton = document.createElement('button');
    this.playButton.setAttribute('class', 'play-button');
    this.playButton.addEventListener('click', () => this.onPlayButtonClicked())
    this.playButton.textContent = "Play";
    
    container.appendChild(this.playButton);

    this.stopButton = document.createElement('button');
    this.stopButton.setAttribute('class', 'stop-button');
    this.stopButton.addEventListener('click', () => this.onStopClicked())
    this.stopButton.textContent = "Stop";
    
    container.appendChild(this.stopButton);

    this.volumeSlider = document.createElement('input');
    this.volumeSlider.setAttribute('type', 'range');
    this.volumeSlider.setAttribute('min', 0);
    this.volumeSlider.setAttribute('max', 1);
    this.volumeSlider.setAttribute('step', 0.01);
    this.volumeSlider.setAttribute('value', 0.5);
    this.volumeSlider.addEventListener('input', () => this.onVolumeChanged(this.volumeSlider.value))

    container.appendChild(this.volumeSlider);

    this.shadow.appendChild(container);
  }

  createStyle() {

    let style = document.createElement('style');
    style.textContent = `
    
    `
    return style;
  }

  isPlaying() {

    return this.playing;
  }

  onPlayButtonClicked() {

    if(!this.audioPlayer.getIsPlaying()) {
      this.audioPlayer.play();
      this.playButton.textContent = "Pause";
    }
    else {
      this.audioPlayer.pause();
      this.playButton.textContent = "Play";
    }
  }

  onStopClicked() {
    
    this.audioPlayer.stop();
    this.playButton = "Play"
  }

  onVolumeChanged(value) {
    this.audioPlayer.setVolume(value);
  }

  getFirstNode() {

    return undefined;
  }

  getLastNode() {

    return this.audioPlayer.gainNode;
  }

  setSourceFactory(sourceFactory) {

    this.audioPlayer.setSourceFactory(sourceFactory);
  }
}

customElements.define('audio-player', AudioPlayerElement)

class AudioPlayer {

  sourceNode
  gainNode
  sourceFactory
  startedAt
  pausedAt
  isPlaying
  destination

  constructor() {

    this.gainNode = audioCtx.createGain();
    this.gainNode.gain.value = 0.5;
    this.startedAt = 0
    this.pausedAt = 0
  }

  play() {
    let offset = this.pausedAt;

    this.sourceNode = this.sourceFactory.create();
    this.sourceNode.connect(this.gainNode);
    this.sourceNode.start(0, offset);

    this.startedAt = audioCtx.currentTime - offset;
    this.pausedAt = 0;
    this.isPlaying = true;
  }

  pause() {
    var elapsed = audioCtx.currentTime - this.startedAt;
    this.stop();
    this.pausedAt = elapsed;
  }

  stop() {
    if (this.sourceNode) {
      this.sourceNode.disconnect();
      this.sourceNode.stop(0);
      this.sourceNode = null;
    }
    this.pausedAt = 0;
    this.startedAt = 0;
    this.isPlaying = false;
  }

  setVolume(value) {
    this.gainNode.gain.value = value;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  getCurrentTime() {
    if (this.pausedAt) {
      return this.pausedAt;
    }
    if (this.startedAt) {
      return audioCtx.currentTime - this.startedAt;
    }
    return 0;
  };

  getDuration() {
    return this.audioBuffer.duration;
  };

  setSourceFactory(sourceFactory) {
    this.sourceFactory = sourceFactory;
  }
}