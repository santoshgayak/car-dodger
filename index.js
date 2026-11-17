//screens 
const startScreen = document.querySelector("#startScreen");
const gameScreen = document.querySelector("#gameScreen");
const endScreen = document.querySelector("#endScreen");

//buttons
const startButton = document.querySelector("#startButton");
const replayButton = document.querySelector("#replayButton");
const track = document.querySelector("#track");

//score container
const scoresContainer = document.querySelectorAll(".scoresContainer");

//endscreen Score board
const endScoreContainer =document.querySelector("#endScore");
const endCoinsScoreContainer = document.querySelector("#endCoinsScore");
const endDistanceScoreContainer = document.querySelector("#endDistanceScore");
const endHighestScoreContainer = document.querySelector("#endHighestScore");

//play time score board
const scoreContainer = document.querySelector("#score");
const coinsScoreContainer = document.querySelector("#coinsScore");
const distanceScoreContainer = document.querySelector("#distanceScore");
const highestScoreContainer = document.querySelector("#highestScore");
const speedContainer = document.querySelector("#speed")
const engineConditionContainer = document.querySelector("#engineCondition");

//
const hitSpaceMessage = document.querySelector("#hitSpaceMessage");
console.log(";;;;", hitSpaceMessage);

//array of obstacle and dividers
const obstacles = [];
const dividers = [];
const coins = [];

//divider postion
const yPostion = -100;
const xPostion = [33,65];

//intervals variable
let obstacleInterval = null;
let dividerIntervals = []; //store multiple
let coinsInterval = null;


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

//initial view 
showStartScreen();



//listeners
//start the game
startButton.addEventListener("click", ()=>{
    //create dividers 
    clearInterval(dividerIntervals);
    createDividers(-100, xPostion[0]);
    createDividers(-100, xPostion[1]);
    backgroundMusic.playAudio();
    hitSpaceMessage.classList.remove("hide");
    showGameScreen();
    startGame();
});

//restart game
replayButton.addEventListener("click", () => {
    showStartScreen();
});

//listen for player key presses
document.addEventListener("keydown", (event) => {
    if(event.key in keysPressed){
        event.preventDefault();
        keysPressed[event.key] = true;
    }
});
document.addEventListener("keyup", (event) => {
    if(event.key in keysPressed){
        event.preventDefault();
        keysPressed[event.key] = false;

    }
});

document.addEventListener("keydown", (event) => {
    if(event.code === "Space" && !event.repeat){
        event.preventDefault();
        createCarObstacles();
        createCoins();

        hitSpaceMessage.classList.add("hide");
    }
});


//create new player
const newPlayer = new Player();
track.appendChild(newPlayer.player);

const newGame = new Game(newPlayer,backgroundMusic);


//start game
function startGame() {
    updateScoreBoard();
    newGame.startGame(keysPressed);
    obstacles.forEach((obstacle, index) => {
        const isColliding = newGame.dectectCollisionWithObstacle( newPlayer.player, obstacle.obstacle);
        if (isColliding) {
            colliosionAudio.playAudio();
            colliosionAudio.stopLooping();
            obstacle.obstacle.remove();
            obstacles.splice(index,1);
            obstacle.hasCollided = true;
            newPlayer.decreaseEngineCondition();
            const engineCondition = newGame.player.getEngineCondition();
            engineConditionContainer.textContent = engineCondition + " %";
            newGame.player.decreaseLives();
            livesColor(newGame.player.getLives());
            removeHeart();
            if(newGame.isGameOver()){
                clearIntervals();
                showEndScreen();        
                startAudio.playAudio();
                backgroundMusic.stopPlayingAudio();
                updateEndScreenScoreBoard();   
                newGame.endGame();
            };
        }
    });

 coins.forEach((coin, index) => {
        const isColliding = newGame.dectectCollisionWithObstacle( newPlayer.player, coin.coin);
        if (isColliding) {
            console.log("Coins collided");
            coin.coin.remove();
            coinCollectionAudio.playAudio();
            coinCollectionAudio.stopLooping();
            coins.splice(index,1);
            coins.hasCollided = true;
            newPlayer.increaseCoinsCollected();
            newPlayer.increaseCoinsCollectionScore();
            newPlayer.updateHighestScore();
        }
    });    
    requestAnimationFrame(startGame);
}


//create track dividers
function createDividers(yPostion, xPosition){
    const interval = setInterval(() => {
        const newDivider = new Divider(yPostion, xPosition);
        track.appendChild(newDivider.divider);
        dividers.push(newDivider);
        newDivider.startMoving();
    }, 500);
    dividerIntervals.push(interval);
}
// screen displays
function showStartScreen(){
    startAudio.playAudio();
    startScreen.classList.add("show");
    endScreen.classList.remove("show");
    endScreen.classList.add("hide");
    showHearts();

}

