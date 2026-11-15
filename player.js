class Player{
    constructor(){

        this.player = document.createElement("div");
        this.dividerHeight = 170;
        this.dividerWidth = 120;
        this.velocity = 5;
        this.yPosition = 100;
        this.xPosition = 40

        this.player.style.height = this.dividerHeight + "px";
        this.player.style.width = this.dividerWidth + "px";
        this.player.style.position = "absolute"
        this.player.style.bottom = this.yPosition + "px";
        this.player.style.left = this.xPosition + "%";
        this.player.classList.add("player");

    }
    startMovingPlayer(keyPressed){
      console.log("moving player ....");
      if(keyPressed === "ArrowRight"){
         if(this.xPosition < 65){
            this.xPosition += 5 + this.velocity;
            this.player.style.left = this.xPosition + "%";        } 
      }
       if(keyPressed === "ArrowLeft"){
        if(this.xPosition > 10){
            this.xPosition -= 5 + this.velocity;
            this.player.style.left = this.xPosition + "%";
        }   
      }
        
    }

}