import App from './app.js';
import looper from './globals/looper.js'

document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    document.body.appendChild(app);
});

function draw() {

    requestAnimationFrame(draw);

    looper.draw();
}

draw();