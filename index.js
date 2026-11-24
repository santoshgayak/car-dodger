//buttons
const startButton = document.querySelector("#startButton");
const replayButton = document.querySelector("#replayButton");
const volumeButton = document.querySelector("#volumeButton");
const muted = document.querySelector("#muted");


//create new player initialization
const newPlayer = new Player();
track.appendChild(newPlayer.player);
const gameUi = new GameUi();
//new game initialization
const newGame = new Game(newPlayer, gameUi);

newGame.showStartScreen();

//event listeners
startButton.addEventListener("click", () => newGame.handleStartButton());
replayButton.addEventListener("click", () => newGame.handleReplayButton());
document.addEventListener("keydown", (e)=> newPlayer.handleKeyDown(e));
document.addEventListener("keyup", (e)=> newPlayer.handleKeyUp(e));
document.addEventListener("keydown", (e) => gameUi.hideSpaceMessage(e));
document.addEventListener("keydown", (e) => newGame.buyLives(e));
document.addEventListener("keydown", (e)=> newGame.handleKeyDown(e));
volumeButton.addEventListener("click", () => newGame.volumeOn());
muted.addEventListener("click", () => newGame.volumeOff());

   
