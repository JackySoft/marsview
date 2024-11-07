/**
 *  星云特效
 */
export const initStarCanvas = () => {
  const num = 300;
  const selectorId = 'canvasBox';
  const canvas = document.querySelector(`#${selectorId}`) as HTMLCanvasElement;
  if (!canvas) return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  const xBase = 0;
  const yBase = 0;
  const zBase = 600;
  const dtr = function (d: number) {
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

  interface point {
    x: number;
    y: number;
    z: number;
    p?: number;
  }
  const trans = {
    parts: {
      sz(p: point, sz: point) {
        return {
          x: p.x * sz.x,
          y: p.y * sz.y,
          z: p.z * sz.z,
        };
      },
      rot: {
        x(p: point, rot: point) {
          return {
            x: p.x,
            y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
            z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x)),
          };
        },
        y(p: point, rot: point) {
          return {
            x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
            y: p.y,
            z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y)),
          };
        },
        z(p: point, rot: point) {
          return {
            x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
            y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
            z: p.z,
          };
        },
      },
      pos(p: point, pos: point) {
        return {
          x: p.x + pos.x,
          y: p.y + pos.y,
          z: p.z + pos.z,
        };
      },
    },
    pov: {
      plane(p: point) {
        return {
          x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
          y: p.y,
          z: p.x * -cam.ang.splane + p.z * cam.ang.cplane,
        };
      },
      theta(p: point) {
        return {
          x: p.x,
          y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
          z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta,
        };
      },
      set(p: point) {
        return {
          x: p.x - cam.obj.x,
          y: p.y - cam.obj.y,
          z: p.z - cam.obj.z,
        };
      },
    },
    persp(p: point) {
      return {
        x: ((p.x * cam.dist.z) / p.z) * cam.zoom,
        y: ((p.y * cam.dist.z) / p.z) * cam.zoom,
        z: p.z * cam.zoom,
        p: cam.dist.z / p.z,
      };
    },
    disp(p: point, disp: point) {
      return {
        x: p.x + disp.x,
        y: -p.y + disp.y,
        z: p.z + disp.z,
        p: p.p,
      };
    },
    steps(_obj_: point, sz: point, rot: point, pos: point, disp: point) {
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

  class ThreeD {
    transIn: any;
    transOut: any;

    constructor(param: any) {
      this.transIn = {};
      this.transOut = {};
      this.transIn.vtx = param.vtx;
      this.transIn.sz = param.sz;
      this.transIn.rot = param.rot;
      this.transIn.pos = param.pos;
    }
    vupd() {
      this.transOut = trans.steps(this.transIn.vtx, this.transIn.sz, this.transIn.rot, this.transIn.pos, cam.disp);
    }
  }

  class Build {
    vel = 0.04;
    lim = 360;
    diff = 300;
    initPos = 100;
    toX = xBase;
    toY = yBase;
    canvas: HTMLCanvasElement;
    $: any;
    varr: any[];
    dist: any[];
    calc: any[];
    rotObj: any;
    objSz: any;
    constructor() {
      this.toX = xBase;
      this.toY = yBase;
      this.canvas = document.getElementById(selectorId) as HTMLCanvasElement;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.varr = [];
      this.dist = [];
      this.calc = [];
      this.go();
    }
    go() {
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
    }
    add() {
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
    }
    upd() {
      cam.obj.x += (this.toX - cam.obj.x) * 0.025;
      cam.obj.y += (this.toY - cam.obj.y) * 0.025;
    }
    draw() {
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
    }
    anim() {
      const anim = () => {
        this.upd();
        this.draw();
        window.requestAnimationFrame(anim);
      };
      window.requestAnimationFrame(anim);
    }
    run() {
      this.anim();
    }
  }

  const app = new Build();
  app.run();
};
