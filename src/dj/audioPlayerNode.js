
export default class AudioPlayerNode extends AudioNode {

  audioContext
  audioDestination
  audioBuffer
  sourceNode
  startedAt
  pausedAt
  isPlaying

  /**
   * Creates a new AudioPlayer
   * 
   * @param {AudioContext} audioContext 
   * @param {AudioNode} audioDestination 
   */
  constructor(audioContext, audioDestination) {
    this.audioContext = audioContext;
    this.audioDestination = audioDestination;
    this.audioBuffer = null;
    this.sourceNode = null;
    this.startedAt = 0;
    this.pausedAt = 0;
    this.isPlaying = 0;
    this.gain = 50;
  }

  connect(audioNode) {
    this.audioDestination = audioNode;
    if(isPlaying)
      this.sourceNode.connect(this.audioDestination);
  }

  disconnect() {
    this.sourceNode.disconnect();
  }
  
  play() {
    if(this.audioBuffer === undefined)
      return;

    let offset = this.pausedAt;

    this.sourceNode = this.audioContext.createBufferSource();
    this.sourceNode.buffer = this.audioBuffer;
    this.sourceNode.connect(this.audioDestination);
    this.sourceNode.start(0, offset);

    this.startedAt = this.audioContext.currentTime - offset;
    this.pausedAt = 0;
    this.isPlaying = true;
  }
  
  pause() {
    var elapsed = this.audioContext.currentTime - this.startedAt;
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

  setAudioBuffer(audioBuffer) {
    this.audioBuffer = audioBuffer;
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  getCurrentTime() {
    if (this.pausedAt) {
      return this.pausedAt;
    }
    if (this._startedAt) {
      return this.audioContext.currentTime - this.startedAt;
    }
    return 0;
  };

  getDuration() {
    return this.audioBuffer.duration;
  };
}