function showGameScreen(){
    startAudio.stopPlayingAudio();
    startScreen.classList.remove("show");
    startScreen.classList.add("hide");
    endScreen.classList.add("hide");
    gameScreen.classList.add("show");
    scoresContainer.forEach(container =>{
        container.classList.add("show");
    })
}
function showEndScreen(){
    endScreen.classList.add("show");
    gameScreen.classList.remove("show");
    gameScreen.classList.add("hide");
    backgroundMusic.stopPlayingAudio();

    scoresContainer.forEach(container => {
        container.classList.remove("show");
    });          
}
//update score board at entering game screen
function updateScoreBoard(){
    const totalScore = newGame.player.getTotalScore();
    scoreContainer.textContent = totalScore;
    const totalCoins = newGame.player.getCoinsCollected();
    coinsScoreContainer.textContent = totalCoins;
    const totalDistance = newGame.player.getDistanceTravelled();
    distanceScoreContainer.textContent = totalDistance;
    const highestScore = newGame.player.getHighestScore();
    highestScoreContainer.textContent = highestScore;
    const engineCondition = newGame.player.getEngineCondition();
    engineConditionContainer.textContent = engineCondition + " %";
    const speed = newGame.player.getPlayerSpeed()
    speedContainer.textContent = speed + " km/h";
}

//update score at end screen
function updateEndScreenScoreBoard(){
    const totalScore = newGame.player.getTotalScore();
    endScoreContainer.textContent = totalScore;
    const totalCoins = newGame.player.getCoinsCollected();
    endCoinsScoreContainer.textContent = totalCoins;
    const totalDistance = newGame.player.getDistanceTravelled();
    endDistanceScoreContainer.textContent = totalDistance;
    const highestScore = newGame.player.getHighestScore();
    endHighestScoreContainer.textContent = highestScore;
}

//remove heart
function removeHeart(){
    const hearts = document.querySelectorAll(".heart:not(.invisible)");
    if(hearts.length > 0){
        heartPopAudio.playAudio();
        hearts[hearts.length - 1].classList.add("invisible");
    }
    heartPopAudio.stopLooping();
}

//create car obstacles
function createCarObstacles(){
    //create obstacles
    clearInterval(obstacleInterval);
    const obstaclePositions = [12,43,73 ]
    let obstacleCount = 0;
    obstacleInterval = setInterval(() => {
        let xPosition;
        xPosition = obstaclePositions[Math.floor(Math.random()* obstaclePositions.length)];
        let newObstacle = {};
        if( obstacleCount % 3 === 0 ){
            newObstacle = new Obstacle(xPosition, "./assets/images/blueCar.png");
        }else{
            newObstacle = new Obstacle(xPosition, "./assets/images/pngtree-red-car-top-view-icon-png-image_6587097-removebg-preview.png");
        }
        track.appendChild(newObstacle.obstacle);
        newObstacle.hasCollided = false;
        obstacles.push(newObstacle);
        newObstacle.startMovingObstacle();
        obstacleCount++;
    }, 1000);
}
//create car obstacles
function createCoins(){
    clearInterval(coinsInterval);
    //create obstacles
    const coinsPosition = [12,43,73 ]
    let coinsCount = 0;
    coinsInterval = setInterval(() => {
        let xPosition;
        xPosition = coinsPosition[Math.floor(Math.random()* coinsPosition.length)];
        let newCoin = {};
        newCoin = new Coin(xPosition, "./assets/images/Shiny Gold Star Coin.png");
        track.appendChild(newCoin.coin);
        newCoin.hasCollided = false;
        coins.push(newCoin);
        newCoin.startMovingCoin();
        coinsCount++;
    }, 700);
}

// show hearts
function showHearts(){
    const hearts = document.querySelectorAll(".heart");
    hearts.forEach(heart =>{
        heart.classList.remove("invisible");
    })
}

function clearIntervals(){
    dividerIntervals.forEach(id => clearInterval(id));
    clearInterval(obstacleInterval);
    clearInterval(coinsInterval);      
    dividerIntervals = [];
    obstacleInterval = null;
    coinsInterval = null;
}


function livesColor(numberOfLives){
    switch(numberOfLives){
        case 2:
            gameScreen.style.background = "rgba(227, 79, 10, 0.4)";
            break;

        case 1:
            gameScreen.style.background = "rgba(231, 37, 23, 0.7)";
            break;
        case 0:
            gameScreen.style.background = "none";


    }


}





   
