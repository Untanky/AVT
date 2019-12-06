import TrackFilter from './trackFilter.js'

export default class TrackFilterElement extends HTMLElement {

  constructor() {
    
    super();

    let shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.render();

    this.trackFilter = new TrackFilter();
    
    this.setupElements();
  }

  setupElements() {
    /**
     * TODO: Extract elements from HTML
     * this.slider = this.shadowRoot.querySelector('#slider');
     */

    /**
     * TODO: Bind event handlers
     * this.slider.addEventListener("change", (value) => onSliderChange(value), false);
     */
  }

  /**
   * TODO: Create event handlers
   * onSliderClicked(value) { this.trackFilter.setBiquadFrequency(value); }
   */

   /**
    * NOTE: There might be a custom slider API to make things easier! See (src/tools/slider.js)
    */

  render() {

    /**
     * TODO: Create and style HTML element needed
     */
    return `
      <div>
        <h3>Filter</h3>
      </div>
    `;
  }

  getTrackFilter() {
    return this.trackFilter;
  }
}

customElements.define('track-filter', TrackFilterElement);