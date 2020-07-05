/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let canvas = document.getElementById(\"canvas\"),\r\n  ctx = canvas.getContext(\"2d\"),\r\n  round = [],\r\n  WIDTH,\r\n  HEIGHT,\r\n  RADIUS,\r\n  initRoundPopulation = 3000;\r\nlet divideAndConquer = false\r\n\r\nWIDTH = document.documentElement.clientWidth;\r\nHEIGHT = document.documentElement.clientHeight - 100;\r\nRADIUS = 10;\r\nMAX_X = WIDTH - RADIUS;\r\nMAX_Y = HEIGHT - RADIUS;\r\nconst STROKE_COLOR = \"gray\";\r\n\r\ncanvas.width = WIDTH;\r\ncanvas.height = HEIGHT;\r\n\r\nconst button = document.getElementById(\"switch\");\r\n\r\n// event handler\r\nbutton.addEventListener(\"click\", (e) => {\r\n  if (divideAndConquer) {\r\n    e.target.innerHTML = \"divideAndConquer\";\r\n  } else {\r\n    e.target.innerHTML = \"brute\";\r\n  }\r\n  divideAndConquer = !divideAndConquer;\r\n});\r\n//\r\n\r\nclass Round_item {\r\n  constructor(index, x, y, speedX, speedY) {\r\n    this.index = index;\r\n    this.x = x;\r\n    this.y = y;\r\n    this.speedX = speedX;\r\n    this.speedY = speedY;\r\n    this.r = RADIUS;\r\n    this.color = STROKE_COLOR;\r\n  }\r\n  draw(fill) {\r\n    ctx.strokeStyle = this.color;\r\n    ctx.beginPath();\r\n    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);\r\n    ctx.closePath();\r\n    ctx.stroke();\r\n    if (fill) {\r\n      ctx.fill();\r\n    }\r\n  }\r\n}\r\n\r\nfunction clamp(val, min, max) {\r\n  return val < min ? min : val > max ? max : val;\r\n}\r\nlet aIndex = ~~(Math.random() * round.length);\r\nlet bIndex = ~~(Math.random() * round.length);\r\n\r\nfunction init() {\r\n  for (let i = 0; i < initRoundPopulation; i++) {\r\n    const x = clamp(WIDTH * Math.random(), RADIUS, MAX_X);\r\n    const y = clamp(HEIGHT * Math.random(), RADIUS, MAX_Y);\r\n    const initXDirection = Math.random() > 0.5 ? 1 : -1;\r\n    const initYDirection = Math.random() > 0.5 ? 1 : -1;\r\n    const sx = (Math.random() * 1 + 0.5) * initXDirection;\r\n    const sy = (Math.random() * 1 + 0.5) * initYDirection;\r\n    round[i] = new Round_item(i, x, y, sx, sy);\r\n  }\r\n  draw();\r\n}\r\n\r\ninit();\r\n\r\nfunction draw() {\r\n  ctx.clearRect(0, 0, canvas.width, canvas.height);\r\n\r\n  const algorithm = divideAndConquer ? closestPairDC : closestPairBrute;\r\n  const [aIndex, bIndex] = algorithm(round);\r\n\r\n  for (let i = 0; i < round.length; i++) {\r\n    const fill = i === aIndex || i === bIndex;\r\n    round[i].draw(fill);\r\n    const { speedY, speedX } = round[i];\r\n    const nextX = round[i].x + speedX;\r\n    const nextY = round[i].y + speedY;\r\n    round[i].x = clamp(nextX, RADIUS, MAX_X);\r\n    round[i].y = clamp(nextY, RADIUS, MAX_Y);\r\n    const flag = inArea(nextX, nextY, RADIUS);\r\n    if (!(flag & 1)) {\r\n      round[i].speedX *= -1;\r\n    }\r\n    if (!((flag >> 1) & 1)) {\r\n      round[i].speedY *= -1;\r\n    }\r\n  }\r\n\r\n  window.requestAnimationFrame(draw);\r\n}\r\n\r\nfunction inArea(x, y, r) {\r\n  let res = 0;\r\n  res = res | (y - r >= 0 && y + r <= HEIGHT);\r\n  res = (res << 1) | (x - r >= 0 && x + r <= WIDTH);\r\n  return res;\r\n}\r\nfunction closestPairBrute(roundList) {\r\n  let res = [0, 1];\r\n  const [a, b] = res;\r\n  let closestDistance = Math.sqrt(\r\n    (roundList[a].x - roundList[b].x) ** 2 +\r\n      (roundList[a].y - roundList[b].y) ** 2\r\n  );\r\n  for (let i = 0; i < roundList.length; i++) {\r\n    for (let j = i + 1; j < roundList.length; j++) {\r\n      let distance = Math.sqrt(\r\n        (roundList[i].x - roundList[j].x) ** 2 +\r\n          (roundList[i].y - roundList[j].y) ** 2\r\n      );\r\n      if (distance < closestDistance) {\r\n        res = [i, j];\r\n        closestDistance = distance;\r\n      }\r\n    }\r\n  }\r\n  return res;\r\n}\r\n// divide and conquer\r\nfunction closestPairDC(roundList) {\r\n  const PX = roundList.map((round, index) => ({\r\n    x: round.x,\r\n    y: round.y,\r\n    i: index,\r\n  }));\r\n  const PY = PX.slice();\r\n  PX.sort((a, b) => a.x - b.x);\r\n  PY.sort((a, b) => a.y - b.y);\r\n  const [a, b] = closestPair2Helper(PX, PY);\r\n  return [a.i, b.i];\r\n}\r\n\r\nfunction closestPair2Helper(px, py) {\r\n  if (px.length <= 3) {\r\n    return px.length === 3 ? closestFromThree(px) : px;\r\n  }\r\n  const mid = ~~(px.length / 2);\r\n  const lx = px.slice(0, mid);\r\n  const rx = px.slice(mid);\r\n  const ly = [];\r\n  const ry = [];\r\n  for (let i = 0; i < py.length; i++) {\r\n    if (py[i].x < px[mid].x && ly.length < mid) {\r\n      ly.push(py[i]);\r\n    } else {\r\n      ry.push(py[i]);\r\n    }\r\n  }\r\n  let [l1, l2] = closestPair2Helper(lx, ly);\r\n  let [r1, r2] = closestPair2Helper(rx, ry);\r\n  let minPair;\r\n  let min;\r\n  // let min = Math.min(distance(l1, l2), distance(r1, r2));\r\n  if (distance(l1, l2) < distance(r1, r2)) {\r\n    min = distance(l1, l2);\r\n    minPair = [l1, l2];\r\n  } else {\r\n    min = distance(r1, r2);\r\n    minPair = [r1, r2];\r\n  }\r\n  let [s1, s2] = closestSplitPair(px, py, min);\r\n  return s1\r\n    ? distance(l1, l2) < distance(r1, r2)\r\n      ? distance(l1, l2) < distance(s1, s2)\r\n        ? [l1, l2]\r\n        : [s1, s2]\r\n      : distance(r1, r2) < distance(s1, s2)\r\n      ? [r1, r2]\r\n      : [s1, s2]\r\n    : minPair;\r\n}\r\nfunction closestSplitPair(px, py, min) {\r\n  const mid = ~~(px.length / 2);\r\n  const midX = px[mid].x;\r\n  const sy = [];\r\n\r\n  const upBound = midX + min;\r\n  const lowBound = midX - min;\r\n  for (let i = 0; i < py.length; i++) {\r\n    if (py[i].x >= lowBound && py[i].x <= upBound) {\r\n      sy.push(py[i]);\r\n    }\r\n  }\r\n  let best = min;\r\n  let bestPair = [];\r\n  for (let i = 0; i < sy.length - 1; i++) {\r\n    for (let j = 1; j <= Math.min(7, sy.length - i - 1); j++) {\r\n      if (distance(sy[i], sy[i + j]) < best) {\r\n        best = distance(sy[i], sy[i + j]);\r\n        bestPair = [sy[i], sy[i + j]];\r\n      }\r\n    }\r\n  }\r\n  return bestPair;\r\n}\r\n\r\nfunction closestFromThree(parr) {\r\n  return distance(parr[0], parr[1]) < distance(parr[1], parr[2])\r\n    ? distance(parr[0], parr[1]) < distance(parr[0], parr[2])\r\n      ? [parr[0], parr[1]]\r\n      : [parr[0], parr[2]]\r\n    : distance(parr[1], parr[2]) < distance(parr[0], parr[2])\r\n    ? [parr[1], parr[2]]\r\n    : [parr[0], parr[2]];\r\n}\r\n\r\nfunction distance(a, b) {\r\n  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);\r\n}\r\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });