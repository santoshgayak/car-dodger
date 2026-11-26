class Player{

    #lives = 3;
    #liveCost = 10000;
    #coinsValue

    //player game properties
    coinsCollected = 0;
    coinsCollectionScore = 0;
    numberOfCarsDodged = 0;
    carDodgedScore = 0;
    speed = 50 /// change later hardcoded
    distanceTravelled = 0 /// hardcoded change later
    engineCondition = 100;
    velocity = 0.5;
    distanceInterval = null;

    keysPressed = {
        ArrowLeft: false,
        ArrowRight: false,
    }
    
    constructor(){
      //player physical properties
        this.player = document.createElement("div");
        this.playerHeight = 170;
        this.playerWidth = 120;
        this.yPosition = -15;
        this.xPosition = 40
        this.player.style.height = this.playerHeight + "px";
        this.player.style.width = this.playerWidth + "px";
        this.player.style.position = "absolute"
        this.player.style.bottom = this.yPosition + "px";
        this.player.style.left = this.xPosition + "%";
        this.player.classList.add("player");
    }

    startMovingPlayer(){
      const movingSpeed = 0.01 + this.velocity;
      if(this.keysPressed["ArrowRight"] && (this.xPosition < 70)){
          this.xPosition += movingSpeed;   
      }
      if(this.keysPressed["ArrowLeft"] && this.xPosition > 10){
            this.xPosition -= movingSpeed;
      }   
      this.player.style.left = this.xPosition + "%";    
     
    }
  
    handleKeyUp(e){
      if(e.key in this.keysPressed){
        e.preventDefault();
        this.keysPressed[e.key] = false;
      }
    }

    handleKeyDown(e) {
      if(e.key in this.keysPressed){
          e.preventDefault();
          if (e.repeat) return;
          this.keysPressed[e.key] = true;
          this.angleCar();
      }
    }

    angleCar(){
      this.player.classList.remove("tiltLeft", "tiltRight");
      void this.player.offsetWidth;
      if (this.keysPressed["ArrowLeft"]) {
          this.player.classList.add("tiltLeft");
      } 
      if (this.keysPressed["ArrowRight"]) {
          this.player.classList.add("tiltRight");
      }
    }
      
    positionPlayer(){
        this.yPosition = 100;
        this.player.style.bottom = this.yPosition + "px";
    }

    increaseNumberOfCarsDodged(){
      this.numberOfCarsDodged++;
    }
    increaseDodgedCarScore(){
      this.carDodgedScore += 100;
    }
    getCoinsCollected(){
      return this.coinsCollected;
    }
    increaseCoinsCollected(){
      this.coinsCollected++;
    }

    increaseCoinsCollectionScore(value){
      this.coinsCollectionScore += value;
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
      console.log(" Live now : ", this.#lives);
    }
    
    getTotalScore(){
      return this.carDodgedScore + this.coinsCollectionScore;
    }
    getCarsDodged(){
      return this.numberOfCarsDodged;
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
    decreaseEngineCondition(){
      this.engineCondition -= 33;
      if(this.engineCondition <= 1){
        this.engineCondition = 0;
      }
    }
    increaseEngineCondition(){
      this.engineCondition += 33;
      if(this.engineCondition >= 100){
        this.engineCondition = 100;
      }
    }
    resetPlayer() {
      this.coinsCollected = 0;
      this.coinsCollectionScore = 0;
      this.#lives = 3;
      this.numberOfCarsDodged = 0;
      this.carDodgedScore = 0;
      this.speed = 50;
      this.distanceTravelled = 0;
      this.engineCondition = 100;
      this.yPosition = -15;
    }
    pay(){
      this.coinsCollectionScore -= this.#liveCost;
    }


   
}