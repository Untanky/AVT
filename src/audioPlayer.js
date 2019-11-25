/**
 * An audio player that allows playing and pausing audio
 */
class AudioPlayer {

  /**
   * the audio context
   */
  _audioContext
  /**
   * the destination of the audio
   */
  _audioDestination
  /**
   * audio buffer that stores the data to be played
   */
  _audioBuffer
  /**
   * the source node
   */
  _sourceNode
  /**
   * time the user started the audio stream, in audio context time
   */
  _startedAt
  /**
   * time the user paused the audio stream, in audio context time
   */
  _pausedAt
  /**
   * whether the audio player is playing sound
   */
  _isPlaying

  /**
   * Creates a new AudioPlayer
   * 
   * @param {AudioContext} audioContext 
   * @param {AudioNode} audioDestination 
   */
  constructor(audioContext, audioDestination) {
    this._audioContext = audioContext;
    this._audioDestination = audioDestination;
    this._audioBuffer = null;
    this._sourceNode = null;
    this._startedAt = 0;
    this._pausedAt = 0;
    this._isPlaying = 0;
    this._gain = 50;
  }

  /**
   * Play the selected sound 
   */
  play() {
    if(this._audioBuffer === undefined)
      return;

    let offset = this._pausedAt;

    this._sourceNode = this._audioContext.createBufferSource();
    this._sourceNode.buffer = this._audioBuffer;
    this._sourceNode.connect(this._audioDestination);
    this._sourceNode.start(0, offset);

    this._startedAt = this._audioContext.currentTime - offset;
    this._pausedAt = 0;
    this._isPlaying = true;
  }

  /**
   * Pause the sound stream
   */
  pause() {
    var elapsed = this._audioContext.currentTime - this._startedAt;
    this.stop();
    this._pausedAt = elapsed;
  }

  /**
   * Stop the sound stream
   */
  stop() {
    if (this._sourceNode) {
      this._sourceNode.disconnect();
      this._sourceNode.stop(0);
      this._sourceNode = null;
    }
    this._pausedAt = 0;
    this._startedAt = 0;
    this._isPlaying = false;
  }

  /**
   * Set the audio data that should be played
   * @param {[byte]} audioBuffer 
   */
  setAudioBuffer(audioBuffer) {
    this._audioBuffer = audioBuffer;
  }

  /**
   * Returns whether the audio player is playing sounds
   */
  getIsPlaying() {
    return this._isPlaying;
  }

  /**
   * Returns the current time of the audio playback
   */
  getCurrentTime() {
    if (this._pausedAt) {
      return this._pausedAt;
    }
    if (this._startedAt) {
      return this._audioContext.currentTime - this._startedAt;
    }
    return 0;
  };

  /**
   * Returns the duration of the sound
   */
  getDuration() {
    return this.this._audioBuffer.duration;
  };
}

export default AudioPlayer;