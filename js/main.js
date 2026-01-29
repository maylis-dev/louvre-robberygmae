// screens
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const scoreNode = document.querySelector("#score-number");
const winScreenNode = document.querySelector("#win-screen");
const restartBtnNode = document.querySelector("#restart");
const restartWinBtnNode = document.querySelector("#restart-win-btn");


// buttons
const startBtnNode = document.querySelector("#start-btn");

// game box
const gameBoxNode = document.querySelector("#game-box");

// global variables
let gameBoxWidth = gameBoxNode.clientWidth;
let gameBoxHeight = gameBoxNode.clientHeight;

let robberObj = null;
let ObstaclepoliceArr = [];
let jewelsObj = [];
let gameIntervalId = null;
let obstacleIntervalId = null;
let score = 0;
scoreNode.innerText = score;

// ==========================
// KEEP ROBBER INSIDE FUNCTION
// ==========================
function keepRobberInside() {
  if (!robberObj) return;

  // top boundary
  if (robberObj.y < 0) robberObj.y = 0;

  // bottom boundary
  if (robberObj.y + robberObj.height > gameBoxHeight) {
    robberObj.y = gameBoxHeight - robberObj.height;
  }

  robberObj.node.style.top = `${robberObj.y}px`;
}

// ==========================
// START GAME
// ==========================
function startGame() {
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  // update box dimensions (dynamic)
  gameBoxWidth = gameBoxNode.clientWidth;
  gameBoxHeight = gameBoxNode.clientHeight;

  // game elements
  robberObj = new Robber();

  // loop game
  gameIntervalId = setInterval(gameLoop, Math.round(1000 / 60));

  // other interval
  obstacleIntervalId = setInterval(addElement, 3000);
}

// ==========================
// GAME LOOP
// ==========================
function gameLoop() {
  robberObj.moveDown();
  robberObj.moveUp();

  jewelsObj.forEach((eachjewelsObj) => {
    eachjewelsObj.automaticMovement();
  });

  ObstaclepoliceArr.forEach((eachObstaclepoliceObj) => {
    eachObstaclepoliceObj.automaticMovement();
  });

  keepRobberInside();
  obstacleDespawnCheck();
  collisionObject();
  jewelCollision();
}

// ==========================
// ADD ELEMENTS
// ==========================
function addElement() {
  // calculate dynamic Y positions within gameBox
  const posY1 = gameBoxNode.offsetHeight - 130
  const posY2 = gameBoxNode.offsetHeight - 40

  let randomNumberSelector = Math.floor(Math.random() * 3);
  if (randomNumberSelector === 0) {
    let Obstaclepolice1 = new Obstaclepolice(posY1, "policeman");
    ObstaclepoliceArr.push(Obstaclepolice1);

    let Obstacletourist2 = new Obstaclepolice(posY2, "tourist");
    ObstaclepoliceArr.push(Obstacletourist2);
  } else if (randomNumberSelector === 1) {
    let Obstacletourist = new Obstaclepolice(posY1, "tourist");
    ObstaclepoliceArr.push(Obstacletourist);

    let jewels2 = new Jewels(posY2, "jewels");
    jewelsObj.push(jewels2);
  } else {
    let jewels1 = new Jewels(posY1, "jewels");
    jewelsObj.push(jewels1);

    let Obstaclepolice2 = new Obstaclepolice(posY2, "policeman");
    ObstaclepoliceArr.push(Obstaclepolice2);
  }
}

// ==========================
// OBSTACLE DESPAWN
// ==========================
function obstacleDespawnCheck() {
  const rightLimit = gameBoxWidth + 50;

  ObstaclepoliceArr.forEach((obj, index) => {
    if (obj.x > rightLimit) {
      obj.node.remove();
      ObstaclepoliceArr.splice(index, 1);
    }
  });

  jewelsObj.forEach((obj, index) => {
    if (obj.x > rightLimit) {
      obj.node.remove();
      jewelsObj.splice(index, 1);
    }
  });
}

// ==========================
// COLLISION
// ==========================
// ==========================
// COLLISION
// ==========================
function collisionObject() {
  ObstaclepoliceArr.forEach((eachObstaclepoliceObj, index) => {
    if (checkCollision(robberObj, eachObstaclepoliceObj)) {
      if (eachObstaclepoliceObj.type === "policeman") {
        gameOver();
      } else if (eachObstaclepoliceObj.type === "tourist") {
        score = Math.max(0, score - 1);
        scoreNode.innerText = score;
        eachObstaclepoliceObj.node.remove();
        ObstaclepoliceArr.splice(index, 1);
        checkWin();
      }
    }
  });
}

function jewelCollision() {
  jewelsObj.forEach((jewel, index) => {
    if (checkCollision(robberObj, jewel)) {
      jewel.node.remove();
      jewelsObj.splice(index, 1);
      score += 1;
      scoreNode.innerText = score;
      checkWin();
    }
  });
}

function checkWin() {
  if (score >= 20) {
    clearInterval(gameIntervalId);
    clearInterval(obstacleIntervalId);
   
    gameScreenNode.style.display = "none";
    winScreenNode.style.display = "flex";
  }
}


function checkCollision(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

// ==========================
// GAME OVER
// ==========================
function gameOver() {
  clearInterval(gameIntervalId);
  clearInterval(obstacleIntervalId);

  // show game over screen
  gameOverScreenNode.style.display = "flex";
  gameScreenNode.style.display = "none";

}


function resetGame() {
  
  // stop any running intervals
  clearInterval(gameIntervalId);
  clearInterval(obstacleIntervalId);

  // reset score
  score = 0;
  scoreNode.innerText = score;

  // remove all obstacles
  ObstaclepoliceArr.forEach(obj => obj.node.remove());
  ObstaclepoliceArr = [];

  // remove all jewels
  jewelsObj.forEach(obj => obj.node.remove());
  jewelsObj = [];

  // remove robber
  if (robberObj?.node) {
    robberObj.node.remove();
  }
  robberObj = null;

  // hide screens
  winScreenNode.style.display = "none";
  gameOverScreenNode.style.display = "none";
  startScreenNode.style.display = "none";

  // show game screen and start a new game
  gameScreenNode.style.display = "flex";  
  startGame(); 
}



// ==========================
// EVENT LISTENERS
// ==========================
startBtnNode.addEventListener("click", startGame);

gameBoxNode.addEventListener("click", () => {
  if (robberObj) robberObj.jump?.();
});

document.addEventListener("keydown", (event) => {
  if (!robberObj) return;

  if (event.key === "ArrowUp") {
    robberObj.moveUp();
  }

  if (event.key === "ArrowDown") {
    robberObj.moveDown();
  }
});

restartBtnNode.addEventListener("click", resetGame);
restartWinBtnNode.addEventListener("click", resetGame);
