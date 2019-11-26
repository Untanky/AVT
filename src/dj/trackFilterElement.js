import TrackFilterNode from './trackFilterNode.js';

export default class TrackFilterElement extends HTMLElement {

  constructor() {
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
  }
}

customElements.define('track-filter', TrackFilterElement);