class Obstacle{
    constructor(xPosition, background){

        this.obstacle = document.createElement("div");
        this.obstacleHeight = 200;
        this.obstacleWidth = 100;
        this.velocity = 15;
        this.xPosition = xPosition;
        this.yPosition = -400;

        this.obstacle.style.height = this.obstacleHeight + "px";
        this.obstacle.style.width = this.obstacleWidth + "px";
        this.obstacle.style.position = "absolute"
        this.obstacle.style.top = this.yPosition + "px";
        this.obstacle.style.left = this.xPosition + "%";
        this.obstacle.style.backgroundImage = `url("${background}")`;
        this.obstacle.classList.add("obstacle");
    }
    startMovingObstacle(){
        setInterval(()=>{
        this.yPosition += 10 + this.velocity;
        this.obstacle.style.top = this.yPosition + "px";
        } ,40)
    }

}