export default class TrackAudioNode extends AudioNode, HTMLElement {



  constructor() {
    super();

    this.setupAudioGraph
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

  render
}