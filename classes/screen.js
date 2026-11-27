class GameUi{
    static warningColors = {
        3: "none",
        2: "rgba(227, 79, 10, 0.4)",
        1: "rgba(243, 79, 67, 0.7)",
        0: "none"
    };
    constructor(){
        const get = selector => document.querySelector(selector);
        //screens 
        this.screens = {
            start:get("#startScreen"),
            game:get("#gameScreen"),
            end:get("#endScreen"),
        }

        //track
        this.track = get("#track");

        //score container
        this.scoresContainer = document.querySelectorAll(".scoresContainer");

        //Live game score board
        this.liveStats = {
            scoreContainer: get("#score"),
            coinsScoreContainer: get("#coinsScore"),
            distanceScoreContainer: get("#distanceScore"),
            highestScoreContainer: get("#highestScore"),
            speedContainer: get("#speed"),
            engineConditionContainer: get("#engineCondition"),
            speedlineContainer:get("#speedLine")
        }
        this.volumeButton = get("#volume");
        this.muteButton = get("#muted")


        //coin icon in board
        this.coinImg = get("#coinImg");

        // End game score board
        this.endStats = {
            scoreContainer: get("#endScore"),
            coinsScoreContainer: get("#endCoinsScore"),
            distanceScoreContainer: get("#endDistanceScore"),
            highestScoreContainer: get("#endHighestScore"),
        };

        this.hitSpaceMessage= get("#hitSpaceMessage");
        this.hearts = document.querySelectorAll(".heart");

    } //constructor ends

    // screen displays
   renderStartScreen() {
        this.screens.start.classList.add("show");
        this.screens.start.classList.remove("hide");
        this.screens.game.classList.remove("show");     
        this.screens.game.classList.add("hide");        
        this.screens.end.classList.remove("show");
        this.screens.end.classList.add("hide");
        this.renderHearts();
    }

    renderGameScreen() {
        this.screens.start.classList.remove("show");
        this.screens.start.classList.add("hide");
        this.screens.end.classList.remove("show");
        this.screens.end.classList.add("hide");
        this.screens.game.classList.remove("hide");
        this.screens.game.classList.add("show");
        this.scoresContainer.forEach(c => c.classList.add("show"));
        this.showSpaceMessage(); 
    }

    renderEndScreen() {
        this.screens.start.classList.remove("show");    
        this.screens.start.classList.add("hide");      
        this.screens.end.classList.remove("hide");     
        this.screens.end.classList.add("show");
        this.screens.game.classList.remove("show");
        this.screens.game.classList.add("hide");
        this.scoresContainer.forEach(c => c.classList.remove("show"));
    }
    //Methods
    renderColor(numberOfLives){
        if(numberOfLives in GameUi.warningColors){
            this.screens.game.style.background = GameUi.warningColors[numberOfLives];
        }
    }
   // show hearts , removes invisible class assignment before restart
    renderHearts(){
        this.hearts.forEach(heart =>{
            heart.classList.remove("invisible");
        })
    }

    //remove heart
    removeHeart(){
        const visibleHeart = [...this.hearts].findLast(heart => !heart.classList.contains("invisible"));
        if(visibleHeart) visibleHeart.classList.add("invisible");
    }
    // add heart one at time
    addHeart(){
        const inVisibleHeart = [...this.hearts].find(heart => heart.classList.contains("invisible"));
        if(inVisibleHeart) inVisibleHeart.classList.remove("invisible");
    
    }

    //animate coin
    animateCoin(){
        this.coinImg.classList.remove("animate");
        void this.coinImg.offsetWidth;
        this.coinImg.classList.add("animate");
    }
    setEngineCondition(){
        const engineCondition = newGame.player.getEngineCondition();
        this.liveStats.engineConditionContainer.textContent = engineCondition + " %";
    }

    increaseSpeedometer(){

    }

    // Update live game scoreboard
    updateScoreBoard(player) {
        const totalScore = player.getTotalScore();
        this.liveStats.scoreContainer.textContent = totalScore;

        const totalCoins = player.getCoinsCollected();
        this.liveStats.coinsScoreContainer.textContent = totalCoins;

        const totalDistance = player.getDistanceTravelled();
        this.liveStats.distanceScoreContainer.textContent = totalDistance + " km";

        const highestScore = player.getHighestScore();
        this.liveStats.highestScoreContainer.textContent = highestScore;

        const engineCondition = player.getEngineCondition();
        this.liveStats.engineConditionContainer.textContent = engineCondition + " %";

        const speed = player.getPlayerSpeed();
        this.liveStats.speedContainer.textContent = speed + " km/h";
        
        const speedometer = player.getPlayerSpeed();
        this.liveStats.speedlineContainer.style.transform = `translateX(-50%) rotate(${-90 + speedometer}deg)`;

    }

    // Update end game scoreboard
    updateEndScreenScoreBoard(player) {
        const totalScore = player.getTotalScore();
        this.endStats.scoreContainer.textContent = totalScore;

        const totalCoins = player.getCoinsCollected();
        this.endStats.coinsScoreContainer.textContent = totalCoins;

        const totalDistance = player.getDistanceTravelled();
        this.endStats.distanceScoreContainer.textContent = totalDistance + " km";

        const highestScore = player.getHighestScore();
        this.endStats.highestScoreContainer.textContent = highestScore;
    }
    hideSpaceMessage(e) {
        if(e.key === " " && !e.repeat){
            e.preventDefault();      
            this.hitSpaceMessage.classList.add("hide");
        }
    }
    showSpaceMessage() {
        this.hitSpaceMessage.classList.remove("hide");
    }

     showVolumeButton() {
        console.log(" Show volume buton called")
        this.volumeButton.classList.add("show");
        this.muteButton.classList.remove("show");
        this.muteButton.classList.add("hide");

        

        

    }
      showMuteButton() {
        console.log(" Show mute button called")

        this.volumeButton.classList.add("hide");

        this.volumeButton.classList.remove("show");

        this.muteButton.classList.add("show");
    }
        
}


