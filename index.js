let canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  round = [],
  WIDTH,
  HEIGHT,
  RADIUS,
  initRoundPopulation = 160;

WIDTH = document.documentElement.clientWidth;
HEIGHT = document.documentElement.clientHeight;
RADIUS = 15;
MAX_X = WIDTH - RADIUS;
MAX_Y = HEIGHT - RADIUS;
const STROKE_COLOR = "gray";
canvas.width = WIDTH;
canvas.height = HEIGHT;

class Round_item {
  constructor(index, x, y, speedX, speedY) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.speedX = speedX;
    this.speedY = speedY;
    this.r = RADIUS;
    this.color = STROKE_COLOR;
  }
  draw() {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.stroke();
  }
}

function clamp(val, min, max) {
  return val < min ? min : val > max ? max : val;
}
function init() {
  for (let i = 0; i < initRoundPopulation; i++) {
    const x = clamp(WIDTH * Math.random(), RADIUS, MAX_X);
    const y = clamp(HEIGHT * Math.random(), RADIUS, MAX_Y);
    const sx = ~~(Math.random() * 2 + 1);
    const sy = ~~(Math.random() * 2 + 1);
    round[i] = new Round_item(i, x, y, sx, sy);
  }
  draw();
}

init();
// let count = 0;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const aIndex = ~~(Math.random() * round.length);
  const bIndex = ~~(Math.random() * round.length);
  for (let i = 0; i < round.length; i++) {
    round[i].draw();
    const { speedY, speedX } = round[i];
    const nextX = round[i].x + speedX;
    const nextY = round[i].y + speedY;
    round[i].x = clamp(nextX, RADIUS, MAX_X);
    round[i].y = clamp(nextY, RADIUS, MAX_Y);
    const flag = inArea(nextX, nextY, RADIUS);
    if (!(flag & 1)) {
      round[i].speedX *= -1;
    }
    if (!((flag >> 1) & 1)) {
      round[i].speedY *= -1;
    }
  }
  // 连接线
  // ctx.moveTo(round[aIndex].x, round[aIndex].y);
  // ctx.lineTo(round[bIndex].x, round[bIndex].y);
  // cxt.strokeStyle = 'red';
  // ctx.stroke();
  // ctx.strokeStyle = 'gray';
  //
  window.requestAnimationFrame(draw);
}

function inArea(x, y, r) {
  let res = 0;
  res = res | (y - r >= 0 && y + r <= HEIGHT);
  res = (res << 1) | (x - r >= 0 && x + r <= WIDTH);
  return res;
}
