let canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d"),
  round = [],
  WIDTH,
  HEIGHT,
  RADIUS,
  initRoundPopulation = 3000;
let divideAndConquer = false

WIDTH = document.documentElement.clientWidth;
HEIGHT = document.documentElement.clientHeight - 100;
RADIUS = 10;
MAX_X = WIDTH - RADIUS;
MAX_Y = HEIGHT - RADIUS;
const STROKE_COLOR = "gray";

canvas.width = WIDTH;
canvas.height = HEIGHT;

const button = document.getElementById("switch");

// event handler
button.addEventListener("click", (e) => {
  if (divideAndConquer) {
    e.target.innerHTML = "divideAndConquer";
  } else {
    e.target.innerHTML = "brute";
  }
  divideAndConquer = !divideAndConquer;
});
//

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
    const sx = (Math.random() * 1 + 0.5) * initXDirection;
    const sy = (Math.random() * 1 + 0.5) * initYDirection;
    round[i] = new Round_item(i, x, y, sx, sy);
  }
  draw();
}

init();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const algorithm = divideAndConquer ? closestPairDC : closestPairBrute;
  const [aIndex, bIndex] = algorithm(round);

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

  window.requestAnimationFrame(draw);
}

function inArea(x, y, r) {
  let res = 0;
  res = res | (y - r >= 0 && y + r <= HEIGHT);
  res = (res << 1) | (x - r >= 0 && x + r <= WIDTH);
  return res;
}
//brute
function closestPairBrute(roundList) {
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
// divide and conquer
function closestPairDC(roundList) {
  const PX = roundList.map((round, index) => ({
    x: round.x,
    y: round.y,
    i: index,
  }));
  const PY = PX.slice();
  PX.sort((a, b) => a.x - b.x);
  PY.sort((a, b) => a.y - b.y);
  const [a, b] = closestPair2Helper(PX, PY);
  return [a.i, b.i];
}

function closestPair2Helper(px, py) {
  if (px.length <= 3) {
    return px.length === 3 ? closestFromThree(px) : px;
  }
  const mid = ~~(px.length / 2);
  const lx = px.slice(0, mid);
  const rx = px.slice(mid);
  const ly = [];
  const ry = [];
  for (let i = 0; i < py.length; i++) {
    if (py[i].x < px[mid].x && ly.length < mid) {
      ly.push(py[i]);
    } else {
      ry.push(py[i]);
    }
  }
  let [l1, l2] = closestPair2Helper(lx, ly);
  let [r1, r2] = closestPair2Helper(rx, ry);
  let minPair;
  let min;
  // let min = Math.min(distance(l1, l2), distance(r1, r2));
  if (distance(l1, l2) < distance(r1, r2)) {
    min = distance(l1, l2);
    minPair = [l1, l2];
  } else {
    min = distance(r1, r2);
    minPair = [r1, r2];
  }
  let [s1, s2] = closestSplitPair(px, py, min);
  return s1
    ? distance(l1, l2) < distance(r1, r2)
      ? distance(l1, l2) < distance(s1, s2)
        ? [l1, l2]
        : [s1, s2]
      : distance(r1, r2) < distance(s1, s2)
      ? [r1, r2]
      : [s1, s2]
    : minPair;
}
function closestSplitPair(px, py, min) {
  const mid = ~~(px.length / 2);
  const midX = px[mid].x;
  const sy = [];

  const upBound = midX + min;
  const lowBound = midX - min;
  for (let i = 0; i < py.length; i++) {
    if (py[i].x >= lowBound && py[i].x <= upBound) {
      sy.push(py[i]);
    }
  }
  let best = min;
  let bestPair = [];
  for (let i = 0; i < sy.length - 1; i++) {
    for (let j = 1; j <= Math.min(7, sy.length - i - 1); j++) {
      if (distance(sy[i], sy[i + j]) < best) {
        best = distance(sy[i], sy[i + j]);
        bestPair = [sy[i], sy[i + j]];
      }
    }
  }
  return bestPair;
}

function closestFromThree(parr) {
  return distance(parr[0], parr[1]) < distance(parr[1], parr[2])
    ? distance(parr[0], parr[1]) < distance(parr[0], parr[2])
      ? [parr[0], parr[1]]
      : [parr[0], parr[2]]
    : distance(parr[1], parr[2]) < distance(parr[0], parr[2])
    ? [parr[1], parr[2]]
    : [parr[0], parr[2]];
}

function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}
