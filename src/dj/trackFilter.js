import { audioCtx } from '../globals/audioContext.js'

export default class TrackFilter {

  constructor() {

    this.setupAudioGraph()
  }

  setupAudioGraph() {

    /**
     * TODO: Create nodes from AudioContext
     * 
     * this.biquadFilter = audioCtx.createBiquadFilter();
     */

    /**
     * TODO: Set the first node of the graph and the last node:
     * this.firstNode = ...
     * this.lastNode = ...
     */
  }

  /**
   * TODO: Create getters and setter for parameters of audio Graph that should be changed.
   * getBiquadFrequency() { return this.biquadFilter.frequency }
   * setBiquadFrequency(freq) { this.biquadFilter.frequency.value = freq; }
   */

  getFirstNode() {

    return this.firstNode;
  }

  getLastNode() {

    return this.lastNode;
  }
}