class Game{
    
    level = 1;

    //divider postion
    static DIVIDER = {
        yPostion:  -100,
        xPostion: [33,65]
    }
    static objectPositionX = [12, 43, 73];
    //intervals of all game world objects created
    intervals = {
        divider: null,
        obstacle: null,
        coin: null,
        player: null,
        level: null
    }
    //game world objects array
    gameObjects = {
        dividers: [],
        obstacles:[],
        coins: []
    }

    obstacleImages = {

        schoolBus: "../assets/images/school_bus.png",
        teslaTruck: "../assets/images/tesla_truck.png",
        blueCar: "../assets/images/blueCar.png",
        redCar: "../assets/images/pngtree-red-car-top-view-icon-png-image_6587097-removebg-preview.png",
    }
    coinsImage = {
        goldCoin: "../assets/images/Shiny Gold Star Coin.png"
    }
    keysPressed = {
        space: false
    }
    gameStates = ["start","playing","end"];
    currentGameState = this.gameStates[0];

    static audios = {
        start: new GameAudio("start"),
        background: new GameAudio("background"),
        end: new GameAudio("end"),
        collision: new GameAudio("collision"),
        heartPop: new GameAudio("heartPop"),
        coinCollection: new GameAudio("coinCollection"),
        engine: new GameAudio("engine")
    };

    constructor(player, gameUi, audios){
        this.player = player;
        this.gameUi = gameUi;
        this.track = gameUi.track;
    }
    startTimer(){
        this.stopInterval(this.intervals, "levelTimer");
        console.log(" Timer started ....... ");
        let counter = 0
        this.intervals.level = setInterval(()=>{
            counter++;
            if(counter === 15){
                counter = 0;
                console.log("level 2 reached")
                newGame.levelUp();
            }
        },1000);
    }
    levelUp(){
        if(this.level < 100){
            console.log("LEVELING UP");
            this.level++;
        }
    }
    //create divider line
    createDivider(){
        this.stopInterval(this.intervals, "divider");
        this.intervals.divider = setInterval(() => {
            Game.DIVIDER.xPostion.forEach(x =>{
                const newDivider = new Divider(Game.DIVIDER.yPostion, x);
                this.track.appendChild(newDivider.divider);
                this.gameObjects.dividers.push(newDivider);
                newDivider.startMoving();
            })
        },200);
    }
  
    //create obstacle cars 
    createCarObstacles(){
        this.stopInterval(this.intervals, "obstacle");
        let obstacleCount = 0;
        this.intervals.obstacle = setInterval(() => {
            const xPosition = Game.objectPositionX[Math.floor(Math.random()* Game.objectPositionX.length)];
            let obstacleImage = obstacleCount % 3 === 0 ? this.obstacleImages.blueCar : this.obstacleImages.redCar;
            if(obstacleCount % 17 === 0) {
                 obstacleImage = this.obstacleImages.teslaTruck;
            }else if(obstacleCount % 11 === 0){
                obstacleImage = this.obstacleImages.schoolBus;
            }
            const newObstacle = new Obstacle(xPosition, obstacleImage);
            this.track.appendChild(newObstacle.obstacle);
            this.gameObjects.obstacles.push(newObstacle);
            newObstacle.startMovingObstacle(this.level);
            obstacleCount++;
        }, 1000);
    }

    //create coins 
    createCoins(){

        this.stopInterval(this.intervals,"coin");
        const coinsPosition = [12,43,73 ]
        let coinsCount = 0;
        this.intervals.coin = setInterval(() => {
            const xPosition = coinsPosition[Math.floor(Math.random()* coinsPosition.length)];
            const newCoin = new Coin(xPosition, this.coinsImage.goldCoin);
            this.track.appendChild(newCoin.coin);
            this.gameObjects.coins.push(newCoin);
            newCoin.startMovingCoin(this.level);
            coinsCount++;
        }, 300);
    }
    //stop interval
    stopInterval(intervals, intervalType){
        clearInterval(intervals[intervalType]);
        intervals[intervalType] = null;
    }

    //stop all intervals and clear 
    stopAllIntervals(){
        Object.keys(this.intervals).forEach(key =>{
            clearInterval(this.intervals[key]);
            this.intervals[key] = null;
        });
       
    }

    //reset game , clear game objects array to [] at reset
    resetGame(){
        this.stopAllIntervals();
        Object.keys(this.gameObjects).forEach(key =>{
            this.gameObjects[key] = [];
        });
    }
    //render nitial screen 
    showStartScreen(){
        this.currentGameState = this.gameStates[0];
        Game.audios.end.stopPlayingAudio();
        Game.audios.start.playAudio();
        gameUi.renderStartScreen();
    }
     // render game screen 
    showGameScreen(){
        Game.audios.start.stopPlayingAudio();
        Game.audios.engine.playAudio();
        gameUi.renderGameScreen();
        this.currentGameState = this.gameStates[1];
        console.log("Current game state :",this.currentGameState);
        //create game world 
    }


