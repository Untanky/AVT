import AudioElement from '../audioElement.js';
import { audioCtx } from '../globals/audioContext.js';
import { createElement, createStyle } from '../globals/shadowTreeHelper.js';
import { getInputStyle } from '../globals/inputStyles.js';

function getStyle() {
  return `
    .audio-player-container {
      padding: 0.5em 1em;
    }

    .play-button {
      background-color: rgb(255, 164, 28);
      color: rgb(0, 0, 0);
    }
  `;
}

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

    createStyle(getStyle(), this.shadow);
    createStyle(getInputStyle(), this.shadow);

    const container = createElement('div', {class: 'audio-player-container'}, this.shadow);

    this.playButton = createElement('button', {class: 'play-button'}, container, "Play");
    this.playButton.addEventListener('click', () => this.onPlayButtonClicked())

    this.stopButton = createElement('button', {class: 'stop-button'}, container, "Stop");
    this.stopButton.addEventListener('click', () => this.onStopClicked());

    this.volumeSlider = createElement('input', {type: 'range', min: 0, max: 1, step: 0.01, value: 0.5}, container);
    this.volumeSlider.addEventListener('input', () => this.onVolumeChanged(this.volumeSlider.value));
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
    this.volumeSlider.value = value;
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