const env = document.getElementById("env");
const tearPath = document.getElementById("tearPath");

let startY = null;
let tearing = false;
let points = [];

env.addEventListener("mousedown", start);
env.addEventListener("touchstart", start);

window.addEventListener("mousemove", move);
window.addEventListener("touchmove", move);

window.addEventListener("mouseup", end);
window.addEventListener("touchend", end);

function start(e) {
  tearing = true;
  startY = getY(e);
  points = [];
}

function move(e) {
  if (!tearing) return;

  const y = Math.min(Math.max(getY(e), 0), 280);

  // Borde irregular tipo papel
  const x = 250 + (Math.random() * 12 - 6);

  points.push({ x, y });

  drawPath();

  if (y > 260) {
    finish();
  }
}

function end() {
  tearing = false;
}

function finish() {
  env.classList.add("finished", "revealed");
  tearing = false;
}

function drawPath() {
  if (points.length < 2) return;

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x} ${points[i].y}`;
  }
  tearPath.setAttribute("d", d);
}

function getY(e) {
  return (
    e.touches
      ? e.touches[0].clientY - env.getBoundingClientRect().top
      : e.clientY - env.getBoundingClientRect().top
  );
}
