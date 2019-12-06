import { audioCtx } from '../globals/audioContext.js';

export default class AudioPlayer {

  /**
   * the source node
   */
  sourceNode
  /**
   * the destination of the audio
   */
  audioDestination
  /**
   * time the user started the audio stream, in audio context time
   */
  startedAt
  /**
   * time the user paused the audio stream, in audio context time
   */
  pausedAt
  /**
   * whether the audio player is playing sound
   */
  isPlaying

  constructor() {

    this.audioDestination = null;
    this.sourceNode = null;
    this.startedAt = 0;
    this.pausedAt = 0;
    this.isPlaying = 0;
    this.gain = 50;
  }

  /**
   * Play the selected sound 
   */
  play() {
    if (!this.sourceNode || !this.audioDestination)
      return;

    let offset = this.pausedAt;

    this.sourceNode.connect(this.audioDestination);
    this.sourceNode.start(0, offset);

    this.startedAt = audioCtx.currentTime - offset;
    this.pausedAt = 0;
    this.isPlaying = true;
  }

  /**
   * Pause the sound stream
   */
  pause() {
    var elapsed = audioCtx.currentTime - this.startedAt;
    this.stop();
    this.pausedAt = elapsed;
  }

  /**
   * Stop the sound stream
   */
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

  setSource(sourceNode) {
    this.stop();
    this.sourceNode = sourceNode;
  }

  setDestination(audioDestination) {
    this.audioDestination = audioDestination
  }

  /**
   * Returns whether the audio player is playing sounds
   */
  getIsPlaying() {
    return this.isPlaying;
  }

  /**
   * Returns the current time of the audio playback
   */
  getCurrentTime() {
    if (this.pausedAt) {
      return this.pausedAt;
    }
    if (this.startedAt) {
      return audioCtx.currentTime - this.startedAt;
    }
    return 0;
  };

  /**
   * Returns the duration of the sound
   */
  getDuration() {
    return this.this.audioBuffer.duration;
  };
}