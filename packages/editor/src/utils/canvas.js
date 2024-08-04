import { debounce } from 'lodash-es';

/**
 * @description: 星云特效
 */
export const setNebulaCanvas = () => {
  const num = 300;
  const selectorId = 'canvasBox';
  const canvas = document.querySelector(`#${selectorId}`);
  let w = window.innerWidth;
  let h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  const xBase = 0;
  const yBase = 0;
  const zBase = 600;
  const dtr = function (d) {
    return (d * Math.PI) / 180;
  };

  const rnd = function () {
    return Math.sin((Math.floor(Math.random() * 360) * Math.PI) / 180);
  };

  const cam = {
    obj: {
      x: xBase,
      y: yBase,
      z: zBase,
    },
    dest: {
      x: 0,
      y: 0,
      z: 1,
    },
    dist: {
      x: 0,
      y: 0,
      z: 200,
    },
    ang: {
      cplane: 0,
      splane: 0,
      ctheta: 0,
      stheta: 0,
    },
    zoom: 1,
    disp: {
      x: w / 2,
      y: h / 2,
      z: 0,
    },
    upd() {
      cam.dist.x = cam.dest.x - cam.obj.x;
      cam.dist.y = cam.dest.y - cam.obj.y;
      cam.dist.z = cam.dest.z - cam.obj.z;
      cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
      cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
      cam.ang.ctheta =
        Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) /
        Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
      cam.ang.stheta = -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
    },
  };

  const trans = {
    parts: {
      sz(p, sz) {
        return {
          x: p.x * sz.x,
          y: p.y * sz.y,
          z: p.z * sz.z,
        };
      },
      rot: {
        x(p, rot) {
          return {
            x: p.x,
            y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
            z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x)),
          };
        },
        y(p, rot) {
          return {
            x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
            y: p.y,
            z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y)),
          };
        },
        z(p, rot) {
          return {
            x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
            y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
            z: p.z,
          };
        },
      },
      pos(p, pos) {
        return {
          x: p.x + pos.x,
          y: p.y + pos.y,
          z: p.z + pos.z,
        };
      },
    },
    pov: {
      plane(p) {
        return {
          x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
          y: p.y,
          z: p.x * -cam.ang.splane + p.z * cam.ang.cplane,
        };
      },
      theta(p) {
        return {
          x: p.x,
          y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
          z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta,
        };
      },
      set(p) {
        return {
          x: p.x - cam.obj.x,
          y: p.y - cam.obj.y,
          z: p.z - cam.obj.z,
        };
      },
    },
    persp(p) {
      return {
        x: ((p.x * cam.dist.z) / p.z) * cam.zoom,
        y: ((p.y * cam.dist.z) / p.z) * cam.zoom,
        z: p.z * cam.zoom,
        p: cam.dist.z / p.z,
      };
    },
    disp(p, disp) {
      return {
        x: p.x + disp.x,
        y: -p.y + disp.y,
        z: p.z + disp.z,
        p: p.p,
      };
    },
    steps(_obj_, sz, rot, pos, disp) {
      let _args = trans.parts.sz(_obj_, sz);
      _args = trans.parts.rot.x(_args, rot);
      _args = trans.parts.rot.y(_args, rot);
      _args = trans.parts.rot.z(_args, rot);
      _args = trans.parts.pos(_args, pos);
      _args = trans.pov.plane(_args);
      _args = trans.pov.theta(_args);
      _args = trans.pov.set(_args);
      _args = trans.persp(_args);
      _args = trans.disp(_args, disp);
      return _args;
    },
  };

  (function () {
    'use strict';
    const ThreeD = function (param) {
      this.transIn = {};
      this.transOut = {};
      this.transIn.vtx = param.vtx;
      this.transIn.sz = param.sz;
      this.transIn.rot = param.rot;
      this.transIn.pos = param.pos;
    };

    ThreeD.prototype.vupd = function () {
      this.transOut = trans.steps(this.transIn.vtx, this.transIn.sz, this.transIn.rot, this.transIn.pos, cam.disp);
    };

    const Build = function () {
      this.vel = 0.04;
      this.lim = 360;
      this.diff = 300;
      this.initPos = 100;
      this.toX = xBase;
      this.toY = yBase;
      this.go();
    };

    Build.prototype.go = function () {
      this.canvas = document.getElementById(selectorId);
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.$ = this.canvas.getContext('2d');
      this.$.globalCompositeOperation = 'source-over';
      this.varr = [];
      this.dist = [];
      this.calc = [];

      for (let i = 0, len = num; i < len; i += 1) {
        this.add();
      }

      this.rotObj = {
        x: 0,
        y: 0,
        z: 0,
      };
      this.objSz = {
        x: w / 5,
        y: h / 5,
        z: w / 5,
      };
    };

    Build.prototype.add = function () {
      this.varr.push(
        new ThreeD({
          vtx: {
            x: rnd(),
            y: rnd(),
            z: rnd(),
          },
          sz: {
            x: 0,
            y: 0,
            z: 0,
          },
          rot: {
            x: 20,
            y: -20,
            z: 0,
          },
          pos: {
            x: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            y: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
            z: this.diff * Math.sin((360 * Math.random() * Math.PI) / 180),
          },
        }),
      );
      this.calc.push({
        x: 360 * Math.random(),
        y: 360 * Math.random(),
        z: 360 * Math.random(),
      });
    };

    Build.prototype.upd = function () {
      cam.obj.x += (this.toX - cam.obj.x) * 0.025;
      cam.obj.y += (this.toY - cam.obj.y) * 0.025;
    };

    Build.prototype.draw = function () {
      this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);
      cam.upd();
      this.rotObj.x += 0.05;
      this.rotObj.y += 0.05;
      this.rotObj.z += 0.05;

      for (let i = 0; i < this.varr.length; i += 1) {
        for (const key in this.calc[i]) {
          if (Object.prototype.hasOwnProperty.call(this.calc[i], key)) {
            this.calc[i][key] += this.vel;
            if (this.calc[i][key] > this.lim) this.calc[i][key] = 0;
          }
        }

        this.varr[i].transIn.pos = {
          x: this.diff * Math.cos((this.calc[i].x * Math.PI) / 180),
          y: this.diff * Math.sin((this.calc[i].y * Math.PI) / 180),
          z: this.diff * Math.sin((this.calc[i].z * Math.PI) / 180),
        };
        this.varr[i].transIn.rot = this.rotObj;
        this.varr[i].transIn.sz = this.objSz;
        this.varr[i].vupd();
        if (this.varr[i].transOut.p < 0) continue;
        const g = this.$.createRadialGradient(
          this.varr[i].transOut.x,
          this.varr[i].transOut.y,
          this.varr[i].transOut.p,
          this.varr[i].transOut.x,
          this.varr[i].transOut.y,
          this.varr[i].transOut.p * 2,
        );
        this.$.globalCompositeOperation = 'lighter';
        g.addColorStop(0, 'hsla(255, 255%, 255%, 1)');
        g.addColorStop(0.5, `hsla(${i + 2}, 79%, 50%, 1)`);
        g.addColorStop(1, `hsla(${i}, 79%, 50%, .5)`);
        this.$.fillStyle = g;
        this.$.beginPath();
        this.$.arc(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2, 0, Math.PI * 2, false);
        this.$.fill();
        this.$.closePath();
      }
    };

    Build.prototype.anim = function () {
      window.requestAnimationFrame = (function () {
        return (
          window.requestAnimationFrame ||
          function (callback, element) {
            window.setTimeout(callback, 1000 / 30);
          }
        );
      })();
      const anim = function () {
        this.upd();
        this.draw();
        window.requestAnimationFrame(anim);
      }.bind(this);
      window.requestAnimationFrame(anim);
    };

    Build.prototype.run = function () {
      this.anim();
      //   window.addEventListener(
      //     'mousedown',
      //     function (e) {
      //       for (let i = 0; i < 100; i += 1) {
      //         this.add();
      //       }
      //     }.bind(this),
      //   );
    };
    const app = new Build();
    app.run();
  })();
};

