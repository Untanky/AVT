import Track from './dj/audioTrack.js';

export default class App extends HTMLElement {

  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.render();
  }

  render() {
    return `
      <style>
        #root {
          width: 1000px;
          margin: 0 auto;
        }

        #root h1 {
          text-align: center;
        }
      </style>
      <div id="root">
        <h1>DJ Tool</h1>
        <audio-track></audio-track>
<<<<<<< HEAD
        <audio-track></audio-track>
=======
>>>>>>> 61b4d31e80276a31f99ac8d912eb3f24646d3b90
      </div>
    `;
  }

}

customElements.define('avt-app', App);
