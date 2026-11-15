class Game{

    maxPermittedCollisionWithCar = 3;
    hasCollisionWithObstacle = false;
    constructor(player , audio){
        this.player = player;
        this.audio = audio;
    }
    startGame(keyPressed){
        this.player.startMovingPlayer(keyPressed);
        //this.audio.playAudio();

    }
    pauseGame(){
        console.log(" Game pausing now ..... ");


    }
    endGame(){
        console.log(" Game ending now ..... ");

    }
    dectectCollisionWithObstacle(){
    

    }
    dectectCoinCollection(){
        



    }
}