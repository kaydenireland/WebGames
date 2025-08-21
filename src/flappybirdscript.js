

// Settings Variables

let sound = true;
let music = true;

// Game Container Setup

const canvas = document.getElementById('gameContainer');
const ctx = canvas.getContext('2d');
const canvasWidth = 400;
const canvasHeight = 600;

// Player Setup

const p_width = 57;
const p_height = 58;
let p_x_pos = 172;
let p_y_pos = 300;
let p_velo = 0;

let p_img = '/assets/textures/flappybird/player/heart.png';

let moved = false;
let gameOver = false;

// Pipe Setup

let pipe_width = 79;
let pipe_height = 360;
let pipe_x_pos = 500;
let pipe_y_pos = get_random_int(30, 280);
let pipe_gap = 220;
let pipe_velo = 0;
let max_pipe_velo = 2;
let pipe_scored = false

let pipe_up_img = '/assets/textures/flappybird/pipes/green_up.png';
let pipe_down_img = '/assets/textures/flappybird/pipes/green_down.png';

// Variable Setup

let bg_x_pos = 0;
const bg_width = 400;
let bg_x_velo = 0;
let bg_img = '/assets/textures/flappybird/background/default.png';
let max_bg_velo = 1;

let ground_x_pos = 0;
const ground_width = 400;
let ground_x_velo = 0;
let max_ground_velo = max_pipe_velo;
let ground_img = '/assets/textures/flappybird/ground/grass.png';



// Score Variables

let score = 0;
let high_score = 0;

// Sounds

let slap_sfx = new Audio('/assets/sounds/flappybird/slap.wav')
let woosh_sfx = new Audio('/assets/sounds/flappybird/woosh.wav')
let score_sfx = new Audio('/assets/sounds/flappybird/score.wav')


// Image Loading

// Preload images globally
const images = {};

function loadImage(key, src) {
    const img = new Image();
    img.src = src;
    images[key] = img;
}

// Load everything once at startup
loadImage("player", p_img);
loadImage("pipe_up", pipe_up_img);
loadImage("pipe_down", pipe_down_img);
loadImage("bg", bg_img);
loadImage("ground", ground_img);


window.onload = function () {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    drawAllAssets();
    drawAsset("pipe_down", pipe_x_pos, pipe_height + pipe_y_pos, pipe_width, pipe_height);
    drawAsset("pipe_up", pipe_x_pos, (2 * pipe_height) + pipe_y_pos + pipe_gap, pipe_width, pipe_height);

    requestAnimationFrame(update);
    document.addEventListener("keydown", jump);
}

function update() {
    requestAnimationFrame(update);

    // Setting Scrolling
    bg_x_pos -= bg_x_velo + (score * .06);
    ground_x_pos -= ground_x_velo + (score * .05);
    pipe_x_pos -= pipe_velo + (score * .05);

    // Reset Background & Ground's positions
    if (bg_x_pos <= -bg_width) {
        bg_x_pos = 0;
    }

    if (ground_x_pos <= -ground_width) {
        ground_x_pos = 0;
    }

    // Player Update
    p_y_pos -= p_velo;
    if(moved === true) {
        p_velo -= .25;
    }

    // Pipe Update
    if (pipe_x_pos < 0 - pipe_width) {
        pipe_respawn();
    }


    // Check if player is touching Pipe
    if (
        // Top Pipe
        check_collision(p_x_pos, p_y_pos, p_width, p_height,
            pipe_x_pos, 0 - pipe_height + pipe_y_pos, pipe_width, pipe_height) ||

        // Bottom Pipe
        check_collision(p_x_pos, p_y_pos, p_width, p_height,
            pipe_x_pos, pipe_y_pos + pipe_gap, pipe_width, pipe_height)
    ) {
        game_over();
    }

    // Increase Score
    if (pipe_scored === false && p_x_pos > pipe_x_pos) {
        score += 1
        pipe_scored = true
        score_sfx.play()
    }


    // Draw All Assets
    drawAllAssets();
    // Draw Pipes
    drawAsset("pipe_down", pipe_x_pos, 0 - pipe_height + pipe_y_pos, pipe_width, pipe_height);
    drawAsset("pipe_up", pipe_x_pos, pipe_y_pos + pipe_gap, pipe_width, pipe_height);


    // Reset Player if too high or low
    if (p_y_pos < -64 || p_y_pos > 536) {
        game_over();
    }


    ctx.fillStyle = "White";
    ctx.font = "60px Reg";
    ctx.fillText(score, 181, 80);

    ctx.font = "20px Reg";
    ctx.fillText("H: " + high_score, 181, 105);

}

function jump(key) {
    if (moved === false) {
        moved = true;
        bg_x_velo = max_bg_velo
        ground_x_velo = max_ground_velo;
        pipe_velo = max_pipe_velo;
    }

    if (key.code === "Space") {
        event.preventDefault();
        p_velo = +6;
        woosh_sfx.currentTime = 0;
        woosh_sfx.play();
    }
}

function pipe_respawn() {
    pipe_x_pos = 400;
    pipe_y_pos = get_random_int(30, 280);
    pipe_gap = get_random_int(180, 250);
    pipe_scored = false;
}


function pipe_reset() {
    pipe_x_pos = 500;
    pipe_y_pos = get_random_int(30, 280);
    pipe_scored = false;
}


function reset_game(){
    p_x_pos = 172;
    p_y_pos = 300;
    score = 0;
    gameOver = false;
    pipe_reset()
    slap_sfx.play();
}

function game_over() {
    gameOver = true;
    moved = false;
    p_velo = 0;
    bg_x_velo = 0;
    ground_x_velo = 0;
    pipe_velo = 0;
    if(score > high_score) {
        high_score = score;
    }
    reset_game();
}


function drawAsset(key, x, y, w, h) {
    ctx.drawImage(images[key], x, y, w, h);
}

function drawAllAssets(){
    drawAsset("bg", bg_x_pos, 0, bg_width, 536)
    drawAsset("bg", bg_x_pos + 400, 0, bg_width, 536)
    drawAsset("ground", ground_x_pos, 536, ground_width, 64)
    drawAsset("ground", ground_x_pos + 400, 536, ground_width, 64)
    drawAsset("player", p_x_pos, p_y_pos, p_width, p_height)

}


function get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function check_collision(x1,y1,w1,h1, x2,y2,w2,h2) {
    return x1 < x2+w2 &&
        x2 < x1+w1 &&
        y1 < y2+h2 &&
        y2 < y1+h1
}

function replaceImage(key, newSrc) {
    const img = new Image();
    img.onload = () => {
        images[key] = img;  // only swap once loaded
    };
    img.src = newSrc;
}
