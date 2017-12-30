// Sourced from https://codepen.io/linrock/pen/Amdhr with some modifications.

const NUM_CONFETTI = 100;
const COLORS = [[77, 158, 193], [44, 184, 244], [188, 227, 244], [26, 98, 175]];
const PI_2 = 2 * Math.PI;

const range = (a, b) => (b - a) * Math.random() + a;

class Confetti {
  constructor() {
    this.style = COLORS[~~range(0, COLORS.length)];
    this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
    this.r = ~~range(2, 6);
    this.r2 = 2 * this.r;
    this.replace();
  }

  drawCircle = (context, x, y, r, style) => {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    context.fill();
  };

  replace = () => {
    this.opacity = 0;
    this.dop = 0.03 * range(1, 4);
    this.x = range(-this.r2, window.w - this.r2);
    this.y = range(-20, window.h - this.r2);
    this.xmax = window.w - this.r;
    this.ymax = window.h - this.r;
    this.vx = range(0, 2) - 2;
    this.vy = 0.7 * this.r + range(-1, 1);
  };

  draw = context => {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity += this.dop;
    if (this.opacity > 1) {
      this.opacity = 1;
      this.dop *= -1;
    }
    if (this.opacity < 0 || this.y > this.ymax) {
      this.replace();
    }
    if (!(0 < this.x < this.xmax)) {
      this.x = (this.x + this.xmax) % this.xmax;
    }
    this.drawCircle(
      context,
      ~~this.x,
      ~~this.y,
      this.r,
      this.rgb + ',' + this.opacity + ')'
    );
  };
}

class ConfettiManager {
  constructor(canvas, context) {
    this.confetti = [];
    this.canvas = canvas;
    this.context = context;

    for (let i = 1; i <= NUM_CONFETTI; i++) {
      this.confetti.push(new Confetti());
    }
  }

  start() {
    this.stopped = false;
    this.step();
  }

  stop() {
    this.stopped = true;
  }

  step = () => {
    if (this.stopped) {
      return;
    }

    requestAnimationFrame(this.step);
    this.context.clearRect(0, 0, window.w, window.h);
    this.confetti.forEach(c => {
      c.draw(this.context);
    });
  };
}

export default ConfettiManager;
