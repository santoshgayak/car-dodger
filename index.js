const startScreen = document.querySelector("#startScreen");
const gameScreen = document.querySelector("#gameScreen");
const endScreen = document.querySelector("#endScreen");
const scoresContainer = document.querySelectorAll(".scoresContainer");
console.log("scoresContainer");
const startButton = document.querySelector("#startButton");
const replayButton = document.querySelector("#replayButton");
const track = document.querySelector("#track");

//endscreen
const endScoreContainer =document.querySelector("#endScore");
const endCoinsScoreContainer = document.querySelector("#endCoinsScore");
const endDistanceScoreContainer = document.querySelector("#endDistanceScore");
const endHighestScoreContainer = document.querySelector("#endHighestScore");
///score board
const scoreContainer = document.querySelector("#score");
const coinsScoreContainer = document.querySelector("#coinsScore");
const distanceScoreContainer = document.querySelector("#distanceScore");
const highestScoreContainer = document.querySelector("#highestScore");
const speedContainer = document.querySelector("#speed")
const engineConditionContainer = document.querySelector("#engineCondition");

const dividers = [];
let counter = 0;

setInterval(()=>{
    counter++;
},100)

//create audio object
const startAudio = new Audio("./assets/audio/alex-morgan-car-car-music-545487.mp3");
startAudio.playAudio();

//event listeners

    startScreen.classList.add("show");
    endScreen.classList.add("hide");


startButton.addEventListener("click", ()=>{
    startAudio.stopPlayingAudio();
    startScreen.classList.remove("show");

    startScreen.classList.add("hide");
    gameScreen.classList.add("show");
    scoresContainer.forEach(container =>{
        container.classList.add("show");
    })
    startGame();
});

replayButton.addEventListener("click", () => {
    startAudio.stopPlayingAudio();
    startScreen.classList.remove("hide");

    startScreen.classList.add("show");
    gameScreen.classList.add("hide");
    endScreen.classList.remove("show");
    endScreen.classList.add("hide");




});

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



console.log(" game started....");

// create dividers
let startingPostion = -100;
let obstacleType1 = setInterval(() => {
    const newDivider = new Divider(startingPostion, 33);
    track.appendChild(newDivider.divider);
    dividers.push(newDivider);
    newDivider.startMoving();
}, 500)

let rightDividerPosition = -100;
let obstacleType2 = setInterval(() => {
    const newDivider = new Divider(rightDividerPosition, 65);
    track.appendChild(newDivider.divider);
    dividers.push(newDivider);
    newDivider.startMoving();
}, 500);



//create obstacles
const obstacles = [];
const position = [12,43,73 ]
let obstacleCount = 0;
setInterval(() => {
    let xPosition;
    xPosition = position[Math.floor(Math.random()* position.length)];
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
    counter++;
    obstacleCount++;

}, 1000)


//create new player
const newPlayer = new Player();
track.appendChild(newPlayer.player);

//object for store keypressed
let keysPressed = {
    ArrowLeft: false,
    ArrowRight: false
}




//create audio object
const backgroundMusic = new Audio("./assets/audio/aenjoytrips-car-changing-gears-sound-188962.mp3");

const newGame = new Game(newPlayer,backgroundMusic);


function startGame() {
    updateScoreBoard();
    newGame.startGame(keysPressed);
    obstacles.forEach((obstacle, index) => {
        const isColliding = newGame.dectectCollisionWithObstacle( newPlayer.player, obstacle.obstacle);
        if (isColliding) {
            const colliosionAudio = new Audio("./assets/audio/u_mgq59j5ayf-sound-effect-car-crash-394903.mp3");
            colliosionAudio.playAudio();
            colliosionAudio.stopLooping();
            console.log("Collision detected!");
            obstacle.obstacle.remove();
            obstacles.splice(index,1);
            obstacle.hasCollided = true;
            newPlayer.decreaseEngineCondition();
            const engineCondition = newGame.player.getEngineCondition();
            engineConditionContainer.textContent = engineCondition + " %";
            removeHeart();
            if(newGame.isGameOver()){
                endScreen.classList.add("show");
                gameScreen.classList.remove("show");
                gameScreen.classList.add("hide");
                
                scoresContainer.forEach(container => {
                    container.classList.remove("show");
                });          
                
                console.log(obstacles)
                startAudio.stopPlayingAudio();
                updateEndScreenScoreBoard();   
                newGame.endGame();
            };

        }
         
    });
    requestAnimationFrame(startGame);
}



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

function removeHeart(){
    newGame.player.decreaseLives();
    const hearts = document.querySelectorAll(".heart");
    if(hearts.length > 0){
        hearts[hearts.length - 1].remove();
    }
}





   
