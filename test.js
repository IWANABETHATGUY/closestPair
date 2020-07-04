const a = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];

const b = a.slice()

a.sort((a, b) => a.x - b.x);
b.sort((a, b) => a.y - b.y)


console.log(a)
console.log(b)
