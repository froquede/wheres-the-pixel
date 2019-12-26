const red = document.getElementById('red');
const blue = document.getElementById('blue');

let last_point = { x: 0, y: 0 };
function calculateColor(mouse) {
    let d = distance(mouse, point);
    let percentage = 100 - (d * 100 / maxDistance);
    red.style.background = `rgba(255, 181, 181, ${percentage / 100})`;
    blue.style.background = `rgba(194, 244, 255, ${1 - (percentage / 100)})`;
    last_point = mouse;

    if (percentage >= difficulty) {
        createWinDiv();
        running = false;
    }
}

let radius = 60;
function createWinDiv() {
    let winning_div = $(`<div class="circle" onclick="win();" style="left: ${point.x - radius}px; top: ${point.y - radius}px"></div>`);
    $('.circle').remove();
    $('body').append(winning_div);
    time = (((new Date() - init_time) / 1000) + lastdiff).toFixed(3)
    setTimeout(() => {
        $('#red').addClass('normal');
        $('#blue').addClass('normal');
        winning_div.addClass('active');
    }, 1e2);
}

function onMove(e) {
    if (running) {
        if (e.touches && e.touches[0]) e = e.touches[0];
        calculateColor({ x: e.pageX, y: e.pageY });
    }
}

function listeners() {
    $('body').mousemove(onMove);
    $('body').on('touchmove', onMove);
}

let point;
function newGame() {
    point = randomPoint();
    $('.js-real-time').text('0s');
    $('.js-controls').addClass('__active');
}

function randomPoint() {
    let w = Math.random() * (window.innerWidth - radius);
    let h = Math.random() * (window.innerHeight - radius);
    w < radius ? w = radius : w = w;
    h < radius ? h = radius : h = h;

    return { x: parseInt(w), y: parseInt(h) };
}

function distance(p1, p2) {
    return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}

let maxDistance = distance({ x: 0, y: 0 }, { x: window.innerWidth, y: window.innerHeight });
let init_time, difficulty = 95, running = false;
function init() {
    if (!binded) binds();
    running = true;
    init_time = new Date();
    lastdiff = 0;
    difficulty += (100 - difficulty) / 4;
    handleDOM();
    listeners();
    newGame();
    timer();
}

let time;
function timer() {
    let t = setInterval(() => {
        if (running) {
            time = ((new Date() - init_time) / 1000);
            $('.js-real-time').text((time + lastdiff).toFixed(2).split('.')[0] + 's');
        }
    }, 1e3);
}

let binded;
function binds() {
    binded = true;
    $('.js-restart').click(init);
    $('.js-pause').click(toggleGame);
    $(window).resize(() => {
        maxDistance = distance({ x: 0, y: 0 }, { x: window.innerWidth, y: window.innerHeight });
        newGame();
    })
}

let lastdiff = 0;
function toggleGame() {
    running = !running;
    if (!running) {
        lastdiff += time;
        $('body').addClass('paused');
    }
    else {
        init_time = new Date();
        $('body').removeClass('paused');
    }
}

function handleDOM() {
    $('.circle').remove();
    $('#red').removeClass('normal');
    $('#blue').removeClass('normal');
    $('.js-end').removeClass('__active');
}

function win() {;
    $('.js-difficulty').text(`${difficulty.toFixed(2)}% PRECISION`)
    $('.js-time').text(time + 's');
    $('.js-end').addClass('__active');
    $('.js-controls').removeClass('__active');
}

function pause() {

}

init();