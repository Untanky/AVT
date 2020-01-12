var stage = new PIXI.Container(0x333333);
var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, {view: document.getElementById("canvas"), autoResize: true});


var audio =
{
	ctx: new AudioContext(),
	sound: {
		url: "//zupra.github.io/test/audio/lose_yourself_to_dance.mp3",
		loop: true
	},
	request: new XMLHttpRequest(),
	data: {}
}

audio.sound.source = audio.ctx.createBufferSource();
audio.sound.volume = audio.ctx.createGain();
audio.sound.panner = audio.ctx.createPanner();
audio.data.analyser = audio.ctx.createAnalyser();

audio.request.open("GET", audio.sound.url, true);
audio.request.responseType = "arraybuffer";
audio.request.onload = function (e) {
	audio.ctx.decodeAudioData(this.response, function onSuccess (buffer) 
	{
		audio.sound.buffer = buffer;
		audio.sound.source.buffer = audio.sound.buffer;
		audio.sound.source.start(0);
	},function onError (error)
	{
		alert(error);		
	});
};
audio.request.send();

audio.sound.source.connect(audio.sound.volume);
audio.sound.volume.connect(audio.sound.panner);
audio.sound.volume.connect(audio.data.analyser);
audio.sound.panner.connect(audio.ctx.destination);
audio.sound.source.loop = true;
audio.sound.panner.setPosition(0,0,1);

audio.data.analyser.fftSize = 256;
audio.data.buffer_length = audio.data.analyser.frequencyBinCount;
audio.data.buffer_array = new Uint8Array(audio.data.buffer_length);
audio.data.analyser.getByteFrequencyData(audio.data.buffer_array);
console.log(audio.data.buffer_array);
var circles = [];
var graphics = new PIXI.Graphics();
var mouseX = 0;
var mouseY = 0;
var halfWidth = window.innerWidth / 2;
var halfHeight = window.innerHeight / 2;
stage.addChild(graphics);
console.log(audio.data.buffer_length);
for(var i = 0; i < 128; i++)
{
	circles[i] = {x: (window.innerWidth / 128) * i,y: window.innerHeight / 2};
}

var x = 0;
function draw() 
{
	graphics.clear();
	
	for(var i = 0; i < circles.length; i++)
	{
    if (i % 2 == 0)
      {
        graphics.beginFill( 0xcccccc);
      } else {
		graphics.beginFill(0xffffff);
      }
		graphics.drawCircle(circles[i].x, circles[i].y, Math.random() * 2);
	}
	
	audio.data.analyser.getByteFrequencyData(audio.data.buffer_array);
	
	for (var i = 0; i < audio.data.buffer_length; i++)
	{
		circles[i].x = (window.innerWidth / 128) * i;
		circles[i].y += ((((halfHeight /2 - (audio.data.buffer_array[i] / 2)) - circles[i].y) + ((audio.data.buffer_array[i] * 2)))) / 1.5;
	}		

    renderer.render(stage);            
    requestAnimationFrame(draw);
}

function onResize (event)
{
	renderer.resize(window.innerWidth, window.innerHeight);
	halfWidth = window.innerWidth / 2;
	halfHeight = window.innerHeight / 2;
}

function onMouseMove (event)
{
	mouseX = window.event.clientX;
	mouseY = window.event.clientY;
}

window.addEventListener("resize", onResize);
window.addEventListener("mousemove", onMouseMove);

draw();
