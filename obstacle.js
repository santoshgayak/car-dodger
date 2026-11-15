class Obstacle{
    constructor(xPosition, background){

        this.obstacle = document.createElement("div");
        this.dividerHeight = 200;
        this.dividerWidth = 100;
        this.velocity = 15;
        this.xPosition = xPosition;
        this.yPosition = -400;

        this.obstacle.style.height = this.dividerHeight + "px";
        this.obstacle.style.width = this.dividerWidth + "px";
        this.obstacle.style.position = "absolute"
        this.obstacle.style.top = this.yPosition + "px";
        this.obstacle.style.left = this.xPosition + "%";
        this.obstacle.style.backgroundImage = `url("${background}")`;
        this.obstacle.classList.add("obstacle");
    }
    startMovingObstacle(){
        console.log("moving.....");
        setInterval(()=>{
        this.yPosition += 20 + this.velocity;
        this.obstacle.style.top = this.yPosition + "px";
        } ,40)
    }

}