class Game{

    maxPermittedCollisionWithCar = 3;
    hasCollisionWithObstacle = false;
    constructor(player , audio){
        this.player = player;
        this.audio = audio;
    }
    startGame(keyPressed){
        this.player.startMovingPlayer(keyPressed);
        this.audio.playAudio();

    }
    pauseGame(){
        console.log(" Game pausing now ..... ");


    }
    endGame(){
        this.audio.stopPlayingAudio();
        console.log(" Game ending now ..... ");

    }
   dectectCollisionWithObstacle(player, obstacle) {
        const playerRect = player.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();
        return (
            playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top
        );
    }


    dectectCoinCollection(){
        



    }
    isGameOver(){
        if(this.player.getEngineCondition() === 0) {
            return true;
        }
        if(this.player.getLives() === 0){
            return true;
        }
    }
}