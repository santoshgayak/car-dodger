
//buttons
const startButton = document.querySelector("#startButton");
const replayButton = document.querySelector("#replayButton");

//create audio object
//starting audo
const startAudio = new Audio("./assets/audio/alex-morgan-car-car-music-545487.mp3");
//playtime audio
const backgroundMusic = new Audio("./assets/audio/aenjoytrips-car-changing-gears-sound-188962.mp3");
//collision audio
const colliosionAudio = new Audio("./assets/audio/u-mgq59j5ayf-sound-effect-car-crash-394903_hozLuvL7.mp3");
//heart pop audio
const heartPopAudio = new Audio("./assets/audio/universfield-bubble-pop-06-351337.mp3");
//coin collection audio
const coinCollectionAudio = new Audio("./assets/audio/mixkit-fairy-arcade-sparkle-866_4jncl9xk.wav");

//object for store keypressed
let keysPressed = {
    ArrowLeft: false,
    ArrowRight: false,
}

//create new player initialization
const newPlayer = new Player();
track.appendChild(newPlayer.player);



const gameUi = new GameUi();



//new game initialization
const newGame = new Game(newPlayer, gameUi);



newGame.showStartScreen();

//start game
startButton.addEventListener("click", () => newGame.handleStartButton());
//restart game
replayButton.addEventListener("click", () => newGame.handleReplayButton());
//tilt car at lane change
document.addEventListener("keydown", (e)=> newPlayer.handleKeyDown(e));
document.addEventListener("keyup", (e)=> newPlayer.handleKeyUp(e));
//hide instruction
document.addEventListener("keydown", (e) => gameUi.hideSpaceMessage(e));
//enter to buy lives
document.addEventListener("keydown", (e) => newGame.buyLives(e));

document.addEventListener("keydown", (e)=> newGame.handleKeyDown(e));
console.log(newGame.gameObjects.obstacles.length)

   
