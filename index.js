let canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  round = [],
  WIDTH,
  HEIGHT,
  RADIUS,
  initRoundPopulation = 5000;

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
  draw(fill) {
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.stroke();
    if (fill) {
      ctx.fill();
    }
  }
}

function clamp(val, min, max) {
  return val < min ? min : val > max ? max : val;
}
let aIndex = ~~(Math.random() * round.length);
let bIndex = ~~(Math.random() * round.length);

function init() {
  for (let i = 0; i < initRoundPopulation; i++) {
    const x = clamp(WIDTH * Math.random(), RADIUS, MAX_X);
    const y = clamp(HEIGHT * Math.random(), RADIUS, MAX_Y);
    const initXDirection = Math.random() > 0.5 ? 1 : -1;
    const initYDirection = Math.random() > 0.5 ? 1 : -1;
    const sx = ~~(Math.random() * 1 + 0.1) * initXDirection;
    const sy = ~~(Math.random() * 2 + 0.1) * initYDirection;
    round[i] = new Round_item(i, x, y, sx, sy);
  }
  draw();
}

init();
// let count = 0;
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const [aIndex, bIndex] = closestPair(round);
  for (let i = 0; i < round.length; i++) {
    const fill = i === aIndex || i === bIndex;
    round[i].draw(fill);
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
  // closest Pair

  // console.log(aIndex, bIndex)
  //
  // 连接线
  //
  window.requestAnimationFrame(draw);
}

function inArea(x, y, r) {
  let res = 0;
  res = res | (y - r >= 0 && y + r <= HEIGHT);
  res = (res << 1) | (x - r >= 0 && x + r <= WIDTH);
  return res;
}
function closestPair(roundList) {
  let res = [0, 1];
  const [a, b] = res;
  let closestDistance = Math.sqrt(
    (roundList[a].x - roundList[b].x) ** 2 +
      (roundList[a].y - roundList[b].y) ** 2
  );
  for (let i = 0; i < roundList.length; i++) {
    for (let j = i + 1; j < roundList.length; j++) {
      let distance = Math.sqrt(
        (roundList[i].x - roundList[j].x) ** 2 +
          (roundList[i].y - roundList[j].y) ** 2
      );
      if (distance < closestDistance) {
        res = [i, j];
        closestDistance = distance;
      }
    }
  }
  return res;
}
