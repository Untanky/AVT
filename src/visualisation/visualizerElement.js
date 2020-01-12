// import Visualizer from './visualizer.js'
// import AudioElements from '../audioElement.js';

// export default class VisualizerElement extends AudioElements {

//   constructor() {

//     super()

//     let shadow = this.attachShadow({ mode: 'open' });
//     shadow.innerHTML = this.render();

//     this.visualizer = new Visualizer(this.canvas);
//   }

//   onTypeSelectorChange() {

//     this.visualizer.setVisualizer(this.typeSelector.value);
//   }

//   render() {
//     return `
//       <style>
//         .visualizer-container {
//           width: 100%;
//           max-width: 620px;
//           margin: 0 auto;
//         }

//         .visualizer-container > .canvas-container > #canvas {
//           width: 100%;
//           border: 1px solid rgb(225, 225, 225);
//           border-radius: 24px;
//           box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
//         }
//       </style>
//       <div class="visualizer-container">
//         <div class="canvas-container">
//           <canvas id="canvas"></canvas>
//         </div>
//         <div class="visualization-type-selector">
//           <label for="type-selector">Select visualization</label>
//           <select id="type-selector">
//             <option>bars</option>
//             <option>line</option>
//           </select>
//         </div>
//       </div>
//     `
//   }

//   getVisualizer() {
//     return this.visualizer;
//   }
// }

// customElements.define('visualizer-element', VisualizerElement);