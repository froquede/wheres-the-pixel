
let red = document.getElementById('red');
let blue = document.getElementById('blue');
let dificulty = 95;
function calculateColor(mouse) {
    let d = distance(mouse, point);
    let percentage = 100 - (d * 100 / maxDistance);
    let color = 255 * percentage / 100;
    red.style.background = `rgba(255, 177, 179, ${percentage / 100})`;
    blue.style.background = `rgba(116, 185, 255, ${1 - (percentage / 100)})`;
    console.log(percentage)
    if(percentage >= dificulty) {
        alert((new Date() - init_time) / 1000 + 's');
        init();
    }
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
let init_time;
function init() {
    init_time = new Date();
    dificulty += (100 - dificulty) / 4; 
    newGame();
    listeners();
}

init();