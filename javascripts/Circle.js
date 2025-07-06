'use strict';
(function () {
  if(!window.__lib) window.__lib = {};
  const {
    palette,
    rndColor,
    convertHexToRGBA
  } = window.__lib;


  class Circle {
    static id = 0;
    id = 0;
    maxRadius = 1000;
    x        = 0;
    y        = 0;
    radius   = 0;
    expandSpeed = 1;
    color = null;
    expandSpeedFactor = parseFloat(`0.00${rndInt(1, 9)}`);
    gWidth      = window.innerWidth;
    gHeight     = window.innerHeight;
    destroyFn     = null;
    isDeleted = false;


    constructor(options) {
      const {
        radius = 0,
        x      = 0,
        y      = 0,
        p      = null,
      } = options;
      this.id = Circle.id++;

      this.x      = x;
      this.y      = y;
      this.radius = radius;
      this.color       = convertHexToRGBA( rndColor(p) );
    }


    mutateSpeed() {
      this.expandSpeed += this.expandSpeedFactor;
    }

    mutateRadius() {
      this.radius += this.expandSpeed;
    }
    mutateAlpha() {
      const alpha = ( 1 - this.radius / this.maxRadius ).toFixed(4);
      this.color = this.color.replace(/rgba\((.+,)(.+,)(.+,)(.+)\)/gim, `rgba($1$2$3 ${alpha})`);
    }

    setDestroy (fn) {
      this.destroy = fn;
      return this;
    }
    destroy () {
      this.isDeleted = true;
      this.destroyFn();
    }

    expand() {
      if(this.isDeleted) return null;
      this.mutateSpeed();
      this.mutateRadius();
      this.mutateAlpha();
      if(this.radius > this.maxRadius) this.destroy();
      return this;
    }

    render () {
      if(this.isDeleted) return null;
      stroke(this.color);
      fill(this.color);
      circle(this.x, this.y, this.diametr);
      fill(palette['Default'])
      return this;
    }

    get diametr() { return this.radius * 2; }

  };

  window.__lib.Circle = Circle;

})();
