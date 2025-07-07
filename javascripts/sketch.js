const {
  rndInt,
  Circle,
  rndColor,
  paletteInit,
} = window.__lib;

const gWidth = window.innerWidth;
const gHeight = window.innerHeight;
const padd = 50;

let maskLayerF = null;
let font = null;
const txt = '1:1';

function preload() {
  // font = loadFont('/e24/RobotoSlab-Black.ttf');
}

const createMaskF = ( m ) => {
  if(maskLayerF) maskLayerF.elt.remove();
  maskLayerF = createGraphics(gWidth, gHeight);
  maskLayerF.textSize(( Math.max( gWidth, gHeight ) / 2 ) - ( padd * 2 ));
  maskLayerF.textAlign(CENTER, CENTER);
  maskLayerF.fill(255);
  maskLayerF.text(txt, gWidth / 2, ( ( gHeight / 2 ) - ( padd * 2 ) ) + (m?m:0));
  maskLayerF.rotate(45);

};


function setup() {
  createCanvas(gWidth, gHeight);
  createMaskF(null);
}

const circles = {};
const cMax = 100;

let p = paletteInit();
const clone = _ => {
  let t = setTimeout(_ => {
  const c = new Circle({x: rndInt(0, gWidth), y: rndInt(0, gHeight), radius: 0, p})
  c
    .setDestroy(_ => {
      const i = rndInt(1, 10);
      for(let j = 0; j < i; j++) if(Object.keys(circles).length < cMax) clone();
      delete circles[c.id];
    });
    circles[c.id] = c;
    clearTimeout(t);

  }, rndInt(500, 2500));
} 


let rad = rndInt(3, 8);
const c = clone();
let angleF = 0;


function draw() {
  if(rndInt(1, 10000) % 333 === 0) p = paletteInit();
  angleF = radians(rad) * sin(frameCount * 0.01);
  background('rgba(255, 255, 255, 0.1)');
  Object.entries(circles)
    .forEach(([key, value]) => {
      value
        .expand()
        .render()
    });
  push();
    translate(0, 100);
    rotate(angleF);
    image(maskLayerF, 0, 0);
  pop();
}
