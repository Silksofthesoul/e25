'use strict';
(function () {
  if(!window.__lib) window.__lib = {};

const {rndInt} = window.__lib;

  const { entries } = Object;

  const p1 = {
    'Melon':          '#fec5bb',
    'Pale Dogwood':   '#fcd5ce',
    'Misty rose':     '#fae1dd',
    'Seashell':       '#f8edeb',
    'Platinum':       '#e8e8e4',
    'Platinum 2':     '#d8e2dc',
    'Linen':          '#ece4db',
    'Champagne pink': '#ffe5d9',
    'Apricot':        '#ffd7ba',
    'Peach':          '#fec89a',

  };

  const p2 = {
    'Pale azure'      : '#70d6ff',
    'Cyclamen'        : '#ff70a6',
    'Atomic tangerine': '#ff9770',
    'Naples yellow'   : '#ffd670',
    'Mindaro'         : '#e9ff70'
  };

  const p3 = {
    'Argentinian Blue': '#5aa9e6',
    'Light Sky Blue'  : '#7fc8f8',
    'Seasalt'         : '#f9f9f9',
    'Naples yellow'   : '#ffe45e',
    'Cyclamen'        : '#ff6392'
  };

  const p4 = {
    "Ultra pink"  : "#ff69eb",
    "Persian pink": "#ff86c8",
    "Salmon pink" : "#ffa3a5",
    "Fawn"        : "#ffbf81",
    "Mustard"     : "#ffdc5e"
  };
  const p5 = {
    "Safety orange"    : "#ff7b00",
    "Dark orange (web)": "#ff8800",
    "Princeton orange" : "#ff9500",
    "Orange peel"      : "#ffa200",
    "Orange (web)"     : "#ffaa00",
    "Selective yellow" : "#ffb700",
    "Mikado yellow"    : "#ffc300",
    "Jonquil"          : "#ffd000",
    "School bus yellow": "#ffdd00",
    "Canary"           : "#ffea00"
  };


  const _palette = [p1, p2, p3, p4, p5];

  const paletteInit = _ => {
    const palette = _palette[rndInt(0, _palette.length - 1)];
    return {
      ...palette,
      'Default': '#ffffff',
    }
  };

  const palette = paletteInit();

  const rndColor = (palette) => entries(palette)
    .filter(e => e[0] !== 'Default')
    .map(e => e[1])
    .sort(() => Math.random() - 0.5)
    .shift();


  window.__lib = {
    ...(window.__lib || {}),
    palette,
    rndColor,
    paletteInit,
  };

})();
