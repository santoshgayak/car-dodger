class Obstacle{

    obstaceInterval = null;
    hasCollided = false;
    obstacleSpeed = 50;

     obstacleSpeed ={
        "1": 60,
        "2": 55,
        "3": 50,
        "4": 45,
        "5": 40,
        "6": 35,
        "7": 30,
        "8": 25,
        "9": 20,
        "10":10
    }
    constructor(xPosition, background){
        this.obstacle = document.createElement("div");
        this.obstacleHeight = 180;
        this.obstacleWidth = 90;
        this.velocity = 30;
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
    startMovingObstacle(level){
        this.obstaceInterval = setInterval(()=>{
        this.yPosition += 1 + this.velocity;
        this.obstacle.style.top = this.yPosition + "px";
           if (this.yPosition > 1400) {
            this.stopMovingObstacle();
            this.obstacle.remove();
        }

        } ,this.obstacleSpeed[level])
    }
    stopMovingObstacle(){
        clearInterval(this.obstaceInterval);
    }

}

