const startScreen = document.querySelector("#startScreen");
const gameScreen = document.querySelector("#gameScreen")
const startButton = document.querySelector("#startButton");
const track = document.querySelector("#track");
const dividers = [];
let counter = 0;

setInterval(()=>{
    counter++;
},100)

startScreen.classList.add("hide");
gameScreen.classList.add("show");

console.log(" game started....");
let startingPostion = -180;
setInterval(() => {
    const newDivider = new Divider(startingPostion, 33);
    track.appendChild(newDivider.divider);
    dividers.push(newDivider);
    newDivider.startMoving();
}, 500)

let rightDividerPosition = -190;
setInterval(() => {
    const newDivider = new Divider(rightDividerPosition, 65);
    track.appendChild(newDivider.divider);
    dividers.push(newDivider);
    newDivider.startMoving();
}, 500)


const obstacles = [];
const position = [12,43,73 ]
let obstacleCount = 0;
setInterval(() => {
    let xPosition;
    xPosition = position[Math.floor(Math.random()* position.length)];
    let newObstacle = {};
    if( obstacleCount % 3 === 0 ){
         newObstacle = new Obstacle(xPosition, "./blueCar.png");

    }else{
         newObstacle = new Obstacle(xPosition, "./pngtree-red-car-top-view-icon-png-image_6587097-removebg-preview.png");
    }
    
    track.appendChild(newObstacle.obstacle);
    obstacles.push(newObstacle);
    newObstacle.startMovingObstacle();
    counter++;
    obstacleCount++;

}, 1000)




const newPlayer = new Player();
track.appendChild(newPlayer.player);
newPlayer.startMovingPlayer();

document.addEventListener("keydown", (event) => {
    newPlayer.startMovingPlayer(event.key);
});






   
