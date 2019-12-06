<<<<<<< HEAD
import TrackFilter from './trackFilter.js'
=======
import TrackFilterNode from './trackFilterNode.js';
>>>>>>> 61b4d31e80276a31f99ac8d912eb3f24646d3b90

export default class TrackFilterElement extends HTMLElement {

  constructor() {
<<<<<<< HEAD
    
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
=======
    super();

    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.innerHTML = this.render();

    this.trackfilterNode = new TrackFilterNode(); 

    this.setupInputElement();
  }

  setupInputElement() {
    /**
     * TODO: Extract input elements from html
     * 
     * this.slider = this.shadow.querySelector('#slider');
     * 
     * etc.
     */

     /**
      * TODO: Bind event listeners
      * 
      * this.slider.addEventListener("input", onSliderChange(), false);
      */
  }

  /**
   * TODO: Create Event Listeners for the controll element in the html
   * 
   * onSliderChange() { trackFilter.set[...](this.slider.value) }
   */

  render() {
    /**
     * TODO: Create input element in html
     */
    return `
      <h2>Filter</h2>
    `
  }

  getNode() {
    return this.trackfilterNode;
>>>>>>> 61b4d31e80276a31f99ac8d912eb3f24646d3b90
  }
}

customElements.define('track-filter', TrackFilterElement);