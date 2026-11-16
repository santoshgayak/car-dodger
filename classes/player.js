class Player{

    //player game properties
    #coinsCollected = 0;
    #coinsCollectionScore = 0;
    #lives = 3;
    #numberOfCarsDodged = 0;
    #carDodgedScore = 0;
    speed = 50 /// change later hardcoded
    distanceTravelled = 0 /// hardcoded change later
    engineCondition = 100;


    
    constructor(){
      //player physical properties
        this.player = document.createElement("div");
        this.playerHeight = 170;
        this.playerWidth = 120;
        this.velocity = 1;
        this.yPosition = 100;
        this.xPosition = 40
        this.player.style.height = this.playerHeight + "px";
        this.player.style.width = this.playerWidth + "px";
        this.player.style.position = "absolute"
        this.player.style.bottom = this.yPosition + "px";
        this.player.style.left = this.xPosition + "%";
        this.player.classList.add("player");
      
    }
    startMovingPlayer(keyPressed){
      console.log(" I am called")
      const movingSpeed = 0.05 + this.velocity;
      if(keyPressed["ArrowRight"] && (this.xPosition < 70)){
          this.xPosition += movingSpeed;   
      }
      if(keyPressed["ArrowLeft"] && this.xPosition > 10){
            this.xPosition -= movingSpeed;
      }   
      this.player.style.left = this.xPosition + "%";         
    }

    increaseNumberOfCarsDodged(){
      this.#numberOfCarsDodged++;
    }
    increaseDodgedCarScore(){
      this.#carDodgedScore += 10;
    }

    getCoinsCollected(){
      return this.#coinsCollected;
    }

    increaseCoinsCollected(){
      this.#coinsCollected++;
    }

    increaseCoinsCollectionScore(){
      this.#coinsCollectionScore += 10;
    }

    updateHighestScore(){
       const currentScore = this.getTotalScore();
       const highestScore = this.getHighestScore();
       if( currentScore > highestScore ){
          localStorage.setItem("highestScore", currentScore);
       } 
    }
    getHighestScore(){
      return Number(localStorage.getItem("highestScore")) || 0;
    }

    getLives(){
      return this.#lives;
    }

    decreaseLives() {
      if (this.#lives > 0) this.#lives--;
    }

    increaseLives() {
      if (this.#lives < 3) this.#lives++;
    }

 
    getTotalScore(){
      return this.#carDodgedScore + this.#coinsCollectionScore;
    }
    getCarsDodged(){
      return this.#numberOfCarsDodged;
    }
    getDistanceTravelled(){
      return this.distanceTravelled || 0;
    }
    getPlayerSpeed(){
      return this.speed;
    }
     getEngineCondition(){
      return this.engineCondition;
    }
   
}