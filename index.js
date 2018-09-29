

function calculateColor(mouse) {
    let d = distance(mouse, point);
    let percentage = 100 - (d * 100 / maxDistance);
    let color = 255 * percentage / 100;
    console.log(percentage)
    document.body.style.background = `rgb(${color}, 0, ${255 - color})`;
}

function listeners() {
    $('body').mousemove((e) => {
        calculateColor({ x: e.pageX, y: e.pageY });
    })
}

let point;
function newGame() {
    point = randomPoint();
}

function randomPoint() {
    let x = parseInt(Math.random() * window.innerWidth);
    let y = parseInt(Math.random() * window.innerHeight);
    return { x: x, y: y };
}

function distance(p1, p2) {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

let maxDistance = distance({ x: 0, y: 0 }, { x: window.innerWidth, y: window.innerHeight });
function init() {
    newGame();
    listeners();
}

init();