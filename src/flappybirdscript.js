

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

let moved = false;
let gameOver = false;

// Variable Setup

let bg_x_pos = 0;
const bg_width = 400;
let bg_x_velo = 0;
let ground_x_pos = 0;
const ground_width = 400;
let ground_x_velo = 0;


// Score Variables

let score = 0;
let high_score = 0;

// Sounds

let slap_sfx = new Audio('assets/sounds/flappybird/slap.wav')
let woosh_sfx = new Audio('assets/sounds/flappybird/woosh.wav')
let score_sfx = new Audio('assets/sounds/flappybird/score.wav')



window.onload = function () {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    drawAllAssets();

    requestAnimationFrame(update);
    document.addEventListener("keydown", jump);
}

function update() {
    requestAnimationFrame(update);

    // Setting Scrolling
    bg_x_pos -= bg_x_velo;
    ground_x_pos -= ground_x_velo;

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

    // Clear Screen
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw All Assets
    drawAllAssets();

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
        bg_x_velo = .5
        ground_x_velo = 1;
    }

    if (key.code === "Space") {
        p_velo = +6;
        woosh_sfx.currentTime = 0;
        woosh_sfx.play();
    }
}

function reset_game(){
    p_x_pos = 172;
    p_y_pos = 300;
    score = 0;
    gameOver = false;
    slap_sfx.play();
}

function game_over() {
    gameOver = true;
    console.log("Score: " + score);
    moved = false;
    p_velo = 0;
    bg_x_velo = 0;
    ground_x_velo = 0;
    if(score > high_score) {
        high_score = score;
    }
    reset_game();
}


function drawAsset(src, x, y, w, h) {
    let img = new Image();
    img.src = src;
    img.onload = function () {
        ctx.drawImage(img, x, y, w, h);
    }
}

function drawAllAssets(){
    drawAsset("assets/textures/flappybird/background/purple.png", bg_x_pos, 0, bg_width, 600)
    drawAsset("assets/textures/flappybird/background/purple.png", bg_x_pos + 400, 0, bg_width, 600)
    drawAsset("assets/textures/flappybird/ground/water.png", ground_x_pos, 536, ground_width, 64)
    drawAsset("assets/textures/flappybird/ground/water.png", ground_x_pos + 400, 536, ground_width, 64)
    drawAsset("assets/textures/flappybird/player/js.png", p_x_pos, p_y_pos, p_width, p_height)

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