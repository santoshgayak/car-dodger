class Obstacle{

    obstaceInterval = null;
    hasCollided = false;
    constructor(xPosition, background){
        this.obstacle = document.createElement("div");
        this.obstacleHeight = 180;
        this.obstacleWidth = 90;
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
        this.obstaceInterval = setInterval(()=>{
        this.yPosition += 1 + this.velocity;
        this.obstacle.style.top = this.yPosition + "px";
           if (this.yPosition > 800) {
            this.stopMovingObstacle();
            this.obstacle.remove();
        }

        } ,40)
    }
    stopMovingObstacle(){
        clearInterval(this.obstaceInterval);
    }

}

