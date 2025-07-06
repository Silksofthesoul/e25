const {
  rndInt,
  Circle,
  rndColor,
  paletteInit,
} = window.__lib;

const gWidth = window.innerWidth;
const gHeight = window.innerHeight;
const padd = 50;

let maskLayer = null;
let font = null;

function preload() {
  // font = loadFont('/e24/RobotoSlab-Black.ttf');
}

const createMask = m => {
  if(maskLayer) maskLayer.elt.remove();
  maskLayer = createGraphics(gWidth, gHeight);
  // maskLayer.background(255);
  // maskLayer.erase();
  // maskLayer.textFont(font);
  maskLayer.textSize(( Math.max( gWidth, gHeight ) / 2 ) - ( padd * 2 ));
  maskLayer.textAlign(CENTER, CENTER);
  maskLayer.fill(255);
  maskLayer.text('1:1', gWidth / 2, ( ( gHeight / 2 ) - ( padd * 2 ) ) + (m?m:0));
  maskLayer.rotate(45);
  // maskLayer.noErase();
};


function setup() {
  createCanvas(gWidth, gHeight);
  createMask(null);
}

const circles = {};
let p = paletteInit();
const clone = _ => {
  const c = new Circle({x: rndInt(0, gWidth), y: rndInt(0, gHeight), radius: 0, p})
  c
    .setDestroy(_ => {
      const i = rndInt(1, 10);
      for(let j = 0; j < i; j++) if(Object.keys(circles).length < 100) clone();
      delete circles[c.id];
    });
  circles[c.id] = c;
}

let rad = rndInt(3, 8);
const c = clone();
let angle = 0;
function draw() {
  if(rndInt(1, 10000) % 3333 === 0) p = paletteInit();
  angle = radians(rad) * sin(frameCount * 0.01);
  background('rgba(255, 255, 255, 0.1)');
  // if(rndInt(1, 100) % 33 === 0) createMask(rndInt(-50, 50));
  Object.entries(circles)
    .forEach(([key, value]) => {
      value
        .expand()
        .render()
    });
  push();
  translate(0, 100);
  rotate(angle);
  image(maskLayer, 0, 0);
  pop();
}
