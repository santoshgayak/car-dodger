class Game{

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
        player: null
    }

    //game world objects array
    gameObjects = {
        dividers: [],
        obstacles:[],
        coins: []
    }

    obstacleImages = {
        blueCar: "../assets/images/blueCar.png",
        redCar: "../assets/images/pngtree-red-car-top-view-icon-png-image_6587097-removebg-preview.png",
    }
    coinsImage = {
        goldCoin: "../assets/images/Shiny Gold Star Coin.png"
    }
    keysPressed = {
        space: false
    }

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
        },500);
    }
  
    //create obstacle cars 
    createCarObstacles(){
        this.stopInterval(this.intervals, "obstacle");
        let obstacleCount = 0;
        this.intervals.obstacle = setInterval(() => {
            const xPosition = Game.objectPositionX[Math.floor(Math.random()* Game.objectPositionX.length)];
            const obstacleImage = obstacleCount % 3 === 0 ? this.obstacleImages.blueCar : this.obstacleImages.redCar;
            const newObstacle = new Obstacle(xPosition, obstacleImage);
            this.track.appendChild(newObstacle.obstacle);
            this.gameObjects.obstacles.push(newObstacle);
            newObstacle.startMovingObstacle();
            obstacleCount++;
        }, 1500);
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
            newCoin.startMovingCoin();
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
       Game.audios.end.stopPlayingAudio();
        Game.audios.start.playAudio();
        gameUi.renderStartScreen();
    }
     // render game screen 
    showGameScreen(){
        Game.audios.start.stopPlayingAudio();
        Game.audios.engine.playAudio();
        gameUi.renderGameScreen();
        //create game world 
    }


     //end screen 
    showEndScreen(){
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
                Game.audios.coinCollection.playAudio();
                Game.audios.coinCollection.stopLooping();

                coin.coin.remove();
                this.gameObjects.coins.splice(index,1);
                coin.hasCollided = true;

                this.player.increaseCoinsCollected();
                this.player.increaseCoinsCollectionScore();
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
        return (
            this.player.getEngineCondition() === 0 ||
            this.player.getLives() === 0
        );
    }

    buyLives(e) {
        if (e.key === "Enter") {
            console.log("Enter pressed!");
            const currentScore = this.player.getTotalScore();
            const currentLives = this.player.getLives();

            if (currentLives >= 3) return;
            if (currentScore < 5000) return;

            this.player.increaseLives();
            this.player.increaseEngineCondition();
            this.player.pay();
            this.gameUi.renderColor(this.player.getLives());
            this.gameUi.addHeart();
            Game.audios.heartPop.playAudio();
            Game.audios.heartPop.stopLooping();

        }
        
    }
    
}