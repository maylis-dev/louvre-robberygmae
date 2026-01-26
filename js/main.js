// screens
const startScreenNode = document.querySelector("#start-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");

// buttons
const startBtnNode = document.querySelector("#start-btn");

// game box
const gameBoxNode = document.querySelector("#game-box");

//global name

  let robberObj = null;

//global game
function startGame() {
  startScreenNode.style.display = "none";
  gameScreenNode.style.display = "flex";

  //game elements
   robberObj = new Robber();

  //loop gam
  setInterval(gameLoop, Math.round(1000 / 60));
}

function gameLoop() {
      robberObj.gravity();
}

//event listeners
startBtnNode.addEventListener("click", startGame);
gameBoxNode.addEventListener("click", () => {
   robberObj.jump()
})
/*document.addEventListener("keydown", (event) => {
if (event.key === ""){
    robberObj.jump()
}
})*/

document.addEventListener("keydown", (event) => {
  if (!robberObj) return;

  if (event.key === "ArrowUp") {
    robberObj.moveUp();
  }

  if (event.key === "ArrowDown") {
    robberObj.moveDown();
  }
});