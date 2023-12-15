const leftPaddle = document.getElementById("leftPaddle");
const rightPaddle = document.getElementById("rightPaddle");
const ball = document.getElementById("ball");
const leftScore = document.getElementById("leftScore");
const rightScore = document.getElementById("rightScore");
const levelButton = document.getElementById("levelUp");
const levelButton2 = document.getElementById("levelDown");
const resetGameButton = document.getElementById("resetGame");
const pauseGameButton = document.getElementById("pauseGame");

let isGamePaused = false;
let leftPaddleY = 150;
let rightPaddleY = 150;
let ballX = 400;
let ballY = 200;
let ballSpeedX = 7; 
let ballSpeedY = 7; 
let leftScoreValue = 0;
let rightScoreValue = 0;

const gameContainer = document.querySelector(".game-container");
gameContainer.setAttribute("tabindex", 1);
gameContainer.focus();

function updatePaddles() {
    leftPaddle.style.top = leftPaddleY + "px";
    rightPaddle.style.top = rightPaddleY + "px";
}

function updateBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    
}

function checkCollision() {
    if (ballY <= 0 || ballY >= 400) {
        ballSpeedY = -ballSpeedY;
    }

    if (
        (ballX <= 30 && ballY >= leftPaddleY && ballY <= leftPaddleY + 100) ||
        (ballX >= 750 && ballY >= rightPaddleY && ballY <= rightPaddleY + 100)
    ) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX <= 0) {
        rightScoreValue++;
        rightScore.textContent = rightScoreValue;
        resetBall();
    } else if (ballX >= 780) {
        leftScoreValue++;
        leftScore.textContent = leftScoreValue;
        resetBall();
    }
}

function resetBall() {
    ballX = 400;
    ballY = 200;
    ballSpeedX = -ballSpeedX;
}

gameContainer.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" && rightPaddleY > 20) {
        rightPaddleY -= 10;
    } else if (event.key === "ArrowDown" && rightPaddleY < 310) {
        rightPaddleY += 10;
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "w" && leftPaddleY > 20) {
        leftPaddleY -= 60; 
    } else if (event.key === "s" && leftPaddleY < 310) {
        leftPaddleY += 60; 
    }
});

function computerMovement() {
    const targetY = ballY - 50;
    const randomOffset = Math.floor(Math.random() * 11) - 5;
    const adjustedTargetY = targetY + randomOffset;

    if (rightPaddleY + 0 < adjustedTargetY) {
        rightPaddleY += 5; 
    } else if (rightPaddleY + 50 > adjustedTargetY) {
        rightPaddleY -= 5; 
    }
}

levelButton.addEventListener("click", function () {
    
    function setAnimationSpeed(framesPerSecond) {
        const frameDelay = 100 / framesPerSecond;
        setTimeout(function () {
            gameLoop();
        }, frameDelay);
    }
    

    setAnimationSpeed(6);
});
levelButton2.addEventListener("click", function () {
    ballX = 400;
    ballY = 200;
    ballSpeedX = 7;
    ballSpeedY = 7;   
    cancelAnimationFrame(animationId);
});

resetGameButton.addEventListener("click", function () {
    leftPaddleY = 150;
    rightPaddleY = 150;
    ballX = 400;
    ballY = 200;
    ballSpeedX = 7;
    ballSpeedY = 7;
    leftScoreValue = 0;
    rightScoreValue = 0;
    leftScore.textContent = "0";
    rightScore.textContent = "0";
    leftScore.style.fontSize = "18vh";
    rightScore.style.fontSize = "18vh";
   
});

document.getElementById("pauseGame").addEventListener("click", function () {
    if (isGamePaused) {
        pauseGameButton.textContent = "Pause Game"; 
        isGamePaused = false;
        gameLoop();
    } else {
        pauseGameButton.textContent = "Start Game";
        isGamePaused = true;
        cancelAnimationFrame(animationId);
    }
});

function gameLoop() {
    if (isGamePaused) {
        return;
    }

    updateBall();
    checkCollision();
    updatePaddles();
    computerMovement();

    if (leftScoreValue === 15) {
        leftScore.textContent = "You Win!";
        leftScore.style.fontSize = "15vh";
    } else if (rightScoreValue === 15) {
        rightScore.textContent = "You lose!";
        rightScore.style.fontSize = "15vh";
    } else {
        animationId = requestAnimationFrame(gameLoop);
    }
    
}




gameLoop();