     //end screen 
    showEndScreen(){
        this.currentGameState = this.gameStates[2];
        console.log("End game state :",this.currentGameState);
        Game.audios.background.stopPlayingAudio();
        Game.audios.end.playAudio();
        gameUi.renderEndScreen();
    }
    handleKeyDown(e){
        if(e.key === " "){
          e.preventDefault();
          if (e.repeat) return;
          this.keysPressed.space = true;
             console.log(this.keysPressed.space);
        if(this.keysPressed.space){
            this.startTimer();
            this.createDivider();
            this.createCarObstacles();
            this.createCoins();
            Game.audios.background.playAudio();
            Game.audios.engine.stopLooping();
        }
          this.player.positionPlayer();
      }
    }

    handleStartButton(){
        this.showGameScreen();
        this.startGame();
    }
     handleReplayButton(){
        this.showStartScreen();
    }

    startGame(){
        if(this.currentGameState === this.gameStates[2]) {
            console.log("Returning now.......");
            return;
        }
        this.stopInterval(this.intervals, "player");
        this.intervals.player = setInterval(() =>{
            this.player.startMovingPlayer();
        },1);
        this.gameUi.updateScoreBoard(this.player);
        this.checkObstaclesCollision();
        this.checkCoinsCollision();

        requestAnimationFrame(()=> this.startGame());
    }


    checkCoinsCollision(){
         this.gameObjects.coins.forEach((coin, index) => {
            const grabbedCoin = this.dectectCollisionWithObstacle( this.player.player, coin.coin);
            if (grabbedCoin) {
                Game.audios.coinCollection.stopPlayingAudio();
                Game.audios.coinCollection.playAudio();
                Game.audios.coinCollection.stopLooping();

                coin.coin.remove();
                this.gameObjects.coins.splice(index,1);

                this.player.increaseCoinsCollected();
                this.player.increaseCoinsCollectionScore(coin.value);
                this.player.updateHighestScore();
                this.gameUi.animateCoin();
            }
        });    
    }
    checkObstaclesCollision(){
        this.gameObjects.obstacles.forEach( (obstacle, index) =>{
            const isColliding = this.dectectCollisionWithObstacle(this.player.player, obstacle.obstacle );
            if(isColliding){
                Game.audios.collision.playAudio();
                Game.audios.collision.stopLooping();
                obstacle.obstacle.remove();
                this.gameObjects.obstacles.splice(index,1);
                obstacle.hasCollided = true;

                this.player.decreaseEngineCondition();
                this.player.decreaseLives();
                this.gameUi.setEngineCondition();
                this.gameUi.renderColor(this.player.getLives());
                this.gameUi.removeHeart();
                if(this.isGameOver()){
                    this.stopAllIntervals(this.intervals);
                    this.showEndScreen();        
                    this.gameUi.updateEndScreenScoreBoard(this.player);   
                    this.endGame();
                };
            }
        });
    }

    pauseGame(){
        console.log(" Game pausing now ..... ");
    }
    endGame(){
        this.player.resetPlayer();
    }
   dectectCollisionWithObstacle(player, obstacle) {
        const playerRect = player.getBoundingClientRect();
        const playerCollisionArea = {
            left: playerRect.left + 5,
            right: playerRect.right - 5,
            top: playerRect.top + 5,
            bottom: playerRect.bottom
        };

        const obstacleRect = obstacle.getBoundingClientRect();
        return (
            playerCollisionArea.left < obstacleRect.right &&
            playerCollisionArea.right > obstacleRect.left &&
            playerCollisionArea.top < obstacleRect.bottom &&
            playerCollisionArea.bottom > obstacleRect.top
        );
    }

    isGameOver() {
        if(this.player.getEngineCondition() === 0 ||
            this.player.getLives() === 0){
                this.currentGameState = this.gameStates[2];
                this.level = 1;
                return true;
            }
        return false;
    }

    buyLives(e) {
        if (e.key === "Enter") {
            console.log("Enter pressed!");
            const currentScore = this.player.getTotalScore();
            const currentLives = this.player.getLives();

            if (currentLives >= 3) return;
            if (currentScore < 10000) return;

            this.player.increaseLives();
            this.player.increaseEngineCondition();
            this.player.pay();
            this.gameUi.renderColor(this.player.getLives());
            this.gameUi.addHeart();
            Game.audios.heartPop.playAudio();
            Game.audios.heartPop.stopLooping();

        }
        
    }
    volumeOn(){
        this.audio.playAudio();
    }
    volumeOff(){
        this.audio.stopPlayingAudio();
    }
    
}