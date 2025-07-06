'use strict';
(function () {
  if(!window.__lib) window.__lib = {};

  const int = val => parseInt(val, 10);
  const float = val => parseFloat(val);
  const str = val => String(val);

  const rndInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const rndFromArray = arr => arr[ rndInt(0, arr.length - 1) ];

  const convertHexToRGBA = (hexCode, opacity = 1) => {  
    let hex = hexCode.replace('#', '');
    if (hex.length === 3) hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    /* Backward compatibility for whole number based opacity values. */
    if (opacity > 1 && opacity <= 100) opacity = opacity / 100;
    return `rgba(${r},${g},${b},${opacity})`;
  };

  const angleGuard = angle => angle % 360;
  const globalAngleToTop = angle => angleGuard( angle - 90 );
  const getCoordsByAngle = (x, y ,_angle, distance) => {
    const angle = angleGuard(_angle - 90);
    const x2 = Math.round(Math.cos(angle * Math.PI / 180) * distance + x);
    const y2 = Math.round(Math.sin(angle * Math.PI / 180) * distance + y);
    return { x: x2, y: y2 };
  }

  const getAngleBtwTwoPoints = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

  function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) return false
    const denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))

    if (denominator === 0) return false

    let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
    let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator

    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) return false

    let x = x1 + ua * (x2 - x1)
    let y = y1 + ua * (y2 - y1)

    return {x, y};
  }

  function checkLineIntersection(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    const result = {
      x: null,
      y: null,
      onLine1: false,
      onLine2: false
    };
    const denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) return result;
    let a = line1StartY - line2StartY;
    let b = line1StartX - line2StartX;
    let numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    let numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));
    if (a > 0 && a < 1) result.onLine1 = true;
    if (b > 0 && b < 1) result.onLine2 = true;
    return result;
  };

  window.__lib = {
    ...(window.__lib || {}),
    int,
    float,
    str,
    rndInt,
    rndFromArray,
    getCoordsByAngle,
    getAngleBtwTwoPoints,
    intersect,
    checkLineIntersection,
    convertHexToRGBA 
  };

})();
