var running = false;

let red = document.getElementById('red');
let blue = document.getElementById('blue');
let dificulty = 95;
function calculateColor(mouse) {
    let d = distance(mouse, point);
    let percentage = 100 - (d * 100 / maxDistance);
    let color = 255 * percentage / 100;
    red.style.background = `rgba(255, 181, 181, ${percentage / 100})`;
    blue.style.background = `rgba(194, 244, 255, ${1 - (percentage / 100)})`;

    if (percentage >= dificulty) {
        createWinDiv();
        running = false;
    }
}

let radius = 70;
function createWinDiv() {
    let winning_div = $(`<div class="circle" onclick="win();" style="left: ${point.x - radius}px; top: ${point.y - radius}px"></div>`);
    $('.circle').remove();
    $('body').append(winning_div);
    setTimeout(() => {
        winning_div.addClass('active');
        $('#red').addClass('normal');
        $('#blue').addClass('normal');
    }, 0);
}

function listeners() {
    $('body').mousemove((e) => {
        if (running) {
            calculateColor({ x: e.pageX, y: e.pageY });
        }
    });
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
    handleDOM();
    running = true;
    init_time = new Date();
    dificulty += (100 - dificulty) / 4;
    newGame();
    listeners();
}

function handleDOM(){
    $('.circle').remove();
    $('#red').removeClass('normal');
    $('#blue').removeClass('normal');
    $('.js-end').removeClass('__active');
}

function win() {
    let time = new Date(new Date() - init_time);
    time = time.getSeconds() + 's';
    $('.js-time').text(time + ' - ' + dificulty.toFixed(2) + '%');
    $('.js-end').addClass('__active');
}

$('.js-restart').click(init);

init();