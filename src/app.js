import Track from './dj/track.js';

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
        <my-track></my-track>
      </div>
    `;
  }

}

customElements.define('avt-app', App);