/**
 * @description: 星空特效
 */
export const setStarryCanvas = () => {
  const selectorId = 'canvasBox';
  const canvas = document.querySelector(`#${selectorId}`);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const c = canvas.getContext('2d');

  const numStars = 1200;
  const focalLength = canvas.width * 2;
  let centerX, centerY;

  let stars = [];
  let star;
  let i;

  const animate = true;

  initializeStars();

  function executeFrame() {
    if (animate) window.requestAnimationFrame(executeFrame);
    moveStars();
    drawStars();
  }

  function initializeStars() {
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    stars = [];
    for (i = 0; i < numStars; i += 1) {
      star = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * canvas.width,
        o: `0.${Math.floor(Math.random() * 99)}1`,
      };
      stars.push(star);
    }
  }

  function moveStars() {
    for (i = 0; i < numStars; i += 1) {
      star = stars[i];
      star.z -= 1;

      if (star.z <= 0) {
        star.z = canvas.width;
      }
    }
  }

  function drawStars() {
    let pixelX, pixelY, pixelRadius;
    c.clearRect(0, 0, canvas.width, canvas.height); // 清除
    for (i = 0; i < numStars; i += 1) {
      star = stars[i];

      pixelX = (star.x - centerX) * (focalLength / star.z);
      pixelX += centerX;
      pixelY = (star.y - centerY) * (focalLength / star.z);
      pixelY += centerY;
      pixelRadius = 1 * (focalLength / star.z);

      c.beginPath();
      c.arc(pixelX, pixelY, pixelRadius > 20 ? 20 : pixelRadius, 0, 2 * Math.PI);
      c.fillStyle = `rgba(209, 255, 255, ${star.o} )`;
      c.fill();
      c.closePath(); // 结束绘制
    }
  }

  window.addEventListener(
    'resize',
    debounce(function () {
      // Resize to the screen
      if (canvas.width !== window.innerWidth || canvas.width !== window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeStars();
      }
    }, 100),
    false,
  );

  executeFrame();
};
