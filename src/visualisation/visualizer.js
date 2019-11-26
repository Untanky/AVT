const MAX_FREQ = 22050

/**
 * An audio visualizer
 */
class Visualizer {

    /**
     * canvase
     */
    _canvas
    /**
     * canvas context, for drawing
     */
    _canvasCtx
    /**
     * analyser of which the analytical data of the sound comes from
     */
    _analyser
    /**
     * length of the analyser output
     */
    _bufferLength
    /**
     * array for the analyser output
     */
    _dataArray
    /**
     * width of the canvas
     */
    _WIDTH
    /**
     * height of the canvas
     */
    _HEIGHT
    /**
     * options for the visualizer
     */
    _options

    /**
     * Creates a new Visualizer
     * 
     * @param {HTMLElement} id the id of the canvas used for drawing
     * @param {AnalyserNode} analyser the analyser node of which the data is visualized
     * @param {object} options options of the visualizer
     */
    constructor(canvas, analyser, options) {
        this._canvas = canvas
        this._WIDTH = this._canvas.width
        this._HEIGHT = this._canvas.height
        console.log(this._WIDTH + ", " + this._HEIGHT);
        this._canvasCtx = this._canvas.getContext('2d')
        this._analyser = analyser;
        this._bufferLength = analyser.frequencyBinCount
        this._dataArray = new Uint8Array(this._bufferLength)
        this._options = options;
    }

    /**
     * Draws the visualization
     */
    draw() {

        this._analyser.getByteFrequencyData(this._dataArray);

        var buckets = [0, 0, 0];

        const STEP = MAX_FREQ / this._analyser.fftSize;

        // find the highest value in the frequency bands
        for (var i = 0; i < this._dataArray.length; i++) {
            let index = 0;
            if(i * STEP > this._options.lowerBandThreshold)
                index++;
            if(i * STEP > this._options.higherBandThreshold)
                index++;

            buckets[index] = Math.max(this._dataArray[i], buckets[index]);
        }

        this._canvasCtx.fillStyle = 'rgb(245, 245, 245)';
        this._canvasCtx.fillRect(0, 0, this._WIDTH, this._HEIGHT);
        var barWidth = (this._WIDTH / 3);
        var barHeight;

        var x = 0; for (var i = 0; i < buckets.length; i++) {
            barHeight = buckets[i];
            if(i === 0)
                this._canvasCtx.fillStyle = 'rgb(255,0,0)';
            if(i === 1)
                this._canvasCtx.fillStyle = 'rgb(0,255,0)';
            if(i === 2)
                this._canvasCtx.fillStyle = 'rgb(0,0,255)';
            this._canvasCtx.fillRect(x, this._HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    };
}

export default Visualizer